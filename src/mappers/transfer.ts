import {
  TransferEventData,
  BlockEventName,
  CoinName,
  FrenBurnedEventData,
  BurnedReward
} from '../utils/types';
import SquidCache from '../utils/squid-cache/index';
import { Transfer, Currency } from '../model';
import { getOrCreateAccount } from './account';

export function handleTransfers(
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

    const fromAcc = getOrCreateAccount(from);
    const toAcc = getOrCreateAccount(to);

    SquidCache.upsert(
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

    SquidCache.upsert(fromAcc);
    SquidCache.upsert(toAcc);
  }
}
