import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v3 from './v3'
import * as v4 from './v4'

export class AuraAuthoritiesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current authority set.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Aura', 'Authorities') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current authority set.
   */
  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Aura', 'Authorities')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Aura', 'Authorities') != null
  }
}

export class AuraCurrentSlotStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current slot of this block.
   * 
   *  This will be set in `on_initialize`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Aura', 'CurrentSlot') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The current slot of this block.
   * 
   *  This will be set in `on_initialize`.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Aura', 'CurrentSlot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Aura', 'CurrentSlot') != null
  }
}

export class AuraExtAuthoritiesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Serves as cache for the authorities.
   * 
   *  The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
   *  but we require the old authorities to verify the seal when validating a PoV. This will always
   *  be updated to the latest AuRa authorities in `on_finalize`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('AuraExt', 'Authorities') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  Serves as cache for the authorities.
   * 
   *  The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
   *  but we require the old authorities to verify the seal when validating a PoV. This will always
   *  be updated to the latest AuRa authorities in `on_finalize`.
   */
  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'AuraExt', 'Authorities')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('AuraExt', 'Authorities') != null
  }
}

export class AuthorshipAuthorStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Author of current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Authorship', 'Author') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  Author of current block.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Authorship', 'Author')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Authorship', 'Author') != null
  }
}

export class AuthorshipDidSetUnclesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Whether uncles were already set in this block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Authorship', 'DidSetUncles') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Whether uncles were already set in this block.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Authorship', 'DidSetUncles')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Authorship', 'DidSetUncles') != null
  }
}

export class AuthorshipUnclesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Uncles
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Authorship', 'Uncles') === '320be201dc467df78c8912d3a5ad0cb57cd9b25ab8bff2e738597ffc0a83b551'
  }

  /**
   *  Uncles
   */
  async getAsV3(): Promise<v3.UncleEntryItem[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Authorship', 'Uncles')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Authorship', 'Uncles') != null
  }
}

export class BalancesAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The Balances pallet example of storing the balance of an account.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
   *   }
   *  ```
   * 
   *  You can also store the balance of an account in the `System` pallet.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *    type AccountStore = System
   *   }
   *  ```
   * 
   *  But this comes with tradeoffs, storing account balances in the system pallet stores
   *  `frame_system` data alongside the account data contrary to storing account balances in the
   *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
  }

  /**
   *  The Balances pallet example of storing the balance of an account.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
   *   }
   *  ```
   * 
   *  You can also store the balance of an account in the `System` pallet.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *    type AccountStore = System
   *   }
   *  ```
   * 
   *  But this comes with tradeoffs, storing account balances in the system pallet stores
   *  `frame_system` data alongside the account data contrary to storing account balances in the
   *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  async getAsV3(key: Uint8Array): Promise<v3.AccountData> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.AccountData)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') != null
  }
}

export class BalancesLocksStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
  }

  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  async getAsV3(key: Uint8Array): Promise<v3.BalanceLock[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Locks', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.BalanceLock[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Locks', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') != null
  }
}

export class BalancesReservesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Named reserves on some account balances.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
  }

  /**
   *  Named reserves on some account balances.
   */
  async getAsV3(key: Uint8Array): Promise<v3.ReserveData[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Reserves', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.ReserveData[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Reserves', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') != null
  }
}

export class BalancesStorageVersionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Storage version of the pallet.
   * 
   *  This is set to v2.0.0 for new networks.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'StorageVersion') === '1431e80ffaa4d10a7fe714faa381ada05c3baae7e12aa80f24f8728a41ba57c4'
  }

  /**
   *  Storage version of the pallet.
   * 
   *  This is set to v2.0.0 for new networks.
   */
  async getAsV3(): Promise<v3.Releases> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'StorageVersion') != null
  }
}

export class BalancesTotalIssuanceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The total units issued in the system.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
  }
}

export class CarrotOnAStickVestingSchedulesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Vesting schedules of an account.
   * 
   *  VestingSchedules: map AccountId => Vec<VestingSchedule>
   */
  get isV4() {
    return this._chain.getStorageItemTypeHash('CarrotOnAStick', 'VestingSchedules') === 'd1025301ffa60f04c50bb1007ecb356d52103dd9c366150de1ba80c6e043ac2f'
  }

  /**
   *  Vesting schedules of an account.
   * 
   *  VestingSchedules: map AccountId => Vec<VestingSchedule>
   */
  async getAsV4(key: Uint8Array): Promise<v4.VestingSchedule[]> {
    assert(this.isV4)
    return this._chain.getStorage(this.blockHash, 'CarrotOnAStick', 'VestingSchedules', key)
  }

  async getManyAsV4(keys: Uint8Array[]): Promise<(v4.VestingSchedule[])[]> {
    assert(this.isV4)
    return this._chain.queryStorage(this.blockHash, 'CarrotOnAStick', 'VestingSchedules', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CarrotOnAStick', 'VestingSchedules') != null
  }
}

export class CollatorSelectionCandidacyBondStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Fixed amount to deposit to become a collator.
   * 
   *  When a collator calls `leave_intent` they immediately receive the deposit back.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'CandidacyBond') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  Fixed amount to deposit to become a collator.
   * 
   *  When a collator calls `leave_intent` they immediately receive the deposit back.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'CollatorSelection', 'CandidacyBond')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'CandidacyBond') != null
  }
}

export class CollatorSelectionCandidatesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The (community, limited) collation candidates.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'Candidates') === '239ae5a83674078569642b29549b6d89d616b5748799fde8f01f3356f32141fd'
  }

  /**
   *  The (community, limited) collation candidates.
   */
  async getAsV3(): Promise<v3.CandidateInfo[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'CollatorSelection', 'Candidates')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'Candidates') != null
  }
}

export class CollatorSelectionDesiredCandidatesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Desired number of candidates.
   * 
   *  This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'DesiredCandidates') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Desired number of candidates.
   * 
   *  This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'CollatorSelection', 'DesiredCandidates')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'DesiredCandidates') != null
  }
}

export class CollatorSelectionInvulnerablesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The invulnerable, fixed collators.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'Invulnerables') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The invulnerable, fixed collators.
   */
  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'CollatorSelection', 'Invulnerables')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'Invulnerables') != null
  }
}

export class CollatorSelectionLastAuthoredBlockStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Last block authored by collator.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'LastAuthoredBlock') === '25f0d63900988134e6767c7fe398885c0448fd3bd7a0d8ff90cf6b33a482cebd'
  }

  /**
   *  Last block authored by collator.
   */
  async getAsV3(key: Uint8Array): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'CollatorSelection', 'LastAuthoredBlock', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(number)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'CollatorSelection', 'LastAuthoredBlock', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CollatorSelection', 'LastAuthoredBlock') != null
  }
}

export class CurrenciesCurrentTimePeriodStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Currencies', 'CurrentTimePeriod') === '8be56f0de1e5c957c0937b248adfbc96fa39703d358605ca52cf42bb41ff316f'
  }

  async getAsV3(): Promise<v3.TimePeriod> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Currencies', 'CurrentTimePeriod')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Currencies', 'CurrentTimePeriod') != null
  }
}

export class DmpQueueConfigurationStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The configuration.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'Configuration') === 'de2fc633d896ffed21e1f630f0a1bfe710ecfa69921c58a4a758e7fd49d0b5a4'
  }

  /**
   *  The configuration.
   */
  async getAsV3(): Promise<v3.ConfigData> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'DmpQueue', 'Configuration')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'Configuration') != null
  }
}

export class DmpQueueOverweightStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The overweight messages.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'Overweight') === '02b70c9350fc19f8edcf45c5eb6332933141453267579d97f6eece480cbaa4d4'
  }

  /**
   *  The overweight messages.
   */
  async getAsV3(key: bigint): Promise<[number, Uint8Array] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'DmpQueue', 'Overweight', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<([number, Uint8Array] | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'DmpQueue', 'Overweight', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'Overweight') != null
  }
}

export class DmpQueuePageIndexStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The page index.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'PageIndex') === 'cad43146ccd742f66da886b2f77b13d96d2c4de637fbb965a7493a2f16c99189'
  }

  /**
   *  The page index.
   */
  async getAsV3(): Promise<v3.PageIndexData> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'DmpQueue', 'PageIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'PageIndex') != null
  }
}

export class DmpQueuePagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The queue pages.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'Pages') === '0b9460c8234ca1e6341c95066d20ac8d7e79e3a9b2def20c9450f88ef0ab1b1d'
  }

  /**
   *  The queue pages.
   */
  async getAsV3(key: number): Promise<[number, Uint8Array][]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'DmpQueue', 'Pages', key)
  }

  async getManyAsV3(keys: number[]): Promise<([number, Uint8Array][])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'DmpQueue', 'Pages', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('DmpQueue', 'Pages') != null
  }
}

export class IdentityIdentityOfStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Information that is pertinent to identify the entity behind an account.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Identity', 'IdentityOf') === 'eee9529c5197f7a5f8200e155d78bab0a612de49bd6c8941e539265edf54c3aa'
  }

  /**
   *  Information that is pertinent to identify the entity behind an account.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  async getAsV3(key: Uint8Array): Promise<v3.Registration | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Identity', 'IdentityOf', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.Registration | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'IdentityOf', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'IdentityOf') != null
  }
}

export class IdentityRegistrarsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The set of registrars. Not expected to get very big as can only be added through a
   *  special origin (likely a council motion).
   * 
   *  The index into this can be cast to `RegistrarIndex` to get a valid value.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Identity', 'Registrars') === 'd53feea500c88336983c65706eeb51794b1fc991a17d6d33663d49aeb47b12b6'
  }

  /**
   *  The set of registrars. Not expected to get very big as can only be added through a
   *  special origin (likely a council motion).
   * 
   *  The index into this can be cast to `RegistrarIndex` to get a valid value.
   */
  async getAsV3(): Promise<(v3.RegistrarInfo | undefined)[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Identity', 'Registrars')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'Registrars') != null
  }
}

