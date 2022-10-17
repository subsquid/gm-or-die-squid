import { AccountBalance, Account, Currency } from '../model';
// import { ProcessorCache as SquidCache } from '@subsquid/processor-tools';
import { Ctx } from '../processor';

export function getAccountBalanceId(accId: string, currency: Currency) {
  return `${accId}-${currency}`;
}

export async function getOrCreateAccountBalance(
  ctx: Ctx,
  acc: Account,
  currency: Currency
): Promise<AccountBalance> {
  const accBalanceId = getAccountBalanceId(acc.id, currency);
  let accBalance = await ctx.store.get(AccountBalance, accBalanceId, false);

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

    ctx.store.deferredUpsert(accBalance);
  }
  return accBalance;
}
