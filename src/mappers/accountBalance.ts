import { AccountBalance, Account, Currency } from '../model';
import SquidCache from '../utils/squid-cache';

export function getAccountBalanceId(accId: string, currency: Currency) {
  return `${accId}-${currency}`;
}

export function getOrCreateAccountBalance(
  acc: Account,
  currency: Currency
): AccountBalance {
  const accBalanceId = getAccountBalanceId(acc.id, currency);
  let accBalance = SquidCache.get(AccountBalance, accBalanceId);

  if (accBalance == null) {
    accBalance = new AccountBalance({
      id: accBalanceId,
      currency,
      account: acc,
      free: BigInt(0),
      reserved: BigInt(0),
      frozen: BigInt(0),
      miscFrozen: BigInt(0),
      feeFrozen: BigInt(0),
      total: BigInt(0)
    });

    SquidCache.upsert(accBalance);
  }
  return accBalance;
}
