/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type createCompanyInput = {
  name: string,
  companyId: string,
  email: string,
  city: string,
  country: string,
  phone_number: string,
  owner: string,
};

export type companyBasicProfileInfo = {
  __typename: "companyBasicProfileInfo",
  id?: string,
  name?: string,
  city?: string,
  country?: string,
  email?: string,
  phone_number?: string,
  headline?: string,
};

export type entityBasicProfileInfo = {
  __typename: "entityBasicProfileInfo",
  id?: string,
  city?: string,
  country?: string,
  email?: string,
  phone_number?: string,
  headline?: string,
};

export type userBasicProfileInfo = {
  __typename: "userBasicProfileInfo",
  id?: string,
  firstName?: string,
  lastName?: string,
  city?: string,
  country?: string,
  email?: string,
  phone_number?: string,
  education?:  Array<education | null >,
  workExperience?:  Array<workExperience | null >,
  headline?: string,
};

export type education = {
  __typename: "education",
  institute?: string,
  city?: string,
  country?: string,
  education_level?: education_level,
  field_of_study?: field_of_study,
  degree_name?: string,
  grade?: string | null,
  startDate?: string,
  completed?: boolean,
  endDate?: string,
};

export enum education_level {
  MASTERS = "MASTERS",
  BACHELORS = "BACHELORS",
  PHD = "PHD",
  DIPLOMA = "DIPLOMA",
}


export enum field_of_study {
  ENGINEERING = "ENGINEERING",
  MEDICAL = "MEDICAL",
  BUSINESS = "BUSINESS",
}


export type workExperience = {
  __typename: "workExperience",
  jobTitle?: string,
  employmentType?: employmentType,
  company?: string,
  city?: string,
  country?: string,
  startDate?: string,
  currentlyWorking?: boolean,
  endDate?: string,
};

export enum employmentType {
  FULLTIME = "FULLTIME",
  PARTTIME = "PARTTIME",
  SELFEMPLOYED = "SELFEMPLOYED",
  FREELANCE = "FREELANCE",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  SEASONAL = "SEASONAL",
}


export type updateCompanyInfoInput = {
  companyId: string,
  // owner:String!
  name?: string | null,
  email?: string | null,
  city?: string | null,
  country?: string | null,
  phone_number?: string | null,
  headline?: string | null,
};

export type updateProfilePictureInput = {
  entityId: string,
  picture_url: string,
};

export type updateDisplayPicture = {
  __typename: "updateDisplayPicture",
  id?: string,
  picture_url?: string,
};

export type addUserToCompanyInput = {
  userId: string,
  companyId: string,
  role: mutableUserRolesInCompany,
};

// union UserResult = UserInfo | Error
// type userProfileInfo implements entityProfileInfo{
// id:String!
// name:String!
// city:String!
// country:String!
// email:String!
// phone_number:String!
// picture_url:String
// headline:String
// }
export enum mutableUserRolesInCompany {
  OTHER_EMPLOYEE = "OTHER_EMPLOYEE",
  DEVELOPER = "DEVELOPER",
}


export type userShowcaseProfileInCompany = {
  __typename: "userShowcaseProfileInCompany",
  id?: string,
  firstName?: string,
  lastName?: string,
  city?: string,
  country?: string,
  picture_url?: string,
  total_followers?: number,
  profileStatus?: ProfileStatus,
  role?: allUserRolesInCompany,
  date_added?: string,
  following?: boolean | null,
};

export type entityShowcaseProfileInfo = {
  __typename: "entityShowcaseProfileInfo",
  id?: string,
  city?: string,
  country?: string,
  picture_url?: string,
  total_followers?: number,
  profileStatus?: ProfileStatus,
  following?: boolean | null,
};

export type companyShowcaseProfileInfo = {
  __typename: "companyShowcaseProfileInfo",
  id?: string,
  name?: string,
  city?: string,
  country?: string,
  picture_url?: string,
  owner?: userIdentifier,
  total_followers?: number,
  profileStatus?: ProfileStatus,
  following?: boolean | null,
};

export type userIdentifier = {
  __typename: "userIdentifier",
  id?: string,
  firstName?: string,
  lastName?: string,
  picture_url?: string,
};

export type entityIdentifier = {
  __typename: "entityIdentifier",
  id?: string,
  picture_url?: string,
};

export type companyIdentifier = {
  __typename: "companyIdentifier",
  id?: string,
  name?: string,
  picture_url?: string,
};

export enum ProfileStatus {
  PUBLISHED = "PUBLISHED",
  UNPUBLISHED = "UNPUBLISHED",
}


export type userShowcaseProfileInfo = {
  __typename: "userShowcaseProfileInfo",
  id?: string,
  firstName?: string,
  lastName?: string,
  city?: string,
  country?: string,
  picture_url?: string,
  total_followers?: number,
  profileStatus?: ProfileStatus,
  following?: boolean | null,
};

export enum allUserRolesInCompany {
  OTHER_EMPLOYEE = "OTHER_EMPLOYEE",
  DEVELOPER = "DEVELOPER",
  OWNER = "OWNER",
}


export type updateUserInput = {
  userId: string,
  firstName?: string | null,
  lastName?: string | null,
  city?: string | null,
  country?: string | null,
  phone_number?: string | null,
  headline?: string | null,
  education?: Array< updateEducation | null > | null,
  workExperience?: Array< updateWorkExperience | null > | null,
};

export type updateEducation = {
  institute: string,
  city: string,
  country: string,
  education_level: education_level,
  field_of_study: field_of_study,
  degree_name: string,
  grade?: string | null,
  startDate: string,
  completed: boolean,
  endDate?: string | null,
};

export type updateWorkExperience = {
  jobTitle: string,
  employmentType: employmentType,
  company: string,
  city: string,
  country: string,
  startDate: string,
  currentlyWorking: boolean,
  endDate?: string | null,
};

export type createOpenApiInput = {
  entityId: string,
  apiId: string,
  title: string,
  apiType: Array< apiType >,
  // max 3
  apiRootUrl: string,
  openApiDef: string,
};

