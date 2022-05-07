import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toArrayMap";

interface IRegisterProps {}

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", email: "",password:"",firstname:"",lastname:"" }}
        onSubmit={async (values,{setErrors}) => {
          const registerMuteResponse = await register({ input: values });
          const response = registerMuteResponse.data?.register;

          if(response?.errors){
            setErrors(toErrorMap(response.errors))
          }

          if(response?.user){
            router.push(`login`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />

            <Box mt={4}>
              <InputField
                name="firstname"
                placeholder="firstname"
                label="Firstname"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="lastname"
                placeholder="lastname"
                label="Lastname"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>

            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </Box>
           
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
