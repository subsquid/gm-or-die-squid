import { lookupArchive } from '@subsquid/archive-registry';
import * as ss58 from '@subsquid/ss58';
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor
} from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import { getParsedEventsData } from './mappers/common';
import { Account, Transfer, FrenBurned, AccountBalance } from './model';
import SquidCache from './utils/squid-cache';
import { handleTransfers } from './mappers/transfer';
import { handleAccountIdentityBalanceUpdates } from './mappers/account';
import {
  TransferEventData,
  BlockEventName,
  FrenBurnedEventData,
  BurnedReward
} from './utils/types';
import { handleFrenBurned } from './mappers/frenBurned';

const addEventDataConfig = {
  data: {
    event: {
      args: true,
      extrinsic: {
        hash: true,
        fee: true,
        signature: true
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
      genesis:
        '0x19a3733beb9cb8a970a308d835599e9005e02dc007a35440e461a451466776f8'
    }),
    chain: 'wss://ws.gm.bldnodes.org'
  })
  .addEvent('Tokens.Endowed', addEventDataConfig)
  .addEvent('Currencies.FrenBurned', addEventDataConfig)
  .addEvent('Tokens.Transfer', addEventDataConfig)
  .addEvent('Balances.Transfer', addEventDataConfig)
  .addEvent('Balances.Endowed', addEventDataConfig)
  .addEvent('Identity.IdentitySet', addEventDataConfig)
  .addEvent('Identity.IdentityKilled', addEventDataConfig)
  .addEvent('Identity.IdentityCleared', addEventDataConfig)
  .addEvent('Identity.JudgementGiven', addEventDataConfig);

type Item = BatchProcessorItem<typeof processor>;
export type Ctx = BatchContext<Store, Item>;

processor.run(new TypeormDatabase(), async (ctx) => {
  SquidCache.init(ctx, [Account, Transfer, FrenBurned, AccountBalance]);
  const parsedEvents = getParsedEventsData(ctx);
  await SquidCache.load();

  handleTransfers(parsedEvents.get<TransferEventData>(BlockEventName.TRANSFER));
  handleFrenBurned(
    parsedEvents.get<FrenBurnedEventData>(BlockEventName.FREN_BURNED)
  );
  await handleAccountIdentityBalanceUpdates(ctx, parsedEvents);

  await SquidCache.flush();
  SquidCache.purge();
});
