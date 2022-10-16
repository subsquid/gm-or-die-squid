import { Account, Currency } from '../model';
// import { ProcessorCache as SquidCache } from '@subsquid/processor-tools';

import {
  IdentityIdentityOfStorage,
  SystemAccountStorage,
  TokensAccountsStorage
} from '../types/storage';
import {
  BlockEventName,
  FrenBurnedEventData,
  TransferEventData
} from '../utils/types';
import {
  gmOrDieAddressStringToSs58,
  ParsedEventsDataScope
} from '../utils/common';
import { getIdentity } from '../utils/getIdentity';
import { Ctx } from '../processor';
import { getOrCreateAccountBalance } from './accountBalance';

export async function getOrCreateAccount(
  ctx: Ctx,
  id: string
): Promise<Account> {
  let acc = await ctx.store.get(Account, id);

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
      burnedTotal: BigInt(0)
    });


    ctx.store.deferredUpsert(acc);
  }
  return acc;
}

export async function handleAccountIdentityBalanceUpdates(
  ctx: Ctx,
  parsedData: ParsedEventsDataScope
): Promise<void> {
  const block = ctx.blocks[ctx.blocks.length - 1];
  const involvedAccounts = new Map<string, Account>();

  for (const transfer of parsedData
    .get<TransferEventData>(BlockEventName.TRANSFER)
    .values()) {
    involvedAccounts.set(transfer.from, await getOrCreateAccount(ctx, transfer.from));
    involvedAccounts.set(transfer.to, await getOrCreateAccount(ctx, transfer.to));
  }

  for (const burnedEvent of parsedData
    .get<FrenBurnedEventData>(BlockEventName.FREN_BURNED)
    .values()) {
    involvedAccounts.set(
      burnedEvent.accountId,
      await getOrCreateAccount(ctx, burnedEvent.accountId)
    );
  }

  for (const accountId of parsedData
    .get<string>(BlockEventName.IDENTITY)
    .values()) {
    involvedAccounts.set(accountId, await getOrCreateAccount(ctx, accountId));
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

      const accBalanceFREN = await getOrCreateAccountBalance(
        ctx,
        account,
        Currency.FREN
      );
      const accBalanceGM = await getOrCreateAccountBalance(ctx, account, Currency.GM);
      const accBalanceGN = await getOrCreateAccountBalance(ctx, account, Currency.GN);

      accBalanceFREN.total = frenData.data.free + frenData.data.reserved;
      accBalanceFREN.free = frenData.data.free;
      accBalanceFREN.reserved = frenData.data.reserved;
      accBalanceFREN.miscFrozen = frenData.data.miscFrozen;
      accBalanceFREN.feeFrozen = frenData.data.feeFrozen;

      accBalanceGM.total = gmData.free + gmData.reserved + gmData.frozen;
      accBalanceGM.free = gmData.free;
      accBalanceGM.frozen = gmData.frozen;
      accBalanceGM.reserved = gmData.reserved;

      accBalanceGN.total = gnData.free + gnData.reserved + gnData.frozen;
      accBalanceGN.free = gnData.free;
      accBalanceGN.frozen = gnData.frozen;
      accBalanceGN.reserved = gnData.reserved;

      // SquidCache.upsert(accBalanceFREN);
      // SquidCache.upsert(accBalanceGM);
      // SquidCache.upsert(accBalanceGN);
      ctx.store.deferredUpsert(accBalanceFREN);
      ctx.store.deferredUpsert(accBalanceGM);
      ctx.store.deferredUpsert(accBalanceGN);
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
      ctx.store.deferredUpsert(account);
    }
  }
}
