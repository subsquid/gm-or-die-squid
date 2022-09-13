import { lookupArchive } from '@subsquid/archive-registry';
import * as ss58 from '@subsquid/ss58';
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor } from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { getParsedEventsData } from './mappers/common';
import { Account, Transfer, FrenBurned, Token } from './model';
import SquidCache from './utils/squid-cache';

const addEventDataConfig = {
  data: {
    event: {
      args: true,
      extrinsic: {
        hash: true,
        fee: true
      }
    }
  }
} as const;

const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setDataSource({
    // Lookup archive by the network name in the Subsquid registry
    archive: lookupArchive('gmordie', {
      release: 'FireSquid',
      genesis: '0x19a3733beb9cb8a970a308d835599e9005e02dc007a35440e461a451466776f8'
    }),
    chain: 'wss://ws.gm.bldnodes.org'
  })
  /**
   * An account was created with some free balance. (Only GM | GN)
   */
  .addEvent('Tokens.Endowed', addEventDataConfig)
  .addEvent('Currencies.FrenBurned', addEventDataConfig)
  /**
   * Transfer succeeded. (only GM | GN tokens)
   */
  .addEvent('Tokens.Transfer', addEventDataConfig)
  /**
   * Transfer succeeded. (only FREN token)
   */
  .addEvent('Balances.Transfer', addEventDataConfig);

type Item = BatchProcessorItem<typeof processor>;
export type Ctx = BatchContext<Store, Item>;

processor.run(new TypeormDatabase(), async (ctx) => {
  SquidCache.init(ctx, [Account, Transfer, FrenBurned, Token]);
  const parsedEvents = getParsedEventsData(ctx);
});