export enum apiType {
  CRM = "CRM",
  ERP = "ERP",
  ACCOUNTING = "ACCOUNTING",
  PM = "PM",
  CMS = "CMS",
  COMMUNICATION = "COMMUNICATION",
  ECOMMERCE = "ECOMMERCE",
  HRM = "HRM",
  PAYMENT_GATEWAY = "PAYMENT_GATEWAY",
  BILLING = "BILLING",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MEDICAL = "MEDICAL",
  MUSIC = "MUSIC",
  NEWS = "NEWS",
  SOCIAL_NETWORKING = "SOCIAL_NETWORKING",
  WEATHER = "WEATHER",
  LIFESTYLE = "LIFESTYLE",
  PRODUCTIVITY = "PRODUCTIVITY",
  SPORTS = "SPORTS",
  TRAVEL = "TRAVEL",
  FOOD = "FOOD",
  PHOTO_VIDEO = "PHOTO_VIDEO",
  UTILITIES = "UTILITIES",
  DATA = "DATA",
  AI = "AI",
  IOT = "IOT",
  BLOCKCHAIN_CRYPTO = "BLOCKCHAIN_CRYPTO",
  BUSINESS = "BUSINESS",
  REFERENCE = "REFERENCE",
  HEALTH_FITNESS = "HEALTH_FITNESS",
}


export type openAPiBasicInfo = {
  __typename: "openAPiBasicInfo",
  apiId?: string,
  title?: string,
  shortDescription?: string,
  longDescription?: string,
  apiType?: Array< apiType | null >,
  apiRootUrl?: string,
  openApiDef?: string,
};

export type apiBasicInfo = {
  __typename: "apiBasicInfo",
  apiId?: string,
  title?: string,
  shortDescription?: string,
  longDescription?: string,
  apiType?: Array< apiType | null >,
};

export type graphQlBasicInfo = {
  __typename: "graphQlBasicInfo",
  apiId?: string,
  title?: string,
  shortDescription?: string,
  longDescription?: string,
  apiType?: Array< apiType | null >,
  apiUrl?: string,
  graphQlSchema?: string,
};

export type createGraphQLApiInput = {
  entityId: string,
  apiId: string,
  title: string,
  apiType: Array< apiType >,
  // max 3
  apiUrl: string,
  graphQlSchema: string,
};

export type changeApiStatusInput = {
  apiId: string,
  status: apiStatus,
  entityId: string,
};

export enum apiStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  UNDERDEVELOPMENT = "UNDERDEVELOPMENT",
}


export type apiShowcaseInfo = {
  __typename: "apiShowcaseInfo",
  apiId?: string,
  owner?: entityIdentifier,
  title?: string,
  shortDescription?: string,
  apiType?: Array< apiType | null >,
  imageUrl?: string,
  status?: apiStatus,
  numOfSubscribers?: number,
  apiKind?: apiKind,
  subscribed?: boolean | null,
};

export enum apiKind {
  GRAPHQL = "GRAPHQL",
  OPENAPI = "OPENAPI",
}


export type subscribeToApiInput = {
  apiId: string,
  entityId: string,
};

export type apiSubscription = {
  __typename: "apiSubscription",
  subscriptionId?: string,
  subscriptionCreationDate?: string,
  paymentDayEveryMonth?: string,
  api?: apiIdentifier,
  subscription_token?: string,
  status?: subscriptionStatus,
  type?: subscriptionType,
};

export type apiIdentifier = {
  __typename: "apiIdentifier",
  id?: string,
  title?: string,
  imageUrl?: string,
};

export enum subscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export enum subscriptionType {
  NORMAL = "NORMAL",
  TESTING = "TESTING",
}


export type changeSubscriptionStatusInput = {
  subscriptionId: string,
  status: subscriptionStatus,
  entityId: string,
};

export type changeEntityProfileStatusInput = {
  entityId: string,
  status: ProfileStatus,
};

export type updateOpenApiInput = {
  entityId: string,
  apiId: string,
  title?: string | null,
  shortDescription?: string | null,
  longDescription?: string | null,
  apiType?: Array< apiType > | null,
  // max 3
  apiRootUrl?: string | null,
  openApiDef?: string | null,
};

export type updateGraphQlInput = {
  entityId: string,
  apiId: string,
  title?: string | null,
  shortDescription?: string | null,
  longDescription?: string | null,
  apiType?: Array< apiType > | null,
  // max 3
  apiUrl?: string | null,
  graphQlSchema?: string | null,
};

export type updateApiImageInput = {
  entityId: string,
  apiId: string,
  picture_url: string,
};

export type createNewTestingSubscriptionInput = {
  entityId: string,
  apiId: string,
};

export type createApiReviewInput = {
  by: string,
  apiId: string,
  title: string,
  text: string,
  stars: number,
};

export type apiReview = {
  __typename: "apiReview",
  reviewId?: string,
  by?: entityIdentifier,
  apiId?: string,
  title?: string,
  text?: string,
  stars?: number,
  dateCreated?: string,
};

export type followEntityInput = {
  entityId: string,
  followEntityId: string,
};

export type followEntityOutput = {
  __typename: "followEntityOutput",
  entity?: entityShowcaseProfileInfo,
  followEntity?: entityShowcaseProfileInfo,
};

export type unFollowEntityInput = {
  entityId: string,
  unFollowEntityId: string,
};

export type unFollowEntityOutput = {
  __typename: "unFollowEntityOutput",
  entity?: entityShowcaseProfileInfo,
  unFollowEntity?: entityShowcaseProfileInfo,
};

export type SocialMediaPostInput = {
  text?: string | null,
  by: string,
  imageUrl?: string | null,
};

export type SocialMediaPost = {
  __typename: "SocialMediaPost",
  id?: string,
  createdAt?: string,
  by?: entityIdentifier,
  imageUrl?: string,
  text?: string,
  numOfLikes?: number,
  latestComments?:  Array<comment | null >,
  totalComments?: number,
  liked?: boolean | null,
};

export type comment = {
  __typename: "comment",
  id?: string,
  text?: string,
  createdAt?: string,
  postId?: string,
  by?: entityIdentifier,
};