export class IdentitySubsOfStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Alternative "sub" identities of this account.
   * 
   *  The first item is the deposit, the second is a vector of the accounts.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Identity', 'SubsOf') === '925d8593182dee4b16701bef694e42944c6fa6f1d20d0a7b05fb8ed6b451f6b7'
  }

  /**
   *  Alternative "sub" identities of this account.
   * 
   *  The first item is the deposit, the second is a vector of the accounts.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  async getAsV3(key: Uint8Array): Promise<[bigint, Uint8Array[]]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Identity', 'SubsOf', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<([bigint, Uint8Array[]])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'SubsOf', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'SubsOf') != null
  }
}

export class IdentitySuperOfStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The super-identity of an alternative "sub" identity together with its name, within that
   *  context. If the account is not some other account's sub-identity, then just `None`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Identity', 'SuperOf') === '3e2404306f316847b5946856f8222df193ecb9ace5e509cd9f8808145fd9b792'
  }

  /**
   *  The super-identity of an alternative "sub" identity together with its name, within that
   *  context. If the account is not some other account's sub-identity, then just `None`.
   */
  async getAsV3(key: Uint8Array): Promise<[Uint8Array, v3.Data] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Identity', 'SuperOf', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<([Uint8Array, v3.Data] | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'SuperOf', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'SuperOf') != null
  }
}

export class ParachainInfoParachainIdStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainInfo', 'ParachainId') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainInfo', 'ParachainId')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainInfo', 'ParachainId') != null
  }
}

export class ParachainSystemAnnouncedHrmpMessagesPerCandidateStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The number of HRMP messages we observed in `on_initialize` and thus used that number for
   *  announcing the weight of `on_initialize` and `on_finalize`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'AnnouncedHrmpMessagesPerCandidate') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of HRMP messages we observed in `on_initialize` and thus used that number for
   *  announcing the weight of `on_initialize` and `on_finalize`.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'AnnouncedHrmpMessagesPerCandidate')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'AnnouncedHrmpMessagesPerCandidate') != null
  }
}

export class ParachainSystemAuthorizedUpgradeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The next authorized upgrade, if there is one.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'AuthorizedUpgrade') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  The next authorized upgrade, if there is one.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'AuthorizedUpgrade')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'AuthorizedUpgrade') != null
  }
}

export class ParachainSystemCustomValidationHeadDataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  A custom head data that should be returned as result of `validate_block`.
   * 
   *  See [`Pallet::set_custom_validation_head_data`] for more information.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'CustomValidationHeadData') === '9d37db61fb40fc6c377391f52a7b349395407634d45b47a8943ab5ccf47e31e4'
  }

  /**
   *  A custom head data that should be returned as result of `validate_block`.
   * 
   *  See [`Pallet::set_custom_validation_head_data`] for more information.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'CustomValidationHeadData')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'CustomValidationHeadData') != null
  }
}

export class ParachainSystemDidSetValidationCodeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Were the validation data set to notify the relay chain?
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'DidSetValidationCode') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Were the validation data set to notify the relay chain?
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'DidSetValidationCode')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'DidSetValidationCode') != null
  }
}

export class ParachainSystemHostConfigurationStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The parachain host configuration that was obtained from the relay parent.
   * 
   *  This field is meant to be updated each block with the validation data inherent. Therefore,
   *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
   * 
   *  This data is also absent from the genesis.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'HostConfiguration') === '76792d33ff147d490bc5f8e4454e476c4ef71aae7021fd1a44f96974f263af9b'
  }

  /**
   *  The parachain host configuration that was obtained from the relay parent.
   * 
   *  This field is meant to be updated each block with the validation data inherent. Therefore,
   *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
   * 
   *  This data is also absent from the genesis.
   */
  async getAsV3(): Promise<v3.V2AbridgedHostConfiguration | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'HostConfiguration')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'HostConfiguration') != null
  }
}

export class ParachainSystemHrmpOutboundMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  HRMP messages that were sent in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'HrmpOutboundMessages') === '0330a7423804895204dc06607d196d45bbec59edfd3f4f38c868daa9e880928c'
  }

  /**
   *  HRMP messages that were sent in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  async getAsV3(): Promise<v3.OutboundHrmpMessage[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'HrmpOutboundMessages')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'HrmpOutboundMessages') != null
  }
}

export class ParachainSystemHrmpWatermarkStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  HRMP watermark that was set in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'HrmpWatermark') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  HRMP watermark that was set in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'HrmpWatermark')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'HrmpWatermark') != null
  }
}

export class ParachainSystemLastDmqMqcHeadStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The last downward message queue chain head we have observed.
   * 
   *  This value is loaded before and saved after processing inbound downward messages carried
   *  by the system inherent.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'LastDmqMqcHead') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  The last downward message queue chain head we have observed.
   * 
   *  This value is loaded before and saved after processing inbound downward messages carried
   *  by the system inherent.
   */
  async getAsV3(): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'LastDmqMqcHead')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'LastDmqMqcHead') != null
  }
}

