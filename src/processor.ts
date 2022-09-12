import { lookupArchive } from '@subsquid/archive-registry';
import * as ss58 from '@subsquid/ss58';
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor } from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import {
  CurrenciesFrenBurnedEvent,
  CurrenciesMidOneStartedEvent,
  CurrenciesMidTwoStartedEvent,
  CurrenciesMorningStartedEvent,
  CurrenciesNightStartedEvent,
  TokensBalanceSetEvent,
  TokensDustLostEvent,
  TokensEndowedEvent,
  TokensReservedEvent,
  TokensReserveRepatriatedEvent,
  TokensTotalIssuanceSetEvent,
  TokensUnreservedEvent,
  TokensWithdrawnEvent
} from './types/events';

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
    archive: lookupArchive('gmordie', { release: 'FireSquid' })
  })
  // .setTypesBundle('gmordie')
  .addEvent('Tokens.Endowed', addEventDataConfig)
  .addEvent('Tokens.DustLost', addEventDataConfig)
  .addEvent('Tokens.Reserved', addEventDataConfig)
  .addEvent('Tokens.Unreserved', addEventDataConfig)
  .addEvent('Tokens.ReserveRepatriated', addEventDataConfig)
  .addEvent('Tokens.BalanceSet', addEventDataConfig)
  .addEvent('Tokens.TotalIssuanceSet', addEventDataConfig)
  .addEvent('Tokens.Withdrawn', addEventDataConfig)
  .addEvent('Currencies.MorningStarted', addEventDataConfig)
  .addEvent('Currencies.MidOneStarted', addEventDataConfig)
  .addEvent('Currencies.MidTwoStarted', addEventDataConfig)
  .addEvent('Currencies.NightStarted', addEventDataConfig)
  .addEvent('Currencies.FrenBurned', addEventDataConfig);

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

processor.run(new TypeormDatabase(), async (ctx) => {
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      let event;
      switch (item.name) {
        case 'Tokens.Endowed':
          event = new TokensEndowedEvent(ctx, item.event);
          console.log('Tokens.Endowed => ', event.asV3);
          break;
        case 'Tokens.DustLost':
          event = new TokensDustLostEvent(ctx, item.event);
          console.log('Tokens.DustLost => ', event.asV3);
          break;
        case 'Tokens.Reserved':
          event = new TokensReservedEvent(ctx, item.event);
          console.log('Tokens.Reserved => ', event.asV3);
          break;
        case 'Tokens.Unreserved':
          event = new TokensUnreservedEvent(ctx, item.event);
          console.log('Tokens.Unreserved => ', event.asV3);
          break;
        case 'Tokens.ReserveRepatriated':
          event = new TokensReserveRepatriatedEvent(ctx, item.event);
          console.log('Tokens.ReserveRepatriated => ', event.asV3);
          break;
        case 'Tokens.BalanceSet':
          event = new TokensBalanceSetEvent(ctx, item.event);
          console.log('Tokens.BalanceSet => ', event.asV3);
          break;
        case 'Tokens.TotalIssuanceSet':
          event = new TokensTotalIssuanceSetEvent(ctx, item.event);
          console.log('Tokens.TotalIssuanceSet => ', event.asV3);
          break;
        case 'Tokens.Withdrawn':
          event = new TokensWithdrawnEvent(ctx, item.event);
          console.log('Tokens.Withdrawn => ', event.asV3);
          break;

        case 'Currencies.MorningStarted':
          event = new CurrenciesMorningStartedEvent(ctx, item.event);
          console.log('Currencies.MorningStarted => ', event.asV3);
          break;
        case 'Currencies.MidOneStarted':
          event = new CurrenciesMidOneStartedEvent(ctx, item.event);
          console.log('Currencies.MidOneStarted => ', event.asV3);
          break;
        case 'Currencies.MidTwoStarted':
          event = new CurrenciesMidTwoStartedEvent(ctx, item.event);
          console.log('Currencies.MidTwoStarted => ', event.asV3);
          break;
        case 'Currencies.NightStarted':
          event = new CurrenciesNightStartedEvent(ctx, item.event);
          console.log('Currencies.NightStarted => ', event.asV3);
          break;
        case 'Currencies.FrenBurned':
          event = new CurrenciesFrenBurnedEvent(ctx, item.event);
          console.log('Currencies.FrenBurned => ', event.asV3);
          break;
        default:
      }
    }
  }

  // let transfersData = getTransfers(ctx);
  //
  // let accountIds = new Set<string>();
  // for (let t of transfersData) {
  //   accountIds.add(t.from);
  //   accountIds.add(t.to);
  // }
  //
  // let accounts = await ctx.store.findBy(Account, { id: In([...accountIds]) }).then((accounts) => {
  //   return new Map(accounts.map((a) => [a.id, a]));
  // });
  //
  // let transfers: Transfer[] = [];
  //
  // for (let t of transfersData) {
  //   let { id, blockNumber, timestamp, extrinsicHash, amount, fee } = t;
  //
  //   let from = getAccount(accounts, t.from);
  //   let to = getAccount(accounts, t.to);
  //
  //   transfers.push(
  //     new Transfer({
  //       id,
  //       blockNumber,
  //       timestamp,
  //       extrinsicHash,
  //       from,
  //       to,
  //       amount,
  //       fee
  //     })
  //   );
  // }
  //
  // await ctx.store.save(Array.from(accounts.values()));
  // await ctx.store.insert(transfers);
});

// interface TransferEvent {
//   id: string;
//   blockNumber: number;
//   timestamp: Date;
//   extrinsicHash?: string;
//   from: string;
//   to: string;
//   amount: bigint;
//   fee?: bigint;
// }

// function getTransfers(ctx: Ctx): TransferEvent[] {
//   let transfers: TransferEvent[] = [];
//   for (let block of ctx.blocks) {
//     for (let item of block.items) {
//       if (item.name == 'Balances.Transfer') {
//         let e = new BalancesTransferEvent(ctx, item.event);
//         let rec: { from: Uint8Array; to: Uint8Array; amount: bigint };
//         if (e.isV1020) {
//           let [from, to, amount] = e.asV1020;
//           rec = { from, to, amount };
//         } else if (e.isV1050) {
//           let [from, to, amount] = e.asV1050;
//           rec = { from, to, amount };
//         } else {
//           rec = e.asV9130;
//         }
//         transfers.push({
//           id: item.event.id,
//           blockNumber: block.header.height,
//           timestamp: new Date(block.header.timestamp),
//           extrinsicHash: item.event.extrinsic?.hash,
//           from: ss58.codec('kusama').encode(rec.from),
//           to: ss58.codec('kusama').encode(rec.to),
//           amount: rec.amount,
//           fee: item.event.extrinsic?.fee || 0n
//         });
//       }
//     }
//   }
//   return transfers;
// }

// function getAccount(m: Map<string, Account>, id: string): Account {
//   let acc = m.get(id);
//   if (acc == null) {
//     acc = new Account();
//     acc.id = id;
//     m.set(id, acc);
//   }
//   return acc;
// }
