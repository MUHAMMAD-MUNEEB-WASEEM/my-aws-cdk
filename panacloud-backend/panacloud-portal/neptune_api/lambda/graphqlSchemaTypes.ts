export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: CompanyBasicProfileInfo;
  updateCompanyInfo: CompanyBasicProfileInfo;
  updateProfilePicture: UpdateDisplayPicture;
  addUserToCompany: UserShowcaseProfileInCompany;
  updateUserInfo: UserBasicProfileInfo;
  createOpenApi: OpenAPiBasicInfo;
  createGraphQlApi: GraphQlBasicInfo;
  changeApiStatus: ApiShowcaseInfo;
  subscribeToApi: ApiSubscription;
  changeSubscriptionStatus: ApiSubscription;
  changeEntityProfileStatus: EntityShowcaseProfileInfo;
  updateOpenApi: OpenAPiBasicInfo;
  updateGraphQlApi: GraphQlBasicInfo;
  updateApiImage: UpdateDisplayPicture;
  createNewTestingSubscription: ApiSubscription;
  createApiReview: ApiReview;
  followEntity: FollowEntityOutput;
  unFollowEntity: UnFollowEntityOutput;
  publishSocialMediaPost: SocialMediaPost;
  commentOnSocialMediaPost: Comment;
  likeOnSocialMediaPost: SocialMediaPostLike;
  requestRecommendation: RecommendationRequest;
  writeRecommendation: Recommendation;
  cancelRecommendationRequest: RecommendationRequest;
  deleteRecommendation: Recommendation;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationUpdateCompanyInfoArgs = {
  input: UpdateCompanyInfoInput;
};


export type MutationUpdateProfilePictureArgs = {
  input: UpdateProfilePictureInput;
};


export type MutationAddUserToCompanyArgs = {
  input: AddUserToCompanyInput;
};


export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInput;
};


export type MutationCreateOpenApiArgs = {
  input: CreateOpenApiInput;
};


export type MutationCreateGraphQlApiArgs = {
  input: CreateGraphQlApiInput;
};


export type MutationChangeApiStatusArgs = {
  input: ChangeApiStatusInput;
};


export type MutationSubscribeToApiArgs = {
  input: SubscribeToApiInput;
};


export type MutationChangeSubscriptionStatusArgs = {
  input: ChangeSubscriptionStatusInput;
};


export type MutationChangeEntityProfileStatusArgs = {
  input: ChangeEntityProfileStatusInput;
};


export type MutationUpdateOpenApiArgs = {
  input: UpdateOpenApiInput;
};


export type MutationUpdateGraphQlApiArgs = {
  input: UpdateGraphQlInput;
};


export type MutationUpdateApiImageArgs = {
  input: UpdateApiImageInput;
};


export type MutationCreateNewTestingSubscriptionArgs = {
  input: CreateNewTestingSubscriptionInput;
};


export type MutationCreateApiReviewArgs = {
  input: CreateApiReviewInput;
};


export type MutationFollowEntityArgs = {
  input: FollowEntityInput;
};


export type MutationUnFollowEntityArgs = {
  input: UnFollowEntityInput;
};


export type MutationPublishSocialMediaPostArgs = {
  input: SocialMediaPostInput;
};


export type MutationCommentOnSocialMediaPostArgs = {
  input: CommentOnSocialMediaPostInput;
};


export type MutationLikeOnSocialMediaPostArgs = {
  input: LikeOnSocialMediaPostInput;
};


export type MutationRequestRecommendationArgs = {
  input: RequestRecommendationInput;
};


export type MutationWriteRecommendationArgs = {
  input: WriteRecommendationInput;
};


export type MutationCancelRecommendationRequestArgs = {
  input: CancelRecommendationRequestInput;
};


export type MutationDeleteRecommendationArgs = {
  input: DeleteRecommendationInput;
};