export class ParachainSystemLastHrmpMqcHeadsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The message queue chain heads we have observed per each channel incoming channel.
   * 
   *  This value is loaded before and saved after processing inbound downward messages carried
   *  by the system inherent.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'LastHrmpMqcHeads') === '26057692e067e44d8eec686a8711f8b87a11679701c3afa133f7b9da8f327999'
  }

  /**
   *  The message queue chain heads we have observed per each channel incoming channel.
   * 
   *  This value is loaded before and saved after processing inbound downward messages carried
   *  by the system inherent.
   */
  async getAsV3(): Promise<[number, Uint8Array][]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'LastHrmpMqcHeads')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'LastHrmpMqcHeads') != null
  }
}

export class ParachainSystemLastRelayChainBlockNumberStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The relay chain block number associated with the last parachain block.
   */
  get isV4() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'LastRelayChainBlockNumber') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The relay chain block number associated with the last parachain block.
   */
  async getAsV4(): Promise<number> {
    assert(this.isV4)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'LastRelayChainBlockNumber')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'LastRelayChainBlockNumber') != null
  }
}

export class ParachainSystemNewValidationCodeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Validation code that is set by the parachain and is to be communicated to collator and
   *  consequently the relay-chain.
   * 
   *  This will be cleared in `on_initialize` of each new block if no other pallet already set
   *  the value.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'NewValidationCode') === '9d37db61fb40fc6c377391f52a7b349395407634d45b47a8943ab5ccf47e31e4'
  }

  /**
   *  Validation code that is set by the parachain and is to be communicated to collator and
   *  consequently the relay-chain.
   * 
   *  This will be cleared in `on_initialize` of each new block if no other pallet already set
   *  the value.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'NewValidationCode')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'NewValidationCode') != null
  }
}

export class ParachainSystemPendingUpwardMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Upward messages that are still pending and not yet send to the relay chain.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'PendingUpwardMessages') === '69b64a98b95b35e85f746389396240a8c70e1dca686229dc8d8a0812c030037a'
  }

  /**
   *  Upward messages that are still pending and not yet send to the relay chain.
   */
  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'PendingUpwardMessages')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'PendingUpwardMessages') != null
  }
}

export class ParachainSystemPendingValidationCodeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  In case of a scheduled upgrade, this storage field contains the validation code to be applied.
   * 
   *  As soon as the relay chain gives us the go-ahead signal, we will overwrite the [`:code`][well_known_keys::CODE]
   *  which will result the next block process with the new validation code. This concludes the upgrade process.
   * 
   *  [well_known_keys::CODE]: sp_core::storage::well_known_keys::CODE
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'PendingValidationCode') === '8199405308c9981e32f632f64a8758ba69af0e625da26ff6d6670b81cc1f1647'
  }

  /**
   *  In case of a scheduled upgrade, this storage field contains the validation code to be applied.
   * 
   *  As soon as the relay chain gives us the go-ahead signal, we will overwrite the [`:code`][well_known_keys::CODE]
   *  which will result the next block process with the new validation code. This concludes the upgrade process.
   * 
   *  [well_known_keys::CODE]: sp_core::storage::well_known_keys::CODE
   */
  async getAsV3(): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'PendingValidationCode')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'PendingValidationCode') != null
  }
}

export class ParachainSystemProcessedDownwardMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Number of downward messages processed in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ProcessedDownwardMessages') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of downward messages processed in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'ProcessedDownwardMessages')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ProcessedDownwardMessages') != null
  }
}

export class ParachainSystemRelayStateProofStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The state proof for the last relay parent block.
   * 
   *  This field is meant to be updated each block with the validation data inherent. Therefore,
   *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
   * 
   *  This data is also absent from the genesis.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'RelayStateProof') === '38f79414b788123884c7cc1e6c6ca89331d3264f4bdcf6dff4501d6b20966908'
  }

  /**
   *  The state proof for the last relay parent block.
   * 
   *  This field is meant to be updated each block with the validation data inherent. Therefore,
   *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
   * 
   *  This data is also absent from the genesis.
   */
  async getAsV3(): Promise<v3.StorageProof | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'RelayStateProof')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'RelayStateProof') != null
  }
}

export class ParachainSystemRelevantMessagingStateStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The snapshot of some state related to messaging relevant to the current parachain as per
   *  the relay parent.
   * 
   *  This field is meant to be updated each block with the validation data inherent. Therefore,
   *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
   * 
   *  This data is also absent from the genesis.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'RelevantMessagingState') === '24e0311e0ec9634d6acff6e06aa83b4bd4c57957b8f7525bf0dd22f0a73d7b09'
  }

  /**
   *  The snapshot of some state related to messaging relevant to the current parachain as per
   *  the relay parent.
   * 
   *  This field is meant to be updated each block with the validation data inherent. Therefore,
   *  before processing of the inherent, e.g. in `on_initialize` this data may be stale.
   * 
   *  This data is also absent from the genesis.
   */
  async getAsV3(): Promise<v3.MessagingStateSnapshot | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'RelevantMessagingState')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'RelevantMessagingState') != null
  }
}

