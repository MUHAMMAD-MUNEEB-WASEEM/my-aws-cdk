/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany($input: createCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      city
      country
      email
      phone_number
      headline
    }
  }
`;
export const updateCompanyInfo = /* GraphQL */ `
  mutation UpdateCompanyInfo($input: updateCompanyInfoInput!) {
    updateCompanyInfo(input: $input) {
      id
      name
      city
      country
      email
      phone_number
      headline
    }
  }
`;
export const updateProfilePicture = /* GraphQL */ `
  mutation UpdateProfilePicture($input: updateProfilePictureInput!) {
    updateProfilePicture(input: $input) {
      id
      picture_url
    }
  }
`;
export const addUserToCompany = /* GraphQL */ `
  mutation AddUserToCompany($input: addUserToCompanyInput!) {
    addUserToCompany(input: $input) {
      id
      firstName
      lastName
      city
      country
      picture_url
      total_followers
      profileStatus
      company_relation_info {
        role
        date_added
      }
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo($input: updateUserInput!) {
    updateUserInfo(input: $input) {
      id
      firstName
      lastName
      city
      country
      email
      phone_number
      headline
    }
  }
`;
export const createOpenApi = /* GraphQL */ `
  mutation CreateOpenApi($input: createOpenApiInput!) {
    createOpenApi(input: $input) {
      apiId
      title
      shortDescription
      longDescription
      apiType
      apiRootUrl
      openApiDef
    }
  }
`;
export const createGraphQlApi = /* GraphQL */ `
  mutation CreateGraphQlApi($input: createGraphQLApiInput!) {
    createGraphQlApi(input: $input) {
      apiId
      title
      shortDescription
      longDescription
      apiType
      apiUrl
      graphQlSchema
    }
  }
`;
export const changeApiStatus = /* GraphQL */ `
  mutation ChangeApiStatus($input: changeApiStatusInput!) {
    changeApiStatus(input: $input) {
      apiId
      owner {
        id
        picture_url
        ... on userIdentifier {
          firstName
          lastName
        }
        ... on companyIdentifier {
          name
        }
      }
      title
      shortDescription
      apiType
      imageUrl
      status
      numOfSubscribers
      apiKind
    }
  }
`;
export const subscribeToApi = /* GraphQL */ `
  mutation SubscribeToApi($input: subscribeToApiInput!) {
    subscribeToApi(input: $input) {
      subscriptionId
      subscriptionCreationDate
      paymentDayEveryMonth
      api {
        id
        title
        imageUrl
      }
      subscription_token
      status
      type
    }
  }
`;
export const changeSubscriptionStatus = /* GraphQL */ `
  mutation ChangeSubscriptionStatus($input: changeSubscriptionStatusInput!) {
    changeSubscriptionStatus(input: $input) {
      subscriptionId
      subscriptionCreationDate
      paymentDayEveryMonth
      api {
        id
        title
        imageUrl
      }
      subscription_token
      status
      type
    }
  }
`;
export const changeEntityProfileStatus = /* GraphQL */ `
  mutation ChangeEntityProfileStatus($input: changeEntityProfileStatusInput!) {
    changeEntityProfileStatus(input: $input) {
      id
      city
      country
      picture_url
      total_followers
      profileStatus
      ... on companyShowcaseProfileInfo {
        name
        owner {
          id
          firstName
          lastName
          picture_url
        }
      }
      ... on userShowcaseProfileInfo {
        firstName
        lastName
      }
      ... on userShowcaseProfileInCompany {
        firstName
        lastName
        company_relation_info {
          role
          date_added
        }
      }
    }
  }
`;
export const updateOpenApi = /* GraphQL */ `
  mutation UpdateOpenApi($input: updateOpenApiInput!) {
    updateOpenApi(input: $input) {
      apiId
      title
      shortDescription
      longDescription
      apiType
      apiRootUrl
      openApiDef
    }
  }
`;
export const updateGraphQlApi = /* GraphQL */ `
  mutation UpdateGraphQlApi($input: updateGraphQlInput!) {
    updateGraphQlApi(input: $input) {
      apiId
      title
      shortDescription
      longDescription
      apiType
      apiUrl
      graphQlSchema
    }
  }
`;
export const updateApiImage = /* GraphQL */ `
  mutation UpdateApiImage($input: updateApiImageInput!) {
    updateApiImage(input: $input) {
      id
      picture_url
    }
  }
`;
export const createNewTestingSubscription = /* GraphQL */ `
  mutation CreateNewTestingSubscription(
    $input: createNewTestingSubscriptionInput!
  ) {
    createNewTestingSubscription(input: $input) {
      subscriptionId
      subscriptionCreationDate
      paymentDayEveryMonth
      api {
        id
        title
        imageUrl
      }
      subscription_token
      status
      type
    }
  }
`;
export const followEntity = /* GraphQL */ `
  mutation FollowEntity($input: followEntityInput!) {
    followEntity(input: $input) {
      entity {
        id
        city
        country
        picture_url
        total_followers
        profileStatus
        ... on companyShowcaseProfileInfo {
          name
        }
        ... on userShowcaseProfileInfo {
          firstName
          lastName
        }
        ... on userShowcaseProfileInCompany {
          firstName
          lastName
        }
      }
      followEntity {
        id
        city
        country
        picture_url
        total_followers
        profileStatus
        ... on companyShowcaseProfileInfo {
          name
        }
        ... on userShowcaseProfileInfo {
          firstName
          lastName
        }
        ... on userShowcaseProfileInCompany {
          firstName
          lastName
        }
      }
    }
  }
`;
export const unFollowEntity = /* GraphQL */ `
  mutation UnFollowEntity($input: unFollowEntityInput!) {
    unFollowEntity(input: $input) {
      entity {
        id
        city
        country
        picture_url
        total_followers
        profileStatus
        ... on companyShowcaseProfileInfo {
          name
        }
        ... on userShowcaseProfileInfo {
          firstName
          lastName
        }
        ... on userShowcaseProfileInCompany {
          firstName
          lastName
        }
      }
      unFollowEntity {
        id
        city
        country
        picture_url
        total_followers
        profileStatus
        ... on companyShowcaseProfileInfo {
          name
        }
        ... on userShowcaseProfileInfo {
          firstName
          lastName
        }
        ... on userShowcaseProfileInCompany {
          firstName
          lastName
        }
      }
    }
  }
`;
export const publishSocialMediaPost = /* GraphQL */ `
  mutation PublishSocialMediaPost($input: SocialMediaPostInput!) {
    publishSocialMediaPost(input: $input) {
      id
      createdAt
      by {
        id
        picture_url
        ... on userIdentifier {
          firstName
          lastName
        }
        ... on companyIdentifier {
          name
        }
      }
      imageUrl
      text
      numOfLikes
      latestComments {
        id
        text
        createdAt
        postId
      }
      totalComments
    }
  }
`;
export const commentOnSocialMediaPost = /* GraphQL */ `
  mutation CommentOnSocialMediaPost($input: commentOnSocialMediaPostInput!) {
    commentOnSocialMediaPost(input: $input) {
      id
      text
      createdAt
      postId
      by {
        id
        picture_url
        ... on userIdentifier {
          firstName
          lastName
        }
        ... on companyIdentifier {
          name
        }
      }
    }
  }
`;
export const likeOnSocialMediaPost = /* GraphQL */ `
  mutation LikeOnSocialMediaPost($input: likeOnSocialMediaPostInput!) {
    likeOnSocialMediaPost(input: $input) {
      postId
      by {
        id
        picture_url
        ... on userIdentifier {
          firstName
          lastName
        }
        ... on companyIdentifier {
          name
        }
      }
      reaction
    }
  }
`;
