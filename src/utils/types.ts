import { Coooooins } from '../types/v3';
import { Account } from '../model';

type InferCoinName<T> = T extends { __kind: infer A } ? A : never;
export type CoinName = InferCoinName<Pick<Coooooins, '__kind'>>;

export enum TokenId {
  FREN = 'FREN',
  GM = 'GM',
  GN = 'GN'
}

export type BurnedReward = Exclude<CoinName, 'FREN'> | null;

export enum BlockEventName {
  TRANSFER = 'TRANSFER',
  FREN_BURNED = 'FREN_BURNED'
}
export interface TransferEvent {
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

export interface FrenBurnedEvent {
  id: string;
  blockNumber: number;
  timestamp: Date;
  extrinsicHash?: string;
  account: string;
  burnedAmount: BigInt;
  burnedFor: BurnedReward;
}