export class ParachainSystemReservedDmpWeightOverrideStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The weight we reserve at the beginning of the block for processing DMP messages. This
   *  overrides the amount set in the Config trait.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ReservedDmpWeightOverride') === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
  }

  /**
   *  The weight we reserve at the beginning of the block for processing DMP messages. This
   *  overrides the amount set in the Config trait.
   */
  async getAsV3(): Promise<bigint | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'ReservedDmpWeightOverride')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ReservedDmpWeightOverride') != null
  }
}

export class ParachainSystemReservedXcmpWeightOverrideStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The weight we reserve at the beginning of the block for processing XCMP messages. This
   *  overrides the amount set in the Config trait.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ReservedXcmpWeightOverride') === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
  }

  /**
   *  The weight we reserve at the beginning of the block for processing XCMP messages. This
   *  overrides the amount set in the Config trait.
   */
  async getAsV3(): Promise<bigint | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'ReservedXcmpWeightOverride')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ReservedXcmpWeightOverride') != null
  }
}

export class ParachainSystemUpgradeRestrictionSignalStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  An option which indicates if the relay-chain restricts signalling a validation code upgrade.
   *  In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
   *  candidate will be invalid.
   * 
   *  This storage item is a mirror of the corresponding value for the current parachain from the
   *  relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
   *  set after the inherent.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'UpgradeRestrictionSignal') === '2236db14165f1386be95c2e72a22524bdd6b93f6d64e4b0b39d54e03f1f1bee2'
  }

  /**
   *  An option which indicates if the relay-chain restricts signalling a validation code upgrade.
   *  In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
   *  candidate will be invalid.
   * 
   *  This storage item is a mirror of the corresponding value for the current parachain from the
   *  relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
   *  set after the inherent.
   */
  async getAsV3(): Promise<(v3.V2UpgradeRestriction | undefined)> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'UpgradeRestrictionSignal')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'UpgradeRestrictionSignal') != null
  }
}

export class ParachainSystemUpwardMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Upward messages that were sent in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'UpwardMessages') === '69b64a98b95b35e85f746389396240a8c70e1dca686229dc8d8a0812c030037a'
  }

  /**
   *  Upward messages that were sent in a block.
   * 
   *  This will be cleared in `on_initialize` of each new block.
   */
  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'UpwardMessages')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'UpwardMessages') != null
  }
}

export class ParachainSystemValidationDataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The [`PersistedValidationData`] set for this block.
   *  This value is expected to be set only once per block and it's never stored
   *  in the trie.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ValidationData') === 'fb37759067a991bce599d3fbe39ee38b99d63716a96357c3a39bf04c66e2579d'
  }

  /**
   *  The [`PersistedValidationData`] set for this block.
   *  This value is expected to be set only once per block and it's never stored
   *  in the trie.
   */
  async getAsV3(): Promise<v3.V2PersistedValidationData | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'ParachainSystem', 'ValidationData')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ParachainSystem', 'ValidationData') != null
  }
}

export class SessionCurrentIndexStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Current index of the session.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'CurrentIndex') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Current index of the session.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'CurrentIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'CurrentIndex') != null
  }
}

export class SessionDisabledValidatorsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Indices of disabled validators.
   * 
   *  The vec is always kept sorted so that we can find whether a given validator is
   *  disabled using binary search. It gets cleared when `on_session_ending` returns
   *  a new set of identities.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'DisabledValidators') === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
  }

  /**
   *  Indices of disabled validators.
   * 
   *  The vec is always kept sorted so that we can find whether a given validator is
   *  disabled using binary search. It gets cleared when `on_session_ending` returns
   *  a new set of identities.
   */
  async getAsV3(): Promise<number[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'DisabledValidators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'DisabledValidators') != null
  }
}

export class SessionKeyOwnerStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'KeyOwner') === '20cf09ea865a34d19d79cca4e3df7a5a719547bdf984f5ab8eb811d55da822e5'
  }

  /**
   *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
   */
  async getAsV3(key: [Uint8Array, Uint8Array]): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'KeyOwner', key)
  }

  async getManyAsV3(keys: [Uint8Array, Uint8Array][]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Session', 'KeyOwner', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'KeyOwner') != null
  }
}

export class SessionNextKeysStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The next session keys for a validator.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'NextKeys') === '631bdf50943dc1aa6eef0e538bc5f8db41fca7120b2bae11b9c7ad84ada29964'
  }

  /**
   *  The next session keys for a validator.
   */
  async getAsV3(key: Uint8Array): Promise<v3.SessionKeys | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'NextKeys', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.SessionKeys | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Session', 'NextKeys', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'NextKeys') != null
  }
}

export class SessionQueuedChangedStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  True if the underlying economic identities or weighting behind the validators
   *  has changed in the queued validator set.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedChanged') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if the underlying economic identities or weighting behind the validators
   *  has changed in the queued validator set.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'QueuedChanged')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedChanged') != null
  }
}

