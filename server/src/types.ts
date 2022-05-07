import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "./entities/User";

@InputType()
export class UserInput {

  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  firstname!:string;

  @Field(() => String)
  lastname!:string;
}

// Login Object type
@InputType()
export class UserLoginInput{
  @Field((() => String))
  username! : string;

  @Field((() => String))
  password! : string;
}


// Error Object type
@ObjectType()
export class FieldError{
  @Field(()=>String)
  field:string;

  @Field(()=>String)
  message:string
}


// Login Response Object type
@ObjectType()
export class LoginResponse{
  @Field(() => [FieldError],{ nullable:true })
  errors?:FieldError[]

  @Field(() => User,{ nullable:true })
  user?:User
}

@ObjectType()
export class RegisterResponse{
  @Field(() => [FieldError],{nullable:true})
  errors?:FieldError[]

  @Field(() => User,{nullable:true})
  user?:User
}