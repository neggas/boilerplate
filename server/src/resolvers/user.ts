import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { LoginResponse, RegisterResponse, UserInput, UserLoginInput } from "../types";


@Resolver()
export class userResolver {
  @Mutation(() => RegisterResponse)
  async register(@Arg("input") input: UserInput): Promise<RegisterResponse | undefined> {
    const {username,email,password,firstname,lastname} = input;

    // Handle errors
    if(!username || username.length < 2 ) return { errors : [{ field:"username",message:"must contain at least 2 characters" }]};
    if(!password || password.length < 2)  return { errors : [{ field:"password",message:"must contain at least 2 characters" }]};
    if(!firstname || firstname.length < 2)  return { errors : [{ field:"firstname",message:"must contain at least 2 characters" }]};
    if(!lastname || lastname.length < 2)  return { errors : [{ field:"lastname",message:"must contain at least 2 characters" }]};
    if(!email || email.length < 2)  return { errors : [{ field:"email",message:"must contain at least 2 characters" }]};

    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) return { errors : [{ field:"email",message:"invalid email" }]};


    //Handle existance user
    const foundUsername = await User.findOne({ where: { username } });
    const foundEmail = await User.findOne({ where: { email } });
    
    if(foundUsername){
      return { errors : [{ field:"username",message:"username already taken" }]};
    }

    if(foundEmail){
      return { errors : [{ field:"email",message:"email already taken" }]};
    }

    const user = await User.create(input).save();
    return {user}
  }

  @Mutation(()=>LoginResponse)
  async login(@Arg("userLoginInput") userLoginInput : UserLoginInput) : Promise<LoginResponse | undefined>{

    const {username,password} = userLoginInput;
    const user = await User.findOne({ where: { username } });

    if(!user) return { errors:[{ field:"username",message:"Can not found this user !" }] }

    if(user.password !== password) return { errors:[{ field:"password",message:"Inccorect password !" }] }

    return {user};

  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }


}
