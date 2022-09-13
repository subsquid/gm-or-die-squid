import * as ss58 from '@subsquid/ss58';

export const GMORDIE_PREFIX = 7013;

let gmOrDieSs58CodecInst: ss58.Codec | null = null;

export const gmOrDieAddressSs58ToString = (address: Uint8Array) => {
  if (!gmOrDieSs58CodecInst) gmOrDieSs58CodecInst = ss58.codec(GMORDIE_PREFIX);
  return gmOrDieSs58CodecInst.encode(address);
};