export class SessionQueuedKeysStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The queued keys for the next session. When the next session begins, these keys
   *  will be used to determine the validator's session keys.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedKeys') === '88cd205a98ff7b5562f0d030266b07e3566fdf283e05e6bd4c2405710a6a3b90'
  }

  /**
   *  The queued keys for the next session. When the next session begins, these keys
   *  will be used to determine the validator's session keys.
   */
  async getAsV3(): Promise<[Uint8Array, v3.SessionKeys][]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'QueuedKeys')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedKeys') != null
  }
}

export class SessionValidatorsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current set of validators.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Session', 'Validators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') != null
  }
}

export class SudoKeyStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The `AccountId` of the sudo key.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  The `AccountId` of the sudo key.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Sudo', 'Key')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') != null
  }
}

export class SystemAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV3(key: Uint8Array): Promise<v3.AccountInfo> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.AccountInfo)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}

export class SystemAllExtrinsicsLenStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  async getAsV3(): Promise<number | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'AllExtrinsicsLen')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') != null
  }
}

export class SystemBlockHashStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Map of block numbers to block hashes.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
  }

  /**
   *  Map of block numbers to block hashes.
   */
  async getAsV3(key: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockHash', key)
  }

  async getManyAsV3(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'BlockHash', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') != null
  }
}

export class SystemBlockWeightStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current weight for the block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') === '3117e920c869758010946f61bdfb045561b02a263bdc3bcff42e4ce915e4e5d4'
  }

  /**
   *  The current weight for the block.
   */
  async getAsV3(): Promise<v3.PerDispatchClass> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockWeight')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') != null
  }
}

export class SystemDigestStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Digest of the current block, also part of the block header.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Digest') === '6edb48fd53810bda6cc1015d69e4aacd63966970836398edb4a47cec0bf3fa85'
  }

  /**
   *  Digest of the current block, also part of the block header.
   */
  async getAsV3(): Promise<v3.Digest> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Digest')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Digest') != null
  }
}

export class SystemEventCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The number of events in the `Events<T>` list.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of events in the `Events<T>` list.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'EventCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') != null
  }
}

export class SystemEventTopicsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Mapping between a topic (represented by T::Hash) and a vector of indexes
   *  of events in the `<Events<T>>` list.
   * 
   *  All topic vectors have deterministic storage locations depending on the topic. This
   *  allows light-clients to leverage the changes trie storage tracking mechanism and
   *  in case of changes fetch the list of events of interest.
   * 
   *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
   *  the `EventIndex` then in case if the topic has the same contents on the next block
   *  no notification will be triggered thus the event might be lost.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
  }

  /**
   *  Mapping between a topic (represented by T::Hash) and a vector of indexes
   *  of events in the `<Events<T>>` list.
   * 
   *  All topic vectors have deterministic storage locations depending on the topic. This
   *  allows light-clients to leverage the changes trie storage tracking mechanism and
   *  in case of changes fetch the list of events of interest.
   * 
   *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
   *  the `EventIndex` then in case if the topic has the same contents on the next block
   *  no notification will be triggered thus the event might be lost.
   */
  async getAsV3(key: Uint8Array): Promise<[number, number][]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'EventTopics', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<([number, number][])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'EventTopics', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') != null
  }
}

export class SystemEventsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Events deposited for the current block.
   * 
   *  NOTE: The item is unbound and should therefore never be read on chain.
   *  It could otherwise inflate the PoV size of a block.
   * 
   *  Events have a large in-memory size. Box the events to not go out-of-memory
   *  just in case someone still reads them from within the runtime.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Events') === '27445b55d4b675928e13a2151ff1ce1d07d688c51464b9db5f4229e0a5b27269'
  }

  /**
   *  Events deposited for the current block.
   * 
   *  NOTE: The item is unbound and should therefore never be read on chain.
   *  It could otherwise inflate the PoV size of a block.
   * 
   *  Events have a large in-memory size. Box the events to not go out-of-memory
   *  just in case someone still reads them from within the runtime.
   */
  async getAsV3(): Promise<v3.EventRecord[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Events')
  }

  /**
   *  Events deposited for the current block.
   * 
   *  NOTE: The item is unbound and should therefore never be read on chain.
   *  It could otherwise inflate the PoV size of a block.
   * 
   *  Events have a large in-memory size. Box the events to not go out-of-memory
   *  just in case someone still reads them from within the runtime.
   */
  get isV4() {
    return this._chain.getStorageItemTypeHash('System', 'Events') === '63c214e0de3d930ff3c1b951f1c833530e6a1cd3851cedb1f1b89aca88253aba'
  }

  /**
   *  Events deposited for the current block.
   * 
   *  NOTE: The item is unbound and should therefore never be read on chain.
   *  It could otherwise inflate the PoV size of a block.
   * 
   *  Events have a large in-memory size. Box the events to not go out-of-memory
   *  just in case someone still reads them from within the runtime.
   */
  async getAsV4(): Promise<v4.EventRecord[]> {
    assert(this.isV4)
    return this._chain.getStorage(this.blockHash, 'System', 'Events')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Events') != null
  }
}

