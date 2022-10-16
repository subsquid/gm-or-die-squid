import {
  TransferEventData,
  BlockEventName,
  CoinName,
  FrenBurnedEventData,
  BurnedReward as BurnedRewardType
} from '../utils/types';
// import { ProcessorCache as SquidCache } from '@subsquid/processor-tools';
import { Ctx } from '../processor';

import { FrenBurned, Currency, BurnedReward } from '../model';
import { getOrCreateAccount } from './account';

export async function handleFrenBurned(
  ctx: Ctx,
  frenBurnedEventsData: Set<FrenBurnedEventData> | undefined
): Promise<void> {
  if (!frenBurnedEventsData) return;

  for (const frenBurnedData of frenBurnedEventsData.values()) {
    const {
      id,
      blockNumber,
      timestamp,
      extrinsicHash,
      accountId,
      burnedAmount,
      burnedFor
    } = frenBurnedData;

    const account = await getOrCreateAccount(ctx, accountId);

    ctx.store.deferredUpsert(
      new FrenBurned({
        id,
        account,
        blockNumber,
        timestamp,
        extrinsicHash,
        burnedAmount: burnedAmount,
        burnedFor: burnedFor as BurnedReward | null
      })
    );

    switch (burnedFor) {
      case BurnedReward.GM:
        account.burnedForGM += burnedAmount;
        account.burnedForGMGN += burnedAmount;
        break;
      case BurnedReward.GN:
        account.burnedForGN += burnedAmount;
        account.burnedForGMGN += burnedAmount;
        break;
      default:
        account.burnedForNothing += burnedAmount;
    }
    account.burnedTotal += burnedAmount;

    ctx.store.deferredUpsert(account);
  }
}