export enum ProfileStatus {
  Published = 'PUBLISHED',
  Unpublished = 'UNPUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  fetchMyApiTestingSubscriptions: Array<Maybe<ApiSubscription>>;
  fetchMyUnderDevelopmentApis: FetchMyUnderdevelopmentApisOutput;
  fetchMyPublicApis: FetchMyPublicApisOutput;
  fetchMyPrivateApis: FetchMyPrivateApisOutput;
  fetchMySubscribedApis: FetchMySubscribedApisOutput;
  fetchMyApiSubscription: ApiSubscription;
  fetchMyApiToken: ApiTokenInfo;
  fetchAllPublicApis: FetchallPublicApisOutput;
  fetchMyCompanies: FetchMyCompaniesOutput;
  fetchApiInfo: ApiFullInfo;
  fetchApiReviews: FetchApiReviewsOutput;
  getEntityFollowers: GetEntityFollowersOutput;
  getEntityFollowings: GetEntityFollowingsOutput;
  getEntityPosts: GetEntityPostsOutput;
  getEntityProfile: EntityFullProfileInfo;
  getPostComments: GetPostCommentsOutput;
  getEntityNewsFeed: GetEntityNewsFeedOutput;
  getUsersList: GetUsersListOutput;
  getPublicApisCountByType: Array<Maybe<GetPublicApisCountByTypeOutput>>;
  fetchNewsFeedSideMenu: FetchNewsFeedSideMenuOutput;
  getUsersListInCompany: GetUsersListInCompanyOutput;
  getRecommendationRequestsByMe: GetRecommendationRequestsByMeOutput;
  getRecommendationRequestsForMe: GetRecommendationRequestsForMeOutput;
  getRecommendationsForMe: GetRecommendationsForMeOutput;
  getRecommendationsByMe: GetRecommendationsByMeOutput;
};


export type QueryFetchMyApiTestingSubscriptionsArgs = {
  input: FetchMyApiTestingSubscriptionInput;
};


export type QueryFetchMyUnderDevelopmentApisArgs = {
  input: FetchMyUnderDevelopmentApisInput;
};


export type QueryFetchMyPublicApisArgs = {
  input: FetchMyPublicApisInput;
};


export type QueryFetchMyPrivateApisArgs = {
  input: FetchMyPrivateApisInput;
};


export type QueryFetchMySubscribedApisArgs = {
  input: FetchMySubscribedApisInput;
};


export type QueryFetchMyApiSubscriptionArgs = {
  input: FetchMyApiSubscriptionInput;
};


export type QueryFetchMyApiTokenArgs = {
  input: FetchMyApiTokenInput;
};


export type QueryFetchAllPublicApisArgs = {
  input?: Maybe<FetchAllPublicApisInput>;
};


export type QueryFetchMyCompaniesArgs = {
  input: FetchMyCompaniesInput;
};


export type QueryFetchApiInfoArgs = {
  input: FetchApiInfoInput;
};


export type QueryFetchApiReviewsArgs = {
  input: FetchApiReviewsInput;
};


export type QueryGetEntityFollowersArgs = {
  input: GetEntityFollowersInput;
};


export type QueryGetEntityFollowingsArgs = {
  input: GetEntityFollowingsInput;
};


export type QueryGetEntityPostsArgs = {
  input: GetEntityPostsInput;
};


export type QueryGetEntityProfileArgs = {
  input: GetEntityProfileInput;
};


export type QueryGetPostCommentsArgs = {
  input: GetPostCommentsInput;
};


export type QueryGetEntityNewsFeedArgs = {
  input: GetEntityNewsFeedInput;
};


export type QueryGetUsersListArgs = {
  input: GetUsersListInput;
};


export type QueryFetchNewsFeedSideMenuArgs = {
  input: FetchNewsFeedSideMenuInput;
};


export type QueryGetUsersListInCompanyArgs = {
  input: GetUsersListInCompanyInput;
};


export type QueryGetRecommendationRequestsByMeArgs = {
  input: GetRecommendationRequestsByMeInput;
};


export type QueryGetRecommendationRequestsForMeArgs = {
  input: GetRecommendationRequestsForMeInput;
};


export type QueryGetRecommendationsForMeArgs = {
  input: GetRecommendationsForMeInput;
};


export type QueryGetRecommendationsByMeArgs = {
  input: GetRecommendationsByMeInput;
};

export type SocialMediaPost = {
  __typename?: 'SocialMediaPost';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  by: EntityIdentifier;
  imageUrl: Scalars['String'];
  text: Scalars['String'];
  numOfLikes: Scalars['Int'];
  latestComments: Array<Maybe<Comment>>;
  totalComments: Scalars['Int'];
};

export type SocialMediaPostInput = {
  text?: Maybe<Scalars['String']>;
  by: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
};

