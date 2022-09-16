import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Currency} from "./_currency"
import {Account} from "./account.model"

@Entity_()
export class AccountBalance {
  constructor(props?: Partial<AccountBalance>) {
    Object.assign(this, props)
  }

  /**
   * < FREN|GM|GN >-< accountId >
   */
  @PrimaryColumn_()
  id!: string

  @Column_("varchar", {length: 4, nullable: false})
  currency!: Currency

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  account!: Account

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  free!: bigint

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  reserved!: bigint

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  frozen!: bigint | undefined | null

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  miscFrozen!: bigint | undefined | null

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  feeFrozen!: bigint | undefined | null

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  total!: bigint | undefined | null
}
