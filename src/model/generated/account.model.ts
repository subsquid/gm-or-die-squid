import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Transfer} from "./transfer.model"
import {FrenBurned} from "./frenBurned.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  /**
   * Account address
   */
  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Transfer, e => e.to)
  transfersTo!: Transfer[]

  @OneToMany_(() => Transfer, e => e.from)
  transfersFrom!: Transfer[]

  @OneToMany_(() => FrenBurned, e => e.account)
  frenBurnedEvents!: FrenBurned[]
}
