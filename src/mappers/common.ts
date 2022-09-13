import { Ctx } from '../processor';
import {
  BalancesTransferEvent,
  CurrenciesFrenBurnedEvent,
  TokensEndowedEvent,
  TokensTransferEvent
} from '../types/events';
import { TokenId, TransferEvent, BlockEventName, CoinName, FrenBurnedEvent, BurnedReward } from '../utils/types';
import { gmOrDieAddressSs58ToString } from '../utils/common';

export function getParsedEventsData(ctx: Ctx): Map<BlockEventName, Set<TransferEvent | FrenBurnedEvent>> {
  const parsedData = new Map<BlockEventName, Set<TransferEvent | FrenBurnedEvent>>();

  for (let block of ctx.blocks) {
    for (let item of block.items) {
      switch (item.name) {
        case 'Tokens.Endowed': {
          break;
        }

        case 'Tokens.Transfer': {
          const event = new TokensTransferEvent(ctx, item.event);
          const { amount, currencyId, from, to } = event.asV3;
          const tokenTransfer: TransferEvent = {
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
          parsedData.set(
            BlockEventName.TRANSFER,
            (parsedData.get(BlockEventName.TRANSFER) || new Set()).add(tokenTransfer)
          );
          break;
        }
        case 'Balances.Transfer': {
          const event = new BalancesTransferEvent(ctx, item.event);
          const { amount, from, to } = event.asV3;
          const tokenTransfer: TransferEvent = {
            id: item.event.id,
            blockNumber: block.header.height,
            currencyId: TokenId.FREN,
            timestamp: new Date(block.header.timestamp),
            extrinsicHash: item.event.extrinsic?.hash,
            from: gmOrDieAddressSs58ToString(from),
            to: gmOrDieAddressSs58ToString(to),
            amount: amount,
            fee: item.event.extrinsic?.fee || 0n
          };
          parsedData.set(
            BlockEventName.TRANSFER,
            (parsedData.get(BlockEventName.TRANSFER) || new Set()).add(tokenTransfer)
          );
          break;
        }
        case 'Currencies.FrenBurned': {
          const event = new CurrenciesFrenBurnedEvent(ctx, item.event);
          const { who, amount, whatTheyGot } = event.asV3;
          const frenBurned: FrenBurnedEvent = {
            id: item.event.id,
            blockNumber: block.header.height,
            timestamp: new Date(block.header.timestamp),
            extrinsicHash: item.event.extrinsic?.hash,
            account: gmOrDieAddressSs58ToString(who),
            burnedAmount: amount,
            burnedFor: (whatTheyGot?.__kind as BurnedReward) ?? null
          };
          parsedData.set(
            BlockEventName.FREN_BURNED,
            (parsedData.get(BlockEventName.FREN_BURNED) || new Set()).add(frenBurned)
          );
          break;
        }

        default:
      }
    }
  }
  return parsedData;
}
