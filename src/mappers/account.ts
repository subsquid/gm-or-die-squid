import { Account } from '../model';
import SquidCache from '../utils/squid-cache';
import {
  SystemAccountStorage,
  TokensAccountsStorage,
  IdentityIdentityOfStorage
} from '../types/storage';
import {
  BlockEventName,
  FrenBurnedEventData,
  ParsedEventsDataMap,
  TransferEventData
} from '../utils/types';
import {
  gmOrDieAddressStringToSs58,
  ParsedEventsDataScope
} from '../utils/common';
import { getIdentity } from '../utils/getIdentity';
import { Ctx } from '../processor';

export function getOrCreateAccount(id: string): Account {
  let acc = SquidCache.get(Account, id);
  if (acc == null) {
    acc = new Account({
      id: id,
      receivedGM: BigInt(0),
      receivedGN: BigInt(0),
      receivedGMGN: BigInt(0),
      sentGM: BigInt(0),
      sentGN: BigInt(0),
      sentGMGN: BigInt(0),
      burnedForGM: BigInt(0),
      burnedForGN: BigInt(0),
      burnedForGMGN: BigInt(0),
      burnedForNothing: BigInt(0),
      burnedTotal: BigInt(0),
      balanceFREN: BigInt(0),
      balanceGM: BigInt(0),
      balanceGN: BigInt(0),
      balanceGMGN: BigInt(0)
    });

    SquidCache.upsert(acc);
  }
  return acc;
}

export async function handleAccountIdentityUpdates(
  ctx: Ctx,
  parsedData: ParsedEventsDataScope
): Promise<void> {
  const block = ctx.blocks[ctx.blocks.length - 1];
  const involvedAccounts = new Map<string, Account>();

  for (const transfer of parsedData
    .get<TransferEventData>(BlockEventName.TRANSFER)
    .values()) {
    involvedAccounts.set(transfer.from, getOrCreateAccount(transfer.from));
    involvedAccounts.set(transfer.to, getOrCreateAccount(transfer.to));
  }

  for (const burnedEvent of parsedData
    .get<FrenBurnedEventData>(BlockEventName.FREN_BURNED)
    .values()) {
    involvedAccounts.set(
      burnedEvent.accountId,
      getOrCreateAccount(burnedEvent.accountId)
    );
  }

  for (const accountId of parsedData
    .get<string>(BlockEventName.IDENTITY)
    .values()) {
    involvedAccounts.set(accountId, getOrCreateAccount(accountId));
  }

  const involvedAccountsList = [...involvedAccounts.values()];

  if (involvedAccountsList.length === 0) return;

  const sysAccountStorage = new SystemAccountStorage(ctx, block.header);
  const tokensStorage = new TokensAccountsStorage(ctx, block.header);
  const identityOfStorage = new IdentityIdentityOfStorage(ctx, block.header);

  const [frenData, gmData, gnData, identityOfData] = await Promise.allSettled([
    sysAccountStorage.getManyAsV3(
      involvedAccountsList.map(({ id }) => gmOrDieAddressStringToSs58(id))
    ),
    tokensStorage.getManyAsV3(
      involvedAccountsList.map(({ id }) => [
        gmOrDieAddressStringToSs58(id),
        { __kind: 'GM' }
      ])
    ),
    tokensStorage.getManyAsV3(
      involvedAccountsList.map(({ id }) => [
        gmOrDieAddressStringToSs58(id),
        { __kind: 'GN' }
      ])
    ),
    identityOfStorage.getManyAsV3(
      involvedAccountsList.map(({ id }) => gmOrDieAddressStringToSs58(id))
    )
  ]);

  const frenDataValues =
    frenData.status === 'fulfilled' ? frenData.value : null;
  const gmDataValue = gmData.status === 'fulfilled' ? gmData.value : null;
  const gnDataValues = gnData.status === 'fulfilled' ? gnData.value : null;
  const identityOfDataValues =
    identityOfData.status === 'fulfilled' ? identityOfData.value : null;

  for (let i = 0; i < involvedAccountsList.length; i++) {
    const account = involvedAccountsList[i];

    if (frenDataValues && gmDataValue && gnDataValues) {
      const frenData = frenDataValues[i];
      const gmData = gmDataValue[i];
      const gnData = gnDataValues[i];

      account.balanceFREN = frenData.data.free + frenData.data.reserved;
      account.balanceFreeFREN = frenData.data.free;
      account.balanceReservedFREN = frenData.data.reserved;
      account.balanceMiscFrozenFREN = frenData.data.miscFrozen;
      account.balanceFeeFrozenFREN = frenData.data.feeFrozen;

      account.balanceGM = gmData.free + gmData.reserved + gmData.frozen;
      account.balanceFrozenGM = gmData.frozen;
      account.balanceReservedGM = gmData.reserved;

      account.balanceGN = gnData.free + gnData.reserved + gnData.frozen;
      account.balanceFrozenGN = gnData.frozen;
      account.balanceReservedGN = gnData.reserved;

      account.balanceGMGN = account.balanceGM + account.balanceGN;
    }
    if (identityOfDataValues) {
      const identity = identityOfDataValues[i];
      const { display, discord, twitter, verified } = getIdentity(identity);

      account.display = display;
      account.discord = discord;
      account.twitter = twitter;
      account.verified = verified;
    }
    if (frenDataValues && gmDataValue && gnDataValues && identityOfDataValues) {
      SquidCache.upsert(account);
    }
  }
}
