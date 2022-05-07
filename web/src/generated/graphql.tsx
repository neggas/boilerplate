import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  register: RegisterResponse;
};


export type MutationLoginArgs = {
  userLoginInput: UserLoginInput;
};


export type MutationRegisterArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getByUsername?: Maybe<User>;
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  userLoginInput: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', email: string, id: number, password?: string | null, username: string, firstname?: string | null, lastname?: string | null } | null } };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', email: string, id: number, password?: string | null, username: string } | null } };

export type GetByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetByUsernameQuery = { __typename?: 'Query', getByUsername?: { __typename?: 'User', id: number, username: string, email: string, firstname?: string | null, lastname?: string | null, createdAt: string, updatedAt: string } | null };


export const LoginDocument = gql`
    mutation Login($userLoginInput: UserLoginInput!) {
  login(userLoginInput: $userLoginInput) {
    errors {
      field
      message
    }
    user {
      email
      id
      password
      username
      firstname
      lastname
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    errors {
      field
      message
    }
    user {
      email
      id
      password
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetByUsernameDocument = gql`
    query GetByUsername($username: String!) {
  getByUsername(username: $username) {
    id
    username
    email
    firstname
    lastname
    createdAt
    updatedAt
  }
}
    `;

export function useGetByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetByUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetByUsernameQuery>({ query: GetByUsernameDocument, ...options });
};