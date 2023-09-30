/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type LollyInput = {
  id?: string | null,
  color1?: string | null,
  color2?: string | null,
  color3?: string | null,
  reciever?: string | null,
  sender?: string | null,
  message?: string | null,
  link?: string | null,
};

export type Event = {
  __typename: "Event",
  result?: string | null,
};

export type lolly = {
  __typename: "lolly",
  id?: string | null,
  color1?: string | null,
  color2?: string | null,
  color3?: string | null,
  reciever?: string | null,
  sender?: string | null,
  message?: string | null,
  link?: string | null,
};

export type AddLollyMutationVariables = {
  lolly?: LollyInput | null,
};

export type AddLollyMutation = {
  addLolly?:  {
    __typename: "Event",
    result?: string | null,
  } | null,
};

export type GetLolliesQuery = {
  getLollies?:  Array< {
    __typename: "lolly",
    id?: string | null,
    color1?: string | null,
    color2?: string | null,
    color3?: string | null,
    reciever?: string | null,
    sender?: string | null,
    message?: string | null,
    link?: string | null,
  } | null > | null,
};
