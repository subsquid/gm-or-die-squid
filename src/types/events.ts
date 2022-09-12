import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v3 from './v3'

export class CurrenciesFrenBurnedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.FrenBurned')
    this._chain = ctx._chain
    this.event = event
  }

  get isV3(): boolean {
    return this._chain.getEventHash('Currencies.FrenBurned') === '499ddef7919eadb13b220af048f584dacbb3f2270f501061df23e5d0cf595bdd'
  }

  get asV3(): {who: Uint8Array, amount: bigint, whatTheyGot: (v3.Coooooins | undefined)} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class CurrenciesMidOneStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.MidOneStarted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV3(): boolean {
    return this._chain.getEventHash('Currencies.MidOneStarted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class CurrenciesMidTwoStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.MidTwoStarted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV3(): boolean {
    return this._chain.getEventHash('Currencies.MidTwoStarted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class CurrenciesMorningStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.MorningStarted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV3(): boolean {
    return this._chain.getEventHash('Currencies.MorningStarted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class CurrenciesNightStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.NightStarted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV3(): boolean {
    return this._chain.getEventHash('Currencies.NightStarted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensBalanceSetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.BalanceSet')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A balance was set by root.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.BalanceSet') === '33c10839efe6f5fac3a6f50d68cb8ddab2788457e5a5a18879dd596244aa3a4f'
  }

  /**
   * A balance was set by root.
   */
  get asV3(): {currencyId: v3.Coooooins, who: Uint8Array, free: bigint, reserved: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensDustLostEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.DustLost')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An account was removed whose balance was non-zero but below
   * ExistentialDeposit, resulting in an outright loss.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.DustLost') === '6d73954b70df5e2d9fc2fb289a36e630a911c60824edcb31758207a42e42c6fe'
  }

  /**
   * An account was removed whose balance was non-zero but below
   * ExistentialDeposit, resulting in an outright loss.
   */
  get asV3(): {currencyId: v3.Coooooins, who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensEndowedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.Endowed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An account was created with some free balance.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.Endowed') === '6d73954b70df5e2d9fc2fb289a36e630a911c60824edcb31758207a42e42c6fe'
  }

  /**
   * An account was created with some free balance.
   */
  get asV3(): {currencyId: v3.Coooooins, who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensReserveRepatriatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.ReserveRepatriated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some reserved balance was repatriated (moved from reserved to
   * another account).
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.ReserveRepatriated') === '08bf10315e986e14f278fc2b6a00b7b6eeeedf4692ccbf0b7c29a9d524d0fb07'
  }

  /**
   * Some reserved balance was repatriated (moved from reserved to
   * another account).
   */
  get asV3(): {currencyId: v3.Coooooins, from: Uint8Array, to: Uint8Array, amount: bigint, status: v3.BalanceStatus} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensReservedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.Reserved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.Reserved') === '6d73954b70df5e2d9fc2fb289a36e630a911c60824edcb31758207a42e42c6fe'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV3(): {currencyId: v3.Coooooins, who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensTotalIssuanceSetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.TotalIssuanceSet')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * The total issuance of an currency has been set
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.TotalIssuanceSet') === '189c73d08533803a577cf63bcbf7ec9520fa28fce05c4fa58a84dc36bc3a847d'
  }

  /**
   * The total issuance of an currency has been set
   */
  get asV3(): {currencyId: v3.Coooooins, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensUnreservedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.Unreserved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.Unreserved') === '6d73954b70df5e2d9fc2fb289a36e630a911c60824edcb31758207a42e42c6fe'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV3(): {currencyId: v3.Coooooins, who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensWithdrawnEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.Withdrawn')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some balances were withdrawn (e.g. pay for transaction fee)
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.Withdrawn') === '6d73954b70df5e2d9fc2fb289a36e630a911c60824edcb31758207a42e42c6fe'
  }

  /**
   * Some balances were withdrawn (e.g. pay for transaction fee)
   */
  get asV3(): {currencyId: v3.Coooooins, who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}
