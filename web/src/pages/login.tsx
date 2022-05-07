import { Formik,Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import {toErrorMap} from "../utils/toArrayMap";

interface IRegisterProps {}

const Login: NextPage<IRegisterProps> = ()=>{
    const router = useRouter();
    const [,login] = useLoginMutation()
    return(
        <Wrapper variant="small">
            <Formik 
                initialValues={{username:"",password:""}}
                onSubmit={async (values,{setErrors})=>{
                    const loginMutationResponse = await login({userLoginInput:values});
                    const  response = loginMutationResponse?.data?.login;

                    if(response?.errors){
                        setErrors(toErrorMap(response?.errors))
                    }
                 
                    if(response?.user){
                        router.push(`user/${response.user.username}`)
                    }
                }}>

            
                {({isSubmitting})=>(
                    
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                          
                        />

                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                            />
                        </Box>

                        <Button
                            type="submit"
                            mt={4}
                            isLoading={isSubmitting}
                            colorScheme="blue"
                            >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient,{ssr:true})(Login);