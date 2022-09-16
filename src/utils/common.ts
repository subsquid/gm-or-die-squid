import * as ss58 from '@subsquid/ss58';
import {
  BlockEventName,
  FrenBurnedEventData,
  ParsedEventsData,
  ParsedEventsDataMap,
  TransferEventData
} from './types';


export const GMORDIE_PREFIX = 7013;

let gmOrDieSs58CodecInst: ss58.Codec | null = null;

export const gmOrDieAddressSs58ToString = (address: Uint8Array): string => {
  if (!gmOrDieSs58CodecInst) gmOrDieSs58CodecInst = ss58.codec(GMORDIE_PREFIX);
  return gmOrDieSs58CodecInst.encode(address);
};
export const gmOrDieAddressStringToSs58 = (address: string): Uint8Array => {
  if (!gmOrDieSs58CodecInst) gmOrDieSs58CodecInst = ss58.codec(GMORDIE_PREFIX);
  return gmOrDieSs58CodecInst.decode(address);
};

export class ParsedEventsDataScope {
  private scope: ParsedEventsDataMap;

  constructor() {
    this.scope = new Map<
      BlockEventName,
      Set<TransferEventData | FrenBurnedEventData | string>
    >();
  }

  set(section: BlockEventName, value: ParsedEventsData) {
    this.scope.set(section, (this.scope.get(section) || new Set()).add(value));
  }

  get<T>(section: BlockEventName): Set<T> {
    return (this.scope.get(section) as Set<T>) || new Set<T>();
  }
}
