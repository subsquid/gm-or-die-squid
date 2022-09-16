import {
  TransferEventData,
  BlockEventName,
  CoinName,
  FrenBurnedEventData,
  BurnedReward as BurnedRewardType
} from '../utils/types';
import SquidCache from '../utils/squid-cache/index';
import { FrenBurned, Currency, BurnedReward } from '../model';
import { getOrCreateAccount } from './account';

export function handleFrenBurned(
  frenBurnedEventsData: Set<FrenBurnedEventData> | undefined
) {
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

    const account = getOrCreateAccount(accountId);

    SquidCache.upsert(
      new FrenBurned({
        id,
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

    SquidCache.upsert(account);
  }
}
