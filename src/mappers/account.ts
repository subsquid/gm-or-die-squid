import { Account } from '../model';
import SquidCache from '../utils/squid-cache';

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