export class SystemExecutionPhaseStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The execution phase of the block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
  }

  /**
   *  The execution phase of the block.
   */
  async getAsV3(): Promise<v3.Phase | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ExecutionPhase')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') != null
  }
}

export class SystemExtrinsicCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Total extrinsics count for the current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total extrinsics count for the current block.
   */
  async getAsV3(): Promise<number | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') != null
  }
}

export class SystemExtrinsicDataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
  }

  /**
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  async getAsV3(key: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicData', key)
  }

  async getManyAsV3(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'ExtrinsicData', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') != null
  }
}

export class SystemLastRuntimeUpgradeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
  }

  /**
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  async getAsV3(): Promise<v3.LastRuntimeUpgradeInfo | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'LastRuntimeUpgrade')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') != null
  }
}

export class SystemNumberStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current block number being processed. Set by `execute_block`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Number') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The current block number being processed. Set by `execute_block`.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Number')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Number') != null
  }
}

export class SystemParentHashStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Hash of the previous block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  Hash of the previous block.
   */
  async getAsV3(): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ParentHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') != null
  }
}

export class SystemUpgradedToTripleRefCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToTripleRefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') != null
  }
}

export class SystemUpgradedToU32RefCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToU32RefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') != null
  }
}

export class TimestampDidUpdateStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Did the timestamp get updated in this block?
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Did the timestamp get updated in this block?
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'DidUpdate')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') != null
  }
}

export class TimestampNowStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Current time for the current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current time for the current block.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'Now')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') != null
  }
}

export class TokensAccountsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The balance of a token type under an account.
   * 
   *  NOTE: If the total is ever zero, decrease account ref account.
   * 
   *  NOTE: This is only used in the case that this module is used to store
   *  balances.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === 'a79ce6e761085349b0be2e1172c8129f1b45857a1e6917dacd1f11594d5511ba'
  }

  /**
   *  The balance of a token type under an account.
   * 
   *  NOTE: If the total is ever zero, decrease account ref account.
   * 
   *  NOTE: This is only used in the case that this module is used to store
   *  balances.
   */
  async getAsV3(key1: Uint8Array, key2: v3.Coooooins): Promise<v3.Type_271> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
  }

  async getManyAsV3(keys: [Uint8Array, v3.Coooooins][]): Promise<(v3.Type_271)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') != null
  }
}

export class TokensLocksStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Any liquidity locks of a token type under an account.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Tokens', 'Locks') === '3a1e2313422e21404787f6e56bd177f31dda480749e09afad32197dd8a0f468c'
  }

  /**
   *  Any liquidity locks of a token type under an account.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  async getAsV3(key1: Uint8Array, key2: v3.Coooooins): Promise<v3.Type_269[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Tokens', 'Locks', key1, key2)
  }

  async getManyAsV3(keys: [Uint8Array, v3.Coooooins][]): Promise<(v3.Type_269[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Tokens', 'Locks', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Tokens', 'Locks') != null
  }
}

export class TokensReservesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Named reserves on some account balances.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Tokens', 'Reserves') === '3a1e2313422e21404787f6e56bd177f31dda480749e09afad32197dd8a0f468c'
  }

  /**
   *  Named reserves on some account balances.
   */
  async getAsV3(key1: Uint8Array, key2: v3.Coooooins): Promise<v3.ReserveData[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Tokens', 'Reserves', key1, key2)
  }

  async getManyAsV3(keys: [Uint8Array, v3.Coooooins][]): Promise<(v3.ReserveData[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Tokens', 'Reserves', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Tokens', 'Reserves') != null
  }
}

export class TokensTotalIssuanceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The total issuance of a token type.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '9f6f337b34e84fddfd794249eb6f90fecc4c908506cc1cf43c22fff6a9a668e0'
  }

  /**
   *  The total issuance of a token type.
   */
  async getAsV3(key: v3.Coooooins): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
  }

  async getManyAsV3(keys: v3.Coooooins[]): Promise<(bigint)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') != null
  }
}

export class TransactionPaymentNextFeeMultiplierStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'NextFeeMultiplier')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') != null
  }
}

export class TransactionPaymentStorageVersionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') === '7a0b9b43fb3e876cfa92bb4b00e569ef9a82972b0600c8a8570e064c7e3890fd'
  }

  async getAsV3(): Promise<v3.Type_266> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') != null
  }
}

export class TreasuryApprovalsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Proposal indices that have been approved but not yet awarded.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Treasury', 'Approvals') === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
  }

  /**
   *  Proposal indices that have been approved but not yet awarded.
   */
  async getAsV3(): Promise<number[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'Approvals')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'Approvals') != null
  }
}

export class TreasuryProposalCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Number of proposals that have been made.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Treasury', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of proposals that have been made.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'ProposalCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'ProposalCount') != null
  }
}