export type AddUserToCompanyInput = {
  userId: Scalars['String'];
  companyId: Scalars['String'];
  role: MutableUserRolesInCompany;
};

export enum AllUserRolesInCompany {
  OtherEmployee = 'OTHER_EMPLOYEE',
  Developer = 'DEVELOPER',
  Owner = 'OWNER'
}

export type ApiBasicInfo = {
  apiId: Scalars['String'];
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
};

export type ApiFullInfo = {
  apiId: Scalars['String'];
  owner: EntityIdentifier;
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
  imageUrl: Scalars['String'];
  status: ApiStatus;
  numOfSubscribers: Scalars['Int'];
  creationDate: Scalars['String'];
  apiKind: ApiKind;
  subscribed?: Maybe<Scalars['Boolean']>;
};

export type ApiIdentifier = {
  __typename?: 'apiIdentifier';
  id: Scalars['String'];
  title: Scalars['String'];
  imageUrl: Scalars['String'];
};

export enum ApiKind {
  Graphql = 'GRAPHQL',
  Openapi = 'OPENAPI'
}

export type ApiReview = {
  __typename?: 'apiReview';
  reviewId: Scalars['String'];
  by: EntityIdentifier;
  apiId: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  stars: Scalars['Int'];
  dateCreated: Scalars['String'];
};

export type ApiShowcaseInfo = {
  __typename?: 'apiShowcaseInfo';
  apiId: Scalars['String'];
  owner: EntityIdentifier;
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
  imageUrl: Scalars['String'];
  status: ApiStatus;
  numOfSubscribers: Scalars['Int'];
  apiKind: ApiKind;
  subscribed?: Maybe<Scalars['Boolean']>;
};

export enum ApiStatus {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
  Underdevelopment = 'UNDERDEVELOPMENT'
}

export type ApiSubscription = {
  __typename?: 'apiSubscription';
  subscriptionId: Scalars['String'];
  subscriptionCreationDate: Scalars['String'];
  paymentDayEveryMonth: Scalars['String'];
  api: ApiIdentifier;
  subscription_token: Scalars['String'];
  status: SubscriptionStatus;
  type: SubscriptionType;
};

export type ApiTokenInfo = {
  __typename?: 'apiTokenInfo';
  api_token: Scalars['String'];
  apiId: Scalars['String'];
  entityId: Scalars['String'];
};

export enum ApiType {
  Crm = 'CRM',
  Erp = 'ERP',
  Accounting = 'ACCOUNTING',
  Pm = 'PM',
  Cms = 'CMS',
  Communication = 'COMMUNICATION',
  Ecommerce = 'ECOMMERCE',
  Hrm = 'HRM',
  PaymentGateway = 'PAYMENT_GATEWAY',
  Billing = 'BILLING',
  Finance = 'FINANCE',
  Education = 'EDUCATION',
  Medical = 'MEDICAL',
  Music = 'MUSIC',
  News = 'NEWS',
  SocialNetworking = 'SOCIAL_NETWORKING',
  Weather = 'WEATHER',
  Lifestyle = 'LIFESTYLE',
  Productivity = 'PRODUCTIVITY',
  Sports = 'SPORTS',
  Travel = 'TRAVEL',
  Food = 'FOOD',
  PhotoVideo = 'PHOTO_VIDEO',
  Utilities = 'UTILITIES',
  Data = 'DATA',
  Ai = 'AI',
  Iot = 'IOT',
  BlockchainCrypto = 'BLOCKCHAIN_CRYPTO',
  Business = 'BUSINESS',
  Reference = 'REFERENCE',
  HealthFitness = 'HEALTH_FITNESS'
}

export type CancelRecommendationRequestInput = {
  recommendationRequestId: Scalars['String'];
  userId: Scalars['String'];
};

export type ChangeApiStatusInput = {
  apiId: Scalars['String'];
  status: ApiStatus;
  entityId: Scalars['String'];
};

export type ChangeEntityProfileStatusInput = {
  entityId: Scalars['String'];
  status: ProfileStatus;
};

export type ChangeSubscriptionStatusInput = {
  subscriptionId: Scalars['String'];
  status: SubscriptionStatus;
  entityId: Scalars['String'];
};

export type Comment = {
  __typename?: 'comment';
  id: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  postId: Scalars['String'];
  by: EntityIdentifier;
};

