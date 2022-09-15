import { Coooooins } from '../types/v3';

type InferCoinName<T> = T extends { __kind: infer A } ? A : never;
export type CoinName = InferCoinName<Pick<Coooooins, '__kind'>>;

export type BurnedReward = Exclude<CoinName, 'FREN'> | null;

export enum BlockEventName {
  IDENTITY = 'IDENTITY',
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

export type ParsedEventsData = TransferEventData | FrenBurnedEventData | string;

export type ParsedEventsDataMap = Map<BlockEventName, Set<ParsedEventsData>>;