export class TreasuryProposalsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Proposals that have been made.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Treasury', 'Proposals') === '7641e66c93ee52b69acfed5b20da999d04ba6a21fac610732405be939e87d4b7'
  }

  /**
   *  Proposals that have been made.
   */
  async getAsV3(key: number): Promise<v3.Proposal | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'Proposals', key)
  }

  async getManyAsV3(keys: number[]): Promise<(v3.Proposal | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Treasury', 'Proposals', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'Proposals') != null
  }
}

export class XcmpQueueInboundXcmpMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Inbound aggregate XCMP messages. It can only be one per ParaId/block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'InboundXcmpMessages') === '7bf0d83d361216e18f7bca971cbf4fbd433158d3be6ac33fe278fb6d9bfb0469'
  }

  /**
   *  Inbound aggregate XCMP messages. It can only be one per ParaId/block.
   */
  async getAsV3(key1: number, key2: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'InboundXcmpMessages', key1, key2)
  }

  async getManyAsV3(keys: [number, number][]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'XcmpQueue', 'InboundXcmpMessages', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'InboundXcmpMessages') != null
  }
}

export class XcmpQueueInboundXcmpStatusStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Status of the inbound XCMP channels.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'InboundXcmpStatus') === '9463adeec55c62de9270b726721d07d1258e861fc23bcadc753e06286f1e9d94'
  }

  /**
   *  Status of the inbound XCMP channels.
   */
  async getAsV3(): Promise<v3.InboundChannelDetails[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'InboundXcmpStatus')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'InboundXcmpStatus') != null
  }
}

export class XcmpQueueOutboundXcmpMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The messages outbound in a given XCMP channel.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'OutboundXcmpMessages') === 'f8f791196403322746e9b911cdffc1dfb7880ff624b4765b5515d8264f7df7b2'
  }

  /**
   *  The messages outbound in a given XCMP channel.
   */
  async getAsV3(key1: number, key2: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'OutboundXcmpMessages', key1, key2)
  }

  async getManyAsV3(keys: [number, number][]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'XcmpQueue', 'OutboundXcmpMessages', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'OutboundXcmpMessages') != null
  }
}

export class XcmpQueueOutboundXcmpStatusStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The non-empty XCMP channels in order of becoming non-empty, and the index of the first
   *  and last outbound message. If the two indices are equal, then it indicates an empty
   *  queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
   *  than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
   *  case of the need to send a high-priority signal message this block.
   *  The bool is true if there is a signal message waiting to be sent.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'OutboundXcmpStatus') === '0803a0634571a8cfdaa8b16757a06e235664ceb84c144cf0d5953fd2dd0f7f3a'
  }

  /**
   *  The non-empty XCMP channels in order of becoming non-empty, and the index of the first
   *  and last outbound message. If the two indices are equal, then it indicates an empty
   *  queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
   *  than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
   *  case of the need to send a high-priority signal message this block.
   *  The bool is true if there is a signal message waiting to be sent.
   */
  async getAsV3(): Promise<v3.OutboundChannelDetails[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'OutboundXcmpStatus')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'OutboundXcmpStatus') != null
  }
}

export class XcmpQueueOverweightStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The messages that exceeded max individual message weight budget.
   * 
   *  These message stay in this storage map until they are manually dispatched via
   *  `service_overweight`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'Overweight') === '2eb096a3f66cc2d3a7f63f9f097c63bad7d960c4949a759a34865c7919f65122'
  }

  /**
   *  The messages that exceeded max individual message weight budget.
   * 
   *  These message stay in this storage map until they are manually dispatched via
   *  `service_overweight`.
   */
  async getAsV3(key: bigint): Promise<[number, number, Uint8Array] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'Overweight', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<([number, number, Uint8Array] | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'XcmpQueue', 'Overweight', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'Overweight') != null
  }
}

export class XcmpQueueOverweightCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The number of overweight messages ever recorded in `Overweight`. Also doubles as the next
   *  available free overweight index.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'OverweightCount') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The number of overweight messages ever recorded in `Overweight`. Also doubles as the next
   *  available free overweight index.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'OverweightCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'OverweightCount') != null
  }
}

export class XcmpQueueQueueConfigStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The configuration which controls the dynamics of the outbound queue.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'QueueConfig') === 'bc17b84c06c7e0df3f2684c76020e6d76ff231be948076edbe6751b00937b0b1'
  }

  /**
   *  The configuration which controls the dynamics of the outbound queue.
   */
  async getAsV3(): Promise<v3.QueueConfigData> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'QueueConfig')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'QueueConfig') != null
  }
}

export class XcmpQueueQueueSuspendedStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'QueueSuspended') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'QueueSuspended')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'QueueSuspended') != null
  }
}

export class XcmpQueueSignalMessagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Any signal messages waiting to be sent.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'SignalMessages') === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
  }

  /**
   *  Any signal messages waiting to be sent.
   */
  async getAsV3(key: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'XcmpQueue', 'SignalMessages', key)
  }

  async getManyAsV3(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'XcmpQueue', 'SignalMessages', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('XcmpQueue', 'SignalMessages') != null
  }
}