export type CommentOnSocialMediaPostInput = {
  postId: Scalars['String'];
  text: Scalars['String'];
  by: Scalars['String'];
};

export type CompanyBasicProfileInfo = EntityBasicProfileInfo & {
  __typename?: 'companyBasicProfileInfo';
  id: Scalars['String'];
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  phone_number: Scalars['String'];
  headline: Scalars['String'];
};

export type CompanyFullProfileInfo = EntityFullProfileInfo & {
  __typename?: 'companyFullProfileInfo';
  id: Scalars['String'];
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  phone_number: Scalars['String'];
  picture_url: Scalars['String'];
  headline: Scalars['String'];
  total_followers: Scalars['Int'];
  total_following: Scalars['Int'];
  owner: UserIdentifier;
  profileStatus: ProfileStatus;
  following?: Maybe<Scalars['Boolean']>;
};

export type CompanyIdentifier = EntityIdentifier & {
  __typename?: 'companyIdentifier';
  id: Scalars['String'];
  name: Scalars['String'];
  picture_url: Scalars['String'];
};

export type CompanyShowcaseProfileInfo = EntityShowcaseProfileInfo & {
  __typename?: 'companyShowcaseProfileInfo';
  id: Scalars['String'];
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  picture_url: Scalars['String'];
  owner: UserIdentifier;
  total_followers: Scalars['Int'];
  profileStatus: ProfileStatus;
  following?: Maybe<Scalars['Boolean']>;
};

export type CreateApiReviewInput = {
  by: Scalars['String'];
  apiId: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  stars: Scalars['Int'];
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  companyId: Scalars['String'];
  email: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  phone_number: Scalars['String'];
  owner: Scalars['String'];
};

export type CreateGraphQlApiInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  title: Scalars['String'];
  apiType: Array<ApiType>;
  apiUrl: Scalars['String'];
  graphQlSchema: Scalars['String'];
};

export type CreateNewTestingSubscriptionInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
};

export type CreateOpenApiInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  title: Scalars['String'];
  apiType: Array<ApiType>;
  apiRootUrl: Scalars['String'];
  openApiDef: Scalars['String'];
};

export type DeleteRecommendationInput = {
  recommendationId: Scalars['String'];
  userId: Scalars['String'];
};

export type Education = {
  __typename?: 'education';
  institute: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  education_level: Education_Level;
  field_of_study: Field_Of_Study;
  degree_name: Scalars['String'];
  grade?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
  completed: Scalars['Boolean'];
  endDate: Scalars['String'];
};

export enum Education_Level {
  Masters = 'MASTERS',
  Bachelors = 'BACHELORS',
  Phd = 'PHD',
  Diploma = 'DIPLOMA'
}

export enum EmploymentType {
  Fulltime = 'FULLTIME',
  Parttime = 'PARTTIME',
  Selfemployed = 'SELFEMPLOYED',
  Freelance = 'FREELANCE',
  Contract = 'CONTRACT',
  Internship = 'INTERNSHIP',
  Seasonal = 'SEASONAL'
}

export type EntityBasicProfileInfo = {
  id: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  phone_number: Scalars['String'];
  headline: Scalars['String'];
};

export type EntityFullProfileInfo = {
  id: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  phone_number: Scalars['String'];
  picture_url: Scalars['String'];
  headline: Scalars['String'];
  total_followers: Scalars['Int'];
  total_following: Scalars['Int'];
  profileStatus: ProfileStatus;
  following?: Maybe<Scalars['Boolean']>;
};

export type EntityIdentifier = {
  id: Scalars['String'];
  picture_url: Scalars['String'];
};

export type EntityShowcaseProfileInfo = {
  id: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  picture_url: Scalars['String'];
  total_followers: Scalars['Int'];
  profileStatus: ProfileStatus;
  following?: Maybe<Scalars['Boolean']>;
};

export type FetchAllPublicApisInput = {
  entityId?: Maybe<Scalars['String']>;
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
  apiType?: Maybe<Array<Maybe<ApiType>>>;
};

export type FetchApiInfoInput = {
  apiId: Scalars['String'];
  entityId: Scalars['String'];
};

export type FetchApiReviewsInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchApiReviewsOutput = {
  __typename?: 'fetchApiReviewsOutput';
  count: Scalars['Int'];
  reviews: Array<Maybe<ApiReview>>;
};