export type commentOnSocialMediaPostInput = {
  postId: string,
  text: string,
  by: string,
};

export type likeOnSocialMediaPostInput = {
  postId: string,
  by: string,
};

export type socialMediaPostLike = {
  __typename: "socialMediaPostLike",
  postId?: string,
  by?: entityIdentifier,
  reaction?: reactionType,
};

export enum reactionType {
  LIKED = "LIKED",
  NONE = "NONE",
}


export type requestRecommendationInput = {
  requesterUserId: string,
  requestedUserId: string,
  message?: string | null,
};

export type recommendationRequest = {
  __typename: "recommendationRequest",
  id?: string,
  timeStamp?: string,
  requesterUserId?: string,
  requestedUserId?: string,
  message?: string,
};

export type writeRecommendationInput = {
  recommendedBy: string,
  recommendationFor: string,
  text: string,
};

export type recommendation = {
  __typename: "recommendation",
  id?: string,
  timeStamp?: string,
  recommendedBy?: string,
  recommendationFor?: string,
  text?: string,
};

export type cancelRecommendationRequestInput = {
  recommendationRequestId: string,
  userId: string,
};

export type deleteRecommendationInput = {
  recommendationId: string,
  userId: string,
};

export type fetchMyApiTestingSubscriptionInput = {
  entityId: string,
  apiId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchMyUnderDevelopmentApisInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchMyUnderdevelopmentApisOutput = {
  __typename: "fetchMyUnderdevelopmentApisOutput",
  apis?:  Array<apiShowcaseInfo | null >,
  count?: number,
};

export type fetchMyPublicApisInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchMyPublicApisOutput = {
  __typename: "fetchMyPublicApisOutput",
  apis?:  Array<apiShowcaseInfo | null >,
  count?: number,
};

export type fetchMyPrivateApisInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchMyPrivateApisOutput = {
  __typename: "fetchMyPrivateApisOutput",
  apis?:  Array<apiShowcaseInfo | null >,
  count?: number,
};

export type fetchMySubscribedApisInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchMySubscribedApisOutput = {
  __typename: "fetchMySubscribedApisOutput",
  apis?:  Array<apiShowcaseInfo | null >,
  count?: number,
};

export type fetchMyApiSubscriptionInput = {
  apiId: string,
  entityId: string,
};

export type fetchMyApiTokenInput = {
  entityId: string,
  apiId: string,
};

export type apiTokenInfo = {
  __typename: "apiTokenInfo",
  api_token?: string,
  apiId?: string,
  entityId?: string,
};

export type fetchAllPublicApisInput = {
  entityId?: string | null,
  pageSize: number,
  pageNumber: number,
  apiType?: Array< apiType | null > | null,
};

export type fetchallPublicApisOutput = {
  __typename: "fetchallPublicApisOutput",
  apis?:  Array<apiShowcaseInfo | null >,
  count?: number,
};

export type fetchMyCompaniesInput = {
  userId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchMyCompaniesOutput = {
  __typename: "fetchMyCompaniesOutput",
  companies?:  Array<companyShowcaseProfileInfo | null >,
  count?: number,
};

export type fetchApiInfoInput = {
  apiId: string,
  entityId?: string | null,
};

export type apiFullInfo = {
  __typename: "apiFullInfo",
  apiId?: string,
  owner?: entityIdentifier,
  title?: string,
  shortDescription?: string,
  longDescription?: string,
  apiType?: Array< apiType | null >,
  imageUrl?: string,
  status?: apiStatus,
  numOfSubscribers?: number,
  creationDate?: string,
  apiKind?: apiKind,
  subscribed?: boolean | null,
};

export type graphQlApiFullInfo = {
  __typename: "graphQlApiFullInfo",
  apiId?: string,
  title?: string,
  shortDescription?: string,
  longDescription?: string,
  apiType?: Array< apiType | null >,
  imageUrl?: string,
  apiUrl?: string,
  graphQlSchema?: string,
  owner?: entityIdentifier,
  status?: apiStatus,
  numOfSubscribers?: number,
  creationDate?: string,
  apiKind?: apiKind,
  subscribed?: boolean | null,
};

export type openApiFullInfo = {
  __typename: "openApiFullInfo",
  apiId?: string,
  title?: string,
  shortDescription?: string,
  longDescription?: string,
  apiType?: Array< apiType | null >,
  imageUrl?: string,
  apiRootUrl?: string,
  openApiDef?: string,
  owner?: entityIdentifier,
  status?: apiStatus,
  numOfSubscribers?: number,
  creationDate?: string,
  apiKind?: apiKind,
  subscribed?: boolean | null,
};

export type fetchApiReviewsInput = {
  entityId: string,
  apiId: string,
  pageSize: number,
  pageNumber: number,
};

export type fetchApiReviewsOutput = {
  __typename: "fetchApiReviewsOutput",
  count?: number,
  reviews?:  Array<apiReview | null >,
};

export type getEntityFollowersInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type getEntityFollowersOutput = {
  __typename: "getEntityFollowersOutput",
  entities?:  Array<entityShowcaseProfileInfo | null >,
  count?: number,
};

export type getEntityFollowingsInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type getEntityFollowingsOutput = {
  __typename: "getEntityFollowingsOutput",
  entities?:  Array<entityShowcaseProfileInfo | null >,
  count?: number,
};

export type getEntityPostsInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type getEntityPostsOutput = {
  __typename: "getEntityPostsOutput",
  posts?:  Array<SocialMediaPost | null >,
  count?: number,
};

export type getEntityProfileInput = {
  requesterEntityId?: string | null,
  requestedEntityId: string,
};

export type entityFullProfileInfo = {
  __typename: "entityFullProfileInfo",
  id?: string,
  city?: string,
  country?: string,
  email?: string,
  phone_number?: string,
  picture_url?: string,
  headline?: string,
  total_followers?: number,
  total_following?: number,
  profileStatus?: ProfileStatus,
  following?: boolean | null,
};

export type companyFullProfileInfo = {
  __typename: "companyFullProfileInfo",
  id?: string,
  name?: string,
  city?: string,
  country?: string,
  email?: string,
  phone_number?: string,
  picture_url?: string,
  headline?: string,
  total_followers?: number,
  total_following?: number,
  owner?: userIdentifier,
  profileStatus?: ProfileStatus,
  following?: boolean | null,
};

export type userFullProfileInfo = {
  __typename: "userFullProfileInfo",
  id?: string,
  firstName?: string,
  lastName?: string,
  city?: string,
  country?: string,
  email?: string,
  phone_number?: string,
  picture_url?: string,
  headline?: string,
  total_followers?: number,
  total_following?: number,
  profileStatus?: ProfileStatus,
  education?:  Array<education | null >,
  workExperience?:  Array<workExperience | null >,
  following?: boolean | null,
  recommendationRequestedFromUser?: boolean | null,
  recommendationRequestedByUser?: boolean | null,
  recommendedUser?: boolean | null,
  recommendedByUser?: boolean | null,
};

export type getPostCommentsInput = {
  postId: string,
  pageSize: number,
  pageNumber: number,
};

export type getPostCommentsOutput = {
  __typename: "getPostCommentsOutput",
  count?: number,
  comments?:  Array<comment | null >,
};

export type getEntityNewsFeedInput = {
  entityId: string,
  pageSize: number,
  pageNumber: number,
};

export type getEntityNewsFeedOutput = {
  __typename: "getEntityNewsFeedOutput",
  count?: number,
  posts?:  Array<SocialMediaPost | null >,
};

export type getUsersListInput = {
  pageSize: number,
  pageNumber: number,
  userId?: string | null,
};

export type getUsersListOutput = {
  __typename: "getUsersListOutput",
  count?: number,
  users?:  Array<userShowcaseProfileInfo | null >,
};

export type getPublicApisCountByTypeOutput = {
  __typename: "getPublicApisCountByTypeOutput",
  type?: apiType,
  count?: number,
};

export type fetchNewsFeedSideMenuInput = {
  entityId: string,
};

export type fetchNewsFeedSideMenuOutput = {
  __typename: "fetchNewsFeedSideMenuOutput",
  followers?: number,
  following?: number,
  companies?: number,
  my_apis?: number,
  subscribed_apis?: number,
};

export type getUsersListInCompanyInput = {
  pageSize: number,
  pageNumber: number,
  requesterEntityId: string,
  requestedCompanyId: string,
};

export type getUsersListInCompanyOutput = {
  __typename: "getUsersListInCompanyOutput",
  count?: number,
  users?:  Array<userShowcaseProfileInCompany | null >,
};

export type getRecommendationRequestsByMeInput = {
  userId: string,
  pageSize: number,
  pageNumber: number,
};

export type getRecommendationRequestsByMeOutput = {
  __typename: "getRecommendationRequestsByMeOutput",
  count?: number,
  requests?:  Array<recommendationRequest | null >,
};

export type getRecommendationRequestsForMeInput = {
  userId: string,
  pageSize: number,
  pageNumber: number,
};

export type getRecommendationRequestsForMeOutput = {
  __typename: "getRecommendationRequestsForMeOutput",
  count?: number,
  requests?:  Array<recommendationRequest | null >,
};

export type getRecommendationsForMeInput = {
  userId: string,
  pageSize: number,
  pageNumber: number,
};

export type getRecommendationsForMeOutput = {
  __typename: "getRecommendationsForMeOutput",
  count?: number,
  recommendations?:  Array<recommendation | null >,
};

export type getRecommendationsByMeInput = {
  userId: string,
  pageSize: number,
  pageNumber: number,
};

export type getRecommendationsByMeOutput = {
  __typename: "getRecommendationsByMeOutput",
  count?: number,
  recommendations?:  Array<recommendation | null >,
};

export type CreateCompanyMutationVariables = {
  input?: createCompanyInput,
};

export type CreateCompanyMutation = {
  createCompany:  {
    __typename: "companyBasicProfileInfo",
    id: string,
    name: string,
    city: string,
    country: string,
    email: string,
    phone_number: string,
    headline: string,
  },
};

export type UpdateCompanyInfoMutationVariables = {
  input?: updateCompanyInfoInput,
};

export type UpdateCompanyInfoMutation = {
  // Waris
  updateCompanyInfo:  {
    __typename: "companyBasicProfileInfo",
    id: string,
    name: string,
    city: string,
    country: string,
    email: string,
    phone_number: string,
    headline: string,
  },
};

export type UpdateProfilePictureMutationVariables = {
  input?: updateProfilePictureInput,
};

export type UpdateProfilePictureMutation = {
  // Waris
  updateProfilePicture:  {
    __typename: "updateDisplayPicture",
    id: string,
    picture_url: string,
  },
};

export type AddUserToCompanyMutationVariables = {
  input?: addUserToCompanyInput,
};

export type AddUserToCompanyMutation = {
  // Waris
  addUserToCompany:  {
    __typename: "userShowcaseProfileInCompany",
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    picture_url: string,
    total_followers: number,
    profileStatus: ProfileStatus,
    role: allUserRolesInCompany,
    date_added: string,
    following?: boolean | null,
  },
};

export type UpdateUserInfoMutationVariables = {
  input?: updateUserInput,
};

export type UpdateUserInfoMutation = {
  // Waris
  updateUserInfo:  {
    __typename: "userBasicProfileInfo",
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    email: string,
    phone_number: string,
    education:  Array< {
      __typename: "education",
      institute: string,
      city: string,
      country: string,
      education_level: education_level,
      field_of_study: field_of_study,
      degree_name: string,
      grade?: string | null,
      startDate: string,
      completed: boolean,
      endDate: string,
    } | null >,
    workExperience:  Array< {
      __typename: "workExperience",
      jobTitle: string,
      employmentType: employmentType,
      company: string,
      city: string,
      country: string,
      startDate: string,
      currentlyWorking: boolean,
      endDate: string,
    } | null >,
    headline: string,
  },
};

export type CreateOpenApiMutationVariables = {
  input?: createOpenApiInput,
};

export type CreateOpenApiMutation = {
  // Uzair
  createOpenApi:  {
    __typename: "openAPiBasicInfo",
    apiId: string,
    title: string,
    shortDescription: string,
    longDescription: string,
    apiType: Array< apiType | null >,
    apiRootUrl: string,
    openApiDef: string,
  },
};

export type CreateGraphQlApiMutationVariables = {
  input?: createGraphQLApiInput,
};

export type CreateGraphQlApiMutation = {
  // Uzair
  createGraphQlApi:  {
    __typename: "graphQlBasicInfo",
    apiId: string,
    title: string,
    shortDescription: string,
    longDescription: string,
    apiType: Array< apiType | null >,
    apiUrl: string,
    graphQlSchema: string,
  },
};

export type ChangeApiStatusMutationVariables = {
  input?: changeApiStatusInput,
};

export type ChangeApiStatusMutation = {
  // Uzair
  changeApiStatus:  {
    __typename: "apiShowcaseInfo",
    apiId: string,
    owner: ( {
        __typename: "userIdentifier",
        id: string,
        picture_url: string,
        firstName: string,
        lastName: string,
      } | {
        __typename: "companyIdentifier",
        id: string,
        picture_url: string,
        name: string,
      }
    ),
    title: string,
    shortDescription: string,
    apiType: Array< apiType | null >,
    imageUrl: string,
    status: apiStatus,
    numOfSubscribers: number,
    apiKind: apiKind,
    subscribed?: boolean | null,
  },
};

export type SubscribeToApiMutationVariables = {
  input?: subscribeToApiInput,
};

export type SubscribeToApiMutation = {
  // Murtuza
  subscribeToApi:  {
    __typename: "apiSubscription",
    subscriptionId: string,
    subscriptionCreationDate: string,
    paymentDayEveryMonth: string,
    api:  {
      __typename: "apiIdentifier",
      id: string,
      title: string,
      imageUrl: string,
    },
    subscription_token: string,
    status: subscriptionStatus,
    type: subscriptionType,
  },
};

export type ChangeSubscriptionStatusMutationVariables = {
  input?: changeSubscriptionStatusInput,
};

export type ChangeSubscriptionStatusMutation = {
  // Shaheryar
  changeSubscriptionStatus:  {
    __typename: "apiSubscription",
    subscriptionId: string,
    subscriptionCreationDate: string,
    paymentDayEveryMonth: string,
    api:  {
      __typename: "apiIdentifier",
      id: string,
      title: string,
      imageUrl: string,
    },
    subscription_token: string,
    status: subscriptionStatus,
    type: subscriptionType,
  },
};

export type ChangeEntityProfileStatusMutationVariables = {
  input?: changeEntityProfileStatusInput,
};

export type ChangeEntityProfileStatusMutation = {
  // Shaheryar
  changeEntityProfileStatus: ( {
      __typename: "companyShowcaseProfileInfo",
      id: string,
      city: string,
      country: string,
      picture_url: string,
      total_followers: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
      name: string,
      owner:  {
        __typename: string,
        id: string,
        firstName: string,
        lastName: string,
        picture_url: string,
      },
    } | {
      __typename: "userShowcaseProfileInfo",
      id: string,
      city: string,
      country: string,
      picture_url: string,
      total_followers: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
      firstName: string,
      lastName: string,
    } | {
      __typename: "userShowcaseProfileInCompany",
      id: string,
      city: string,
      country: string,
      picture_url: string,
      total_followers: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
      firstName: string,
      lastName: string,
      role: allUserRolesInCompany,
      date_added: string,
    }
  ),
};

export type UpdateOpenApiMutationVariables = {
  input?: updateOpenApiInput,
};

export type UpdateOpenApiMutation = {
  updateOpenApi:  {
    __typename: "openAPiBasicInfo",
    apiId: string,
    title: string,
    shortDescription: string,
    longDescription: string,
    apiType: Array< apiType | null >,
    apiRootUrl: string,
    openApiDef: string,
  },
};

export type UpdateGraphQlApiMutationVariables = {
  input?: updateGraphQlInput,
};

export type UpdateGraphQlApiMutation = {
  updateGraphQlApi:  {
    __typename: "graphQlBasicInfo",
    apiId: string,
    title: string,
    shortDescription: string,
    longDescription: string,
    apiType: Array< apiType | null >,
    apiUrl: string,
    graphQlSchema: string,
  },
};

export type UpdateApiImageMutationVariables = {
  input?: updateApiImageInput,
};

export type UpdateApiImageMutation = {
  updateApiImage:  {
    __typename: "updateDisplayPicture",
    id: string,
    picture_url: string,
  },
};

export type CreateNewTestingSubscriptionMutationVariables = {
  input?: createNewTestingSubscriptionInput,
};

export type CreateNewTestingSubscriptionMutation = {
  createNewTestingSubscription:  {
    __typename: "apiSubscription",
    subscriptionId: string,
    subscriptionCreationDate: string,
    paymentDayEveryMonth: string,
    api:  {
      __typename: "apiIdentifier",
      id: string,
      title: string,
      imageUrl: string,
    },
    subscription_token: string,
    status: subscriptionStatus,
    type: subscriptionType,
  },
};

export type CreateApiReviewMutationVariables = {
  input?: createApiReviewInput,
};

export type CreateApiReviewMutation = {
  createApiReview:  {
    __typename: "apiReview",
    reviewId: string,
    by: ( {
        __typename: "userIdentifier",
        id: string,
        picture_url: string,
        firstName: string,
        lastName: string,
      } | {
        __typename: "companyIdentifier",
        id: string,
        picture_url: string,
        name: string,
      }
    ),
    apiId: string,
    title: string,
    text: string,
    stars: number,
    dateCreated: string,
  },
};

export type FollowEntityMutationVariables = {
  input?: followEntityInput,
};

export type FollowEntityMutation = {
  followEntity:  {
    __typename: "followEntityOutput",
    entity: ( {
        __typename: "companyShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        name: string,
      } | {
        __typename: "userShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
      } | {
        __typename: "userShowcaseProfileInCompany",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
        role: allUserRolesInCompany,
        date_added: string,
      }
    ),
    followEntity: ( {
        __typename: "companyShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        name: string,
      } | {
        __typename: "userShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
      } | {
        __typename: "userShowcaseProfileInCompany",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
        role: allUserRolesInCompany,
        date_added: string,
      }
    ),
  },
};

export type UnFollowEntityMutationVariables = {
  input?: unFollowEntityInput,
};

export type UnFollowEntityMutation = {
  unFollowEntity:  {
    __typename: "unFollowEntityOutput",
    entity: ( {
        __typename: "companyShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        name: string,
      } | {
        __typename: "userShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
      } | {
        __typename: "userShowcaseProfileInCompany",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
        role: allUserRolesInCompany,
        date_added: string,
      }
    ),
    unFollowEntity: ( {
        __typename: "companyShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        name: string,
      } | {
        __typename: "userShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
      } | {
        __typename: "userShowcaseProfileInCompany",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
        role: allUserRolesInCompany,
        date_added: string,
      }
    ),
  },
};

export type PublishSocialMediaPostMutationVariables = {
  input?: SocialMediaPostInput,
};

export type PublishSocialMediaPostMutation = {
  publishSocialMediaPost:  {
    __typename: "SocialMediaPost",
    id: string,
    createdAt: string,
    by: ( {
        __typename: "userIdentifier",
        id: string,
        picture_url: string,
        firstName: string,
        lastName: string,
      } | {
        __typename: "companyIdentifier",
        id: string,
        picture_url: string,
        name: string,
      }
    ),
    imageUrl: string,
    text: string,
    numOfLikes: number,
    latestComments:  Array< {
      __typename: "comment",
      id: string,
      text: string,
      createdAt: string,
      postId: string,
    } | null >,
    totalComments: number,
    liked?: boolean | null,
  },
};

export type CommentOnSocialMediaPostMutationVariables = {
  input?: commentOnSocialMediaPostInput,
};

export type CommentOnSocialMediaPostMutation = {
  commentOnSocialMediaPost:  {
    __typename: "comment",
    id: string,
    text: string,
    createdAt: string,
    postId: string,
    by: ( {
        __typename: "userIdentifier",
        id: string,
        picture_url: string,
        firstName: string,
        lastName: string,
      } | {
        __typename: "companyIdentifier",
        id: string,
        picture_url: string,
        name: string,
      }
    ),
  },
};

export type LikeOnSocialMediaPostMutationVariables = {
  input?: likeOnSocialMediaPostInput,
};

export type LikeOnSocialMediaPostMutation = {
  likeOnSocialMediaPost:  {
    __typename: "socialMediaPostLike",
    postId: string,
    by: ( {
        __typename: "userIdentifier",
        id: string,
        picture_url: string,
        firstName: string,
        lastName: string,
      } | {
        __typename: "companyIdentifier",
        id: string,
        picture_url: string,
        name: string,
      }
    ),
    reaction: reactionType,
  },
};

export type RequestRecommendationMutationVariables = {
  input?: requestRecommendationInput,
};

export type RequestRecommendationMutation = {
  requestRecommendation:  {
    __typename: "recommendationRequest",
    id: string,
    timeStamp: string,
    requesterUserId: string,
    requestedUserId: string,
    message: string,
  },
};

export type WriteRecommendationMutationVariables = {
  input?: writeRecommendationInput,
};

export type WriteRecommendationMutation = {
  writeRecommendation:  {
    __typename: "recommendation",
    id: string,
    timeStamp: string,
    recommendedBy: string,
    recommendationFor: string,
    text: string,
  },
};

export type CancelRecommendationRequestMutationVariables = {
  input?: cancelRecommendationRequestInput,
};

export type CancelRecommendationRequestMutation = {
  cancelRecommendationRequest:  {
    __typename: "recommendationRequest",
    id: string,
    timeStamp: string,
    requesterUserId: string,
    requestedUserId: string,
    message: string,
  },
};

export type DeleteRecommendationMutationVariables = {
  input?: deleteRecommendationInput,
};

export type DeleteRecommendationMutation = {
  deleteRecommendation:  {
    __typename: "recommendation",
    id: string,
    timeStamp: string,
    recommendedBy: string,
    recommendationFor: string,
    text: string,
  },
};

export type FetchMyApiTestingSubscriptionsQueryVariables = {
  input?: fetchMyApiTestingSubscriptionInput,
};

export type FetchMyApiTestingSubscriptionsQuery = {
  fetchMyApiTestingSubscriptions:  Array< {
    __typename: "apiSubscription",
    subscriptionId: string,
    subscriptionCreationDate: string,
    paymentDayEveryMonth: string,
    api:  {
      __typename: "apiIdentifier",
      id: string,
      title: string,
      imageUrl: string,
    },
    subscription_token: string,
    status: subscriptionStatus,
    type: subscriptionType,
  } | null >,
};

export type FetchMyUnderDevelopmentApisQueryVariables = {
  input?: fetchMyUnderDevelopmentApisInput,
};

export type FetchMyUnderDevelopmentApisQuery = {
  // uzair
  fetchMyUnderDevelopmentApis:  {
    __typename: "fetchMyUnderdevelopmentApisOutput",
    apis:  Array< {
      __typename: "apiShowcaseInfo",
      apiId: string,
      title: string,
      shortDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      apiKind: apiKind,
      subscribed?: boolean | null,
    } | null >,
    count: number,
  },
};

export type FetchMyPublicApisQueryVariables = {
  input?: fetchMyPublicApisInput,
};

export type FetchMyPublicApisQuery = {
  // murtaza
  fetchMyPublicApis:  {
    __typename: "fetchMyPublicApisOutput",
    apis:  Array< {
      __typename: "apiShowcaseInfo",
      apiId: string,
      title: string,
      shortDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      apiKind: apiKind,
      subscribed?: boolean | null,
    } | null >,
    count: number,
  },
};

export type FetchMyPrivateApisQueryVariables = {
  input?: fetchMyPrivateApisInput,
};

export type FetchMyPrivateApisQuery = {
  // shahryar
  fetchMyPrivateApis:  {
    __typename: "fetchMyPrivateApisOutput",
    apis:  Array< {
      __typename: "apiShowcaseInfo",
      apiId: string,
      title: string,
      shortDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      apiKind: apiKind,
      subscribed?: boolean | null,
    } | null >,
    count: number,
  },
};

export type FetchMySubscribedApisQueryVariables = {
  input?: fetchMySubscribedApisInput,
};

export type FetchMySubscribedApisQuery = {
  // waris
  fetchMySubscribedApis:  {
    __typename: "fetchMySubscribedApisOutput",
    apis:  Array< {
      __typename: "apiShowcaseInfo",
      apiId: string,
      title: string,
      shortDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      apiKind: apiKind,
      subscribed?: boolean | null,
    } | null >,
    count: number,
  },
};

export type FetchMyApiSubscriptionQueryVariables = {
  input?: fetchMyApiSubscriptionInput,
};

export type FetchMyApiSubscriptionQuery = {
  // raffay
  fetchMyApiSubscription:  {
    __typename: "apiSubscription",
    subscriptionId: string,
    subscriptionCreationDate: string,
    paymentDayEveryMonth: string,
    api:  {
      __typename: "apiIdentifier",
      id: string,
      title: string,
      imageUrl: string,
    },
    subscription_token: string,
    status: subscriptionStatus,
    type: subscriptionType,
  },
};

export type FetchMyApiTokenQueryVariables = {
  input?: fetchMyApiTokenInput,
};

export type FetchMyApiTokenQuery = {
  // raffay
  fetchMyApiToken:  {
    __typename: "apiTokenInfo",
    api_token: string,
    apiId: string,
    entityId: string,
  },
};

export type FetchAllPublicApisQueryVariables = {
  input?: fetchAllPublicApisInput | null,
};

export type FetchAllPublicApisQuery = {
  // raffay
  fetchAllPublicApis:  {
    __typename: "fetchallPublicApisOutput",
    apis:  Array< {
      __typename: "apiShowcaseInfo",
      apiId: string,
      title: string,
      shortDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      apiKind: apiKind,
      subscribed?: boolean | null,
    } | null >,
    count: number,
  },
};

export type FetchMyCompaniesQueryVariables = {
  input?: fetchMyCompaniesInput,
};

export type FetchMyCompaniesQuery = {
  fetchMyCompanies:  {
    __typename: "fetchMyCompaniesOutput",
    companies:  Array< {
      __typename: "companyShowcaseProfileInfo",
      id: string,
      name: string,
      city: string,
      country: string,
      picture_url: string,
      total_followers: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
    } | null >,
    count: number,
  },
};

export type FetchApiInfoQueryVariables = {
  input?: fetchApiInfoInput,
};

export type FetchApiInfoQuery = {
  // raffay
  fetchApiInfo: ( {
      __typename: "graphQlApiFullInfo",
      apiId: string,
      owner: ( {
          __typename: "userIdentifier",
          id: string,
          picture_url: string,
          firstName: string,
          lastName: string,
        } | {
          __typename: "companyIdentifier",
          id: string,
          picture_url: string,
          name: string,
        }
      ),
      title: string,
      shortDescription: string,
      longDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      creationDate: string,
      apiKind: apiKind,
      subscribed?: boolean | null,
      apiUrl: string,
      graphQlSchema: string,
    } | {
      __typename: "openApiFullInfo",
      apiId: string,
      owner: ( {
          __typename: "userIdentifier",
          id: string,
          picture_url: string,
          firstName: string,
          lastName: string,
        } | {
          __typename: "companyIdentifier",
          id: string,
          picture_url: string,
          name: string,
        }
      ),
      title: string,
      shortDescription: string,
      longDescription: string,
      apiType: Array< apiType | null >,
      imageUrl: string,
      status: apiStatus,
      numOfSubscribers: number,
      creationDate: string,
      apiKind: apiKind,
      subscribed?: boolean | null,
      apiRootUrl: string,
      openApiDef: string,
    }
  ),
};

export type FetchApiReviewsQueryVariables = {
  input?: fetchApiReviewsInput,
};

export type FetchApiReviewsQuery = {
  fetchApiReviews:  {
    __typename: "fetchApiReviewsOutput",
    count: number,
    reviews:  Array< {
      __typename: "apiReview",
      reviewId: string,
      apiId: string,
      title: string,
      text: string,
      stars: number,
      dateCreated: string,
    } | null >,
  },
};

export type GetEntityFollowersQueryVariables = {
  input?: getEntityFollowersInput,
};

export type GetEntityFollowersQuery = {
  getEntityFollowers:  {
    __typename: "getEntityFollowersOutput",
    entities:  Array<( {
        __typename: "companyShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        name: string,
      } | {
        __typename: "userShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
      } | {
        __typename: "userShowcaseProfileInCompany",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
        role: allUserRolesInCompany,
        date_added: string,
      }
    ) | null >,
    count: number,
  },
};

export type GetEntityFollowingsQueryVariables = {
  input?: getEntityFollowingsInput,
};

export type GetEntityFollowingsQuery = {
  getEntityFollowings:  {
    __typename: "getEntityFollowingsOutput",
    entities:  Array<( {
        __typename: "companyShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        name: string,
      } | {
        __typename: "userShowcaseProfileInfo",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
      } | {
        __typename: "userShowcaseProfileInCompany",
        id: string,
        city: string,
        country: string,
        picture_url: string,
        total_followers: number,
        profileStatus: ProfileStatus,
        following?: boolean | null,
        firstName: string,
        lastName: string,
        role: allUserRolesInCompany,
        date_added: string,
      }
    ) | null >,
    count: number,
  },
};

export type GetEntityPostsQueryVariables = {
  input?: getEntityPostsInput,
};

export type GetEntityPostsQuery = {
  getEntityPosts:  {
    __typename: "getEntityPostsOutput",
    posts:  Array< {
      __typename: "SocialMediaPost",
      id: string,
      createdAt: string,
      imageUrl: string,
      text: string,
      numOfLikes: number,
      totalComments: number,
      liked?: boolean | null,
    } | null >,
    count: number,
  },
};

export type GetEntityProfileQueryVariables = {
  input?: getEntityProfileInput,
};

export type GetEntityProfileQuery = {
  getEntityProfile: ( {
      __typename: "companyFullProfileInfo",
      id: string,
      city: string,
      country: string,
      email: string,
      phone_number: string,
      picture_url: string,
      headline: string,
      total_followers: number,
      total_following: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
      name: string,
      owner:  {
        __typename: string,
        id: string,
        firstName: string,
        lastName: string,
        picture_url: string,
      },
    } | {
      __typename: "userFullProfileInfo",
      id: string,
      city: string,
      country: string,
      email: string,
      phone_number: string,
      picture_url: string,
      headline: string,
      total_followers: number,
      total_following: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
      firstName: string,
      lastName: string,
      education:  Array< {
        __typename: string,
        institute: string,
        city: string,
        country: string,
        education_level: education_level,
        field_of_study: field_of_study,
        degree_name: string,
        grade?: string | null,
        startDate: string,
        completed: boolean,
        endDate: string,
      } | null >,
      workExperience:  Array< {
        __typename: string,
        jobTitle: string,
        employmentType: employmentType,
        company: string,
        city: string,
        country: string,
        startDate: string,
        currentlyWorking: boolean,
        endDate: string,
      } | null >,
      recommendationRequestedFromUser?: boolean | null,
      recommendationRequestedByUser?: boolean | null,
      recommendedUser?: boolean | null,
      recommendedByUser?: boolean | null,
    }
  ),
};

export type GetPostCommentsQueryVariables = {
  input?: getPostCommentsInput,
};

export type GetPostCommentsQuery = {
  getPostComments:  {
    __typename: "getPostCommentsOutput",
    count: number,
    comments:  Array< {
      __typename: "comment",
      id: string,
      text: string,
      createdAt: string,
      postId: string,
    } | null >,
  },
};

export type GetEntityNewsFeedQueryVariables = {
  input?: getEntityNewsFeedInput,
};

export type GetEntityNewsFeedQuery = {
  getEntityNewsFeed:  {
    __typename: "getEntityNewsFeedOutput",
    count: number,
    posts:  Array< {
      __typename: "SocialMediaPost",
      id: string,
      createdAt: string,
      imageUrl: string,
      text: string,
      numOfLikes: number,
      totalComments: number,
      liked?: boolean | null,
    } | null >,
  },
};

export type GetUsersListQueryVariables = {
  input?: getUsersListInput,
};

export type GetUsersListQuery = {
  getUsersList:  {
    __typename: "getUsersListOutput",
    count: number,
    users:  Array< {
      __typename: "userShowcaseProfileInfo",
      id: string,
      firstName: string,
      lastName: string,
      city: string,
      country: string,
      picture_url: string,
      total_followers: number,
      profileStatus: ProfileStatus,
      following?: boolean | null,
    } | null >,
  },
};

export type GetPublicApisCountByTypeQuery = {
  getPublicApisCountByType:  Array< {
    __typename: "getPublicApisCountByTypeOutput",
    type: apiType,
    count: number,
  } | null >,
};

export type FetchNewsFeedSideMenuQueryVariables = {
  input?: fetchNewsFeedSideMenuInput,
};

export type FetchNewsFeedSideMenuQuery = {
  fetchNewsFeedSideMenu:  {
    __typename: "fetchNewsFeedSideMenuOutput",
    followers: number,
    following: number,
    companies: number,
    my_apis: number,
    subscribed_apis: number,
  },
};

export type GetUsersListInCompanyQueryVariables = {
  input?: getUsersListInCompanyInput,
};

export type GetUsersListInCompanyQuery = {
  getUsersListInCompany:  {
    __typename: "getUsersListInCompanyOutput",
    count: number,
    users:  Array< {
      __typename: "userShowcaseProfileInCompany",
      id: string,
      firstName: string,
      lastName: string,
      city: string,
      country: string,
      picture_url: string,
      total_followers: number,
      profileStatus: ProfileStatus,
      role: allUserRolesInCompany,
      date_added: string,
      following?: boolean | null,
    } | null >,
  },
};

export type GetRecommendationRequestsByMeQueryVariables = {
  input?: getRecommendationRequestsByMeInput,
};

export type GetRecommendationRequestsByMeQuery = {
  getRecommendationRequestsByMe:  {
    __typename: "getRecommendationRequestsByMeOutput",
    count: number,
    requests:  Array< {
      __typename: "recommendationRequest",
      id: string,
      timeStamp: string,
      requesterUserId: string,
      requestedUserId: string,
      message: string,
    } | null >,
  },
};

export type GetRecommendationRequestsForMeQueryVariables = {
  input?: getRecommendationRequestsForMeInput,
};

export type GetRecommendationRequestsForMeQuery = {
  getRecommendationRequestsForMe:  {
    __typename: "getRecommendationRequestsForMeOutput",
    count: number,
    requests:  Array< {
      __typename: "recommendationRequest",
      id: string,
      timeStamp: string,
      requesterUserId: string,
      requestedUserId: string,
      message: string,
    } | null >,
  },
};

export type GetRecommendationsForMeQueryVariables = {
  input?: getRecommendationsForMeInput,
};

export type GetRecommendationsForMeQuery = {
  getRecommendationsForMe:  {
    __typename: "getRecommendationsForMeOutput",
    count: number,
    recommendations:  Array< {
      __typename: "recommendation",
      id: string,
      timeStamp: string,
      recommendedBy: string,
      recommendationFor: string,
      text: string,
    } | null >,
  },
};

export type GetRecommendationsByMeQueryVariables = {
  input?: getRecommendationsByMeInput,
};

export type GetRecommendationsByMeQuery = {
  getRecommendationsByMe:  {
    __typename: "getRecommendationsByMeOutput",
    count: number,
    recommendations:  Array< {
      __typename: "recommendation",
      id: string,
      timeStamp: string,
      recommendedBy: string,
      recommendationFor: string,
      text: string,
    } | null >,
  },
};
