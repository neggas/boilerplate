import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  username!: string;

  
  @Field(() => String,{nullable:true})
  @Column({nullable:true})
  firstname?: string;

  @Field(() => String,{nullable:true})
  @Column({nullable:true})
  lastname?: string;

  @Field(() => String)
  @Column()
  email!: string;

  @Field(() => String,{nullable:true})
  @Column({nullable:true})
  password?:string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