export type FetchMyApiSubscriptionInput = {
  apiId: Scalars['String'];
  entityId: Scalars['String'];
};

export type FetchMyApiTestingSubscriptionInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchMyApiTokenInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
};

export type FetchMyCompaniesInput = {
  userId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchMyCompaniesOutput = {
  __typename?: 'fetchMyCompaniesOutput';
  companies: Array<Maybe<CompanyShowcaseProfileInfo>>;
  count: Scalars['Int'];
};

export type FetchMyPrivateApisInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchMyPrivateApisOutput = {
  __typename?: 'fetchMyPrivateApisOutput';
  apis: Array<Maybe<ApiShowcaseInfo>>;
  count: Scalars['Int'];
};

export type FetchMyPublicApisInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchMyPublicApisOutput = {
  __typename?: 'fetchMyPublicApisOutput';
  apis: Array<Maybe<ApiShowcaseInfo>>;
  count: Scalars['Int'];
};

export type FetchMySubscribedApisInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchMySubscribedApisOutput = {
  __typename?: 'fetchMySubscribedApisOutput';
  apis: Array<Maybe<ApiShowcaseInfo>>;
  count: Scalars['Int'];
};

export type FetchMyUnderDevelopmentApisInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type FetchMyUnderdevelopmentApisOutput = {
  __typename?: 'fetchMyUnderdevelopmentApisOutput';
  apis: Array<Maybe<ApiShowcaseInfo>>;
  count: Scalars['Int'];
};

export type FetchNewsFeedSideMenuInput = {
  entityId: Scalars['String'];
};

export type FetchNewsFeedSideMenuOutput = {
  __typename?: 'fetchNewsFeedSideMenuOutput';
  followers: Scalars['Int'];
  following: Scalars['Int'];
  companies: Scalars['Int'];
  my_apis: Scalars['Int'];
  subscribed_apis: Scalars['Int'];
};

export type FetchProfileInput = {
  entityId: Scalars['String'];
};

export type FetchallPublicApisOutput = {
  __typename?: 'fetchallPublicApisOutput';
  apis: Array<Maybe<ApiShowcaseInfo>>;
  count: Scalars['Int'];
};

export enum Field_Of_Study {
  Engineering = 'ENGINEERING',
  Medical = 'MEDICAL',
  Business = 'BUSINESS'
}

export type FollowEntityInput = {
  entityId: Scalars['String'];
  followEntityId: Scalars['String'];
};

export type FollowEntityOutput = {
  __typename?: 'followEntityOutput';
  entity: EntityShowcaseProfileInfo;
  followEntity: EntityShowcaseProfileInfo;
};

export type GetEntityFollowersInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetEntityFollowersOutput = {
  __typename?: 'getEntityFollowersOutput';
  entities: Array<Maybe<EntityShowcaseProfileInfo>>;
  count: Scalars['Int'];
};

export type GetEntityFollowingsInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetEntityFollowingsOutput = {
  __typename?: 'getEntityFollowingsOutput';
  entities: Array<Maybe<EntityShowcaseProfileInfo>>;
  count: Scalars['Int'];
};

export type GetEntityNewsFeedInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetEntityNewsFeedOutput = {
  __typename?: 'getEntityNewsFeedOutput';
  count: Scalars['Int'];
  posts: Array<Maybe<SocialMediaPost>>;
};

export type GetEntityPostsInput = {
  entityId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetEntityPostsOutput = {
  __typename?: 'getEntityPostsOutput';
  posts: Array<Maybe<SocialMediaPost>>;
  count: Scalars['Int'];
};

export type GetEntityProfileInput = {
  requesterEntityId: Scalars['String'];
  requestedEntityId: Scalars['String'];
};

export type GetPostCommentsInput = {
  postId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetPostCommentsOutput = {
  __typename?: 'getPostCommentsOutput';
  count: Scalars['Int'];
  comments: Array<Maybe<Comment>>;
};

export type GetPublicApisCountByTypeOutput = {
  __typename?: 'getPublicApisCountByTypeOutput';
  type: ApiType;
  count: Scalars['Int'];
};

export type GetRecommendationRequestsByMeInput = {
  userId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetRecommendationRequestsByMeOutput = {
  __typename?: 'getRecommendationRequestsByMeOutput';
  count: Scalars['Int'];
  requests: Array<Maybe<RecommendationRequest>>;
};

export type GetRecommendationRequestsForMeInput = {
  userId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetRecommendationRequestsForMeOutput = {
  __typename?: 'getRecommendationRequestsForMeOutput';
  count: Scalars['Int'];
  requests: Array<Maybe<RecommendationRequest>>;
};

export type GetRecommendationsByMeInput = {
  userId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetRecommendationsByMeOutput = {
  __typename?: 'getRecommendationsByMeOutput';
  count: Scalars['Int'];
  recommendations: Array<Maybe<Recommendation>>;
};

export type GetRecommendationsForMeInput = {
  userId: Scalars['String'];
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type GetRecommendationsForMeOutput = {
  __typename?: 'getRecommendationsForMeOutput';
  count: Scalars['Int'];
  recommendations: Array<Maybe<Recommendation>>;
};

export type GetUsersListInCompanyInput = {
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
  requesterEntityId: Scalars['String'];
  requestedCompanyId: Scalars['String'];
};

export type GetUsersListInCompanyOutput = {
  __typename?: 'getUsersListInCompanyOutput';
  count: Scalars['Int'];
  users: Array<Maybe<UserShowcaseProfileInCompany>>;
};

export type GetUsersListInput = {
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
  userId?: Maybe<Scalars['String']>;
};

export type GetUsersListOutput = {
  __typename?: 'getUsersListOutput';
  count: Scalars['Int'];
  users: Array<Maybe<UserShowcaseProfileInfo>>;
};

export type GraphQlApiFullInfo = ApiFullInfo & {
  __typename?: 'graphQlApiFullInfo';
  apiId: Scalars['String'];
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
  imageUrl: Scalars['String'];
  apiUrl: Scalars['String'];
  graphQlSchema: Scalars['String'];
  owner: EntityIdentifier;
  status: ApiStatus;
  numOfSubscribers: Scalars['Int'];
  creationDate: Scalars['String'];
  apiKind: ApiKind;
  subscribed?: Maybe<Scalars['Boolean']>;
};

export type GraphQlBasicInfo = ApiBasicInfo & {
  __typename?: 'graphQlBasicInfo';
  apiId: Scalars['String'];
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
  apiUrl: Scalars['String'];
  graphQlSchema: Scalars['String'];
};

export type LikeOnSocialMediaPostInput = {
  postId: Scalars['String'];
  by: Scalars['String'];
};

export enum MutableUserRolesInCompany {
  OtherEmployee = 'OTHER_EMPLOYEE',
  Developer = 'DEVELOPER'
}

export type OpenAPiBasicInfo = ApiBasicInfo & {
  __typename?: 'openAPiBasicInfo';
  apiId: Scalars['String'];
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
  apiRootUrl: Scalars['String'];
  openApiDef: Scalars['String'];
};

export type OpenApiFullInfo = ApiFullInfo & {
  __typename?: 'openApiFullInfo';
  apiId: Scalars['String'];
  title: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  apiType: Array<Maybe<ApiType>>;
  imageUrl: Scalars['String'];
  apiRootUrl: Scalars['String'];
  openApiDef: Scalars['String'];
  owner: EntityIdentifier;
  status: ApiStatus;
  numOfSubscribers: Scalars['Int'];
  creationDate: Scalars['String'];
  apiKind: ApiKind;
  subscribed?: Maybe<Scalars['Boolean']>;
};

export enum ReactionType {
  Liked = 'LIKED',
  None = 'NONE'
}

export type Recommendation = {
  __typename?: 'recommendation';
  id: Scalars['String'];
  timeStamp: Scalars['String'];
  recommendedBy: Scalars['String'];
  recommendationFor: Scalars['String'];
  text: Scalars['String'];
};

export type RecommendationRequest = {
  __typename?: 'recommendationRequest';
  id: Scalars['String'];
  timeStamp: Scalars['String'];
  requesterUserId: Scalars['String'];
  requestedUserId: Scalars['String'];
  message: Scalars['String'];
};

export type RequestRecommendationInput = {
  requesterUserId: Scalars['String'];
  requestedUserId: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type SocialMediaPostLike = {
  __typename?: 'socialMediaPostLike';
  postId: Scalars['String'];
  by: EntityIdentifier;
  reaction: ReactionType;
};

export type SubscribeToApiInput = {
  apiId: Scalars['String'];
  entityId: Scalars['String'];
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum SubscriptionType {
  Normal = 'NORMAL',
  Testing = 'TESTING'
}

export type UnFollowEntityInput = {
  entityId: Scalars['String'];
  unFollowEntityId: Scalars['String'];
};

export type UnFollowEntityOutput = {
  __typename?: 'unFollowEntityOutput';
  entity: EntityShowcaseProfileInfo;
  unFollowEntity: EntityShowcaseProfileInfo;
};

export type UpdateApiImageInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  picture_url: Scalars['String'];
};

export type UpdateCompanyInfoInput = {
  companyId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
};

export type UpdateDisplayPicture = {
  __typename?: 'updateDisplayPicture';
  id: Scalars['String'];
  picture_url: Scalars['String'];
};

export type UpdateEducation = {
  institute: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  education_level: Education_Level;
  field_of_study: Field_Of_Study;
  degree_name: Scalars['String'];
  grade?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
  completed: Scalars['Boolean'];
  endDate?: Maybe<Scalars['String']>;
};

export type UpdateGraphQlInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  apiType?: Maybe<Array<ApiType>>;
  apiUrl?: Maybe<Scalars['String']>;
  graphQlSchema?: Maybe<Scalars['String']>;
};

export type UpdateOpenApiInput = {
  entityId: Scalars['String'];
  apiId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  apiType?: Maybe<Array<ApiType>>;
  apiRootUrl?: Maybe<Scalars['String']>;
  openApiDef?: Maybe<Scalars['String']>;
};

export type UpdateProfilePictureInput = {
  entityId: Scalars['String'];
  picture_url: Scalars['String'];
};

export type UpdateUserInput = {
  userId: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  education?: Maybe<Array<Maybe<UpdateEducation>>>;
  workExperience?: Maybe<Array<Maybe<UpdateWorkExperience>>>;
};

export type UpdateWorkExperience = {
  jobTitle: Scalars['String'];
  employmentType: EmploymentType;
  company: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  startDate: Scalars['String'];
  currentlyWorking: Scalars['Boolean'];
  endDate?: Maybe<Scalars['String']>;
};

export type UserBasicProfileInfo = EntityBasicProfileInfo & {
  __typename?: 'userBasicProfileInfo';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  phone_number: Scalars['String'];
  education: Array<Maybe<Education>>;
  workExperience: Array<Maybe<WorkExperience>>;
  headline: Scalars['String'];
};

export type UserFullProfileInfo = EntityFullProfileInfo & {
  __typename?: 'userFullProfileInfo';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  phone_number: Scalars['String'];
  picture_url: Scalars['String'];
  headline: Scalars['String'];
  total_followers: Scalars['Int'];
  total_following: Scalars['Int'];
  profileStatus: ProfileStatus;
  education: Array<Maybe<Education>>;
  workExperience: Array<Maybe<WorkExperience>>;
  following?: Maybe<Scalars['Boolean']>;
};

export type UserIdentifier = EntityIdentifier & {
  __typename?: 'userIdentifier';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  picture_url: Scalars['String'];
};

export type UserShowcaseProfileInCompany = EntityShowcaseProfileInfo & {
  __typename?: 'userShowcaseProfileInCompany';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  picture_url: Scalars['String'];
  total_followers: Scalars['Int'];
  profileStatus: ProfileStatus;
  role: AllUserRolesInCompany;
  date_added: Scalars['String'];
  following?: Maybe<Scalars['Boolean']>;
};

export type UserShowcaseProfileInfo = EntityShowcaseProfileInfo & {
  __typename?: 'userShowcaseProfileInfo';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  picture_url: Scalars['String'];
  total_followers: Scalars['Int'];
  profileStatus: ProfileStatus;
  following?: Maybe<Scalars['Boolean']>;
};

export type WorkExperience = {
  __typename?: 'workExperience';
  jobTitle: Scalars['String'];
  employmentType: EmploymentType;
  company: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  startDate: Scalars['String'];
  currentlyWorking: Scalars['Boolean'];
  endDate: Scalars['String'];
};

export type WriteRecommendationInput = {
  recommendedBy: Scalars['String'];
  recommendationFor: Scalars['String'];
  text: Scalars['String'];
};
