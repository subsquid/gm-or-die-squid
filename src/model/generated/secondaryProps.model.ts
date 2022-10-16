import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"

@Entity_()
export class SecondaryProps {
  constructor(props?: Partial<SecondaryProps>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  name!: string

  @Column_("text", {nullable: false})
  someProp!: string

  @Column_("int4", {nullable: true})
  number!: number | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  wrongRel!: Account
}
