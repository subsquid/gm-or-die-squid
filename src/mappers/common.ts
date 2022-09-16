import { Ctx } from '../processor';
import {
  BalancesEndowedEvent,
  BalancesTransferEvent,
  CurrenciesFrenBurnedEvent,
  IdentityIdentityClearedEvent,
  IdentityIdentityKilledEvent,
  IdentityIdentitySetEvent,
  IdentityJudgementGivenEvent,
  TokensEndowedEvent,
  TokensTransferEvent
} from '../types/events';
import { Account, Currency } from '../model';
import {
  TransferEventData,
  BlockEventName,
  FrenBurnedEventData,
  BurnedReward,
  ParsedEventsDataMap
} from '../utils/types';
import {
  gmOrDieAddressSs58ToString,
  ParsedEventsDataScope
} from '../utils/common';
import SquidCache from '../utils/squid-cache';

export function getParsedEventsData(ctx: Ctx): ParsedEventsDataScope {
  const parsedData = new ParsedEventsDataScope();

  for (let block of ctx.blocks) {
    for (let item of block.items) {
      switch (item.name) {
        case 'Balances.Endowed': {
          const event = new BalancesEndowedEvent(ctx, item.event);
          const { account } = event.asV3;
          parsedData.set(
            BlockEventName.IDENTITY,
            gmOrDieAddressSs58ToString(account)
          );
          SquidCache.deferredLoad(Account, gmOrDieAddressSs58ToString(account));
          break;
        }
        case 'Identity.IdentitySet': {
          const event = new IdentityIdentitySetEvent(ctx, item.event);
          const { who } = event.asV3;
          parsedData.set(
            BlockEventName.IDENTITY,
            gmOrDieAddressSs58ToString(who)
          );
          SquidCache.deferredLoad(Account, gmOrDieAddressSs58ToString(who));
          break;
        }
        case 'Identity.IdentityKilled': {
          const event = new IdentityIdentityKilledEvent(ctx, item.event);
          const { who } = event.asV3;
          parsedData.set(
            BlockEventName.IDENTITY,
            gmOrDieAddressSs58ToString(who)
          );
          SquidCache.deferredLoad(Account, gmOrDieAddressSs58ToString(who));
          break;
        }
        case 'Identity.IdentityCleared': {
          const event = new IdentityIdentityClearedEvent(ctx, item.event);
          const { who } = event.asV3;
          parsedData.set(
            BlockEventName.IDENTITY,
            gmOrDieAddressSs58ToString(who)
          );
          SquidCache.deferredLoad(Account, gmOrDieAddressSs58ToString(who));
          break;
        }
        case 'Identity.JudgementGiven': {
          const event = new IdentityJudgementGivenEvent(ctx, item.event);
          const { target } = event.asV3;
          parsedData.set(
            BlockEventName.IDENTITY,
            gmOrDieAddressSs58ToString(target)
          );
          SquidCache.deferredLoad(Account, gmOrDieAddressSs58ToString(target));
          break;
        }

        case 'Tokens.Transfer': {
          const event = new TokensTransferEvent(ctx, item.event);
          const { amount, currencyId, from, to } = event.asV3;
          const tokenTransfer: TransferEventData = {
            id: item.event.id,
            blockNumber: block.header.height,
            currencyId: currencyId.__kind,
            timestamp: new Date(block.header.timestamp),
            extrinsicHash: item.event.extrinsic?.hash,
            from: gmOrDieAddressSs58ToString(from),
            to: gmOrDieAddressSs58ToString(to),
            amount: amount,
            fee: item.event.extrinsic?.fee || 0n
          };

          parsedData.set(BlockEventName.TRANSFER, tokenTransfer);
          SquidCache.deferredLoad(Account, [
            tokenTransfer.from,
            tokenTransfer.to
          ]);

          break;
        }
        case 'Balances.Transfer': {
          const event = new BalancesTransferEvent(ctx, item.event);
          const { amount, from, to } = event.asV3;
          const tokenTransfer: TransferEventData = {
            id: item.event.id,
            blockNumber: block.header.height,
            currencyId: Currency.FREN,
            timestamp: new Date(block.header.timestamp),
            extrinsicHash: item.event.extrinsic?.hash,
            from: gmOrDieAddressSs58ToString(from),
            to: gmOrDieAddressSs58ToString(to),
            amount: amount,
            fee: item.event.extrinsic?.fee || 0n
          };
          parsedData.set(BlockEventName.TRANSFER, tokenTransfer);
          SquidCache.deferredLoad(Account, [
            tokenTransfer.from,
            tokenTransfer.to
          ]);

          break;
        }
        case 'Currencies.FrenBurned': {
          const event = new CurrenciesFrenBurnedEvent(ctx, item.event);
          const { who, amount, whatTheyGot } = event.asV3;
          const frenBurned: FrenBurnedEventData = {
            id: item.event.id,
            blockNumber: block.header.height,
            timestamp: new Date(block.header.timestamp),
            extrinsicHash: item.event.extrinsic?.hash,
            accountId: gmOrDieAddressSs58ToString(who),
            burnedAmount: amount,
            burnedFor: (whatTheyGot?.__kind as BurnedReward) ?? null
          };
          parsedData.set(BlockEventName.FREN_BURNED, frenBurned);
          SquidCache.deferredLoad(Account, frenBurned.accountId);

          break;
        }

        default:
      }
    }
  }
  return parsedData;
}
