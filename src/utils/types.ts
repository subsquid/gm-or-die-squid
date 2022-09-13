import { Coooooins } from '../types/v3';
import { Account } from '../model';

type InferCoinName<T> = T extends { __kind: infer A } ? A : never;
export type CoinName = InferCoinName<Pick<Coooooins, '__kind'>>;

export type BurnedReward = Exclude<CoinName, 'FREN'> | null;

export enum BlockEventName {
  TRANSFER = 'TRANSFER',
  FREN_BURNED = 'FREN_BURNED'
}
export interface TransferEventData {
  id: string;
  blockNumber: number;
  timestamp: Date;
  extrinsicHash?: string;
  from: string;
  to: string;
  amount: bigint;
  fee?: bigint;
  currencyId: CoinName;
}

export interface FrenBurnedEventData {
  id: string;
  blockNumber: number;
  timestamp: Date;
  extrinsicHash?: string;
  accountId: string;
  burnedAmount: bigint;
  burnedFor: BurnedReward;
}
