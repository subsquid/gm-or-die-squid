import {
  TransferEventData,
  BlockEventName,
  CoinName,
  FrenBurnedEventData,
  BurnedReward
} from '../utils/types';
// import { ProcessorCache as SquidCache } from '@subsquid/processor-tools';
import { Ctx } from '../processor';
import { Transfer, Currency } from '../model';
import { getOrCreateAccount } from './account';

export async function handleTransfers(
  ctx: Ctx,
  transactionEventsData: Set<TransferEventData> | undefined
) {
  if (!transactionEventsData) return;

  for (const transferData of transactionEventsData.values()) {
    const {
      id,
      blockNumber,
      timestamp,
      extrinsicHash,
      from,
      to,
      amount,
      fee,
      currencyId
    } = transferData;

    const fromAcc = await getOrCreateAccount(ctx, from);
    const toAcc = await getOrCreateAccount(ctx, to);



    if (currencyId === Currency.GM) {
      fromAcc.sentGM += amount;
      fromAcc.sentGMGN += amount;
      toAcc.receivedGM += amount;
      toAcc.receivedGMGN += amount;
    } else if (currencyId === Currency.GN) {
      fromAcc.sentGN += amount;
      fromAcc.sentGMGN += amount;
      toAcc.receivedGN += amount;
      toAcc.receivedGMGN += amount;
    }

    ctx.store.deferredUpsert(
      new Transfer({
        id,
        blockNumber,
        timestamp,
        extrinsicHash,
        from: fromAcc,
        to: toAcc,
        currency: Currency[currencyId],
        amount,
        fee
      })
    );

    ctx.store.deferredUpsert(fromAcc);
    ctx.store.deferredUpsert(toAcc);
  }
}
