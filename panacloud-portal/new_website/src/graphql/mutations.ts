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
      role
      date_added
      following
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
      education {
        institute
        city
        country
        education_level
        field_of_study
        degree_name
        grade
        startDate
        completed
        endDate
      }
      workExperience {
        jobTitle
        employmentType
        company
        city
        country
        startDate
        currentlyWorking
        endDate
      }
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
      subscribed
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
      following
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
        role
        date_added
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
export const createApiReview = /* GraphQL */ `
  mutation CreateApiReview($input: createApiReviewInput!) {
    createApiReview(input: $input) {
      reviewId
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
      apiId
      title
      text
      stars
      dateCreated
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
        following
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
          role
          date_added
        }
      }
      followEntity {
        id
        city
        country
        picture_url
        total_followers
        profileStatus
        following
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
          role
          date_added
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
        following
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
          role
          date_added
        }
      }
      unFollowEntity {
        id
        city
        country
        picture_url
        total_followers
        profileStatus
        following
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
          role
          date_added
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
      liked
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
export const requestRecommendation = /* GraphQL */ `
  mutation RequestRecommendation($input: requestRecommendationInput!) {
    requestRecommendation(input: $input) {
      id
      timeStamp
      requesterUserId
      requestedUserId
      message
    }
  }
`;
export const writeRecommendation = /* GraphQL */ `
  mutation WriteRecommendation($input: writeRecommendationInput!) {
    writeRecommendation(input: $input) {
      id
      timeStamp
      recommendedBy
      recommendationFor
      text
    }
  }
`;
export const cancelRecommendationRequest = /* GraphQL */ `
  mutation CancelRecommendationRequest(
    $input: cancelRecommendationRequestInput!
  ) {
    cancelRecommendationRequest(input: $input) {
      id
      timeStamp
      requesterUserId
      requestedUserId
      message
    }
  }
`;
export const deleteRecommendation = /* GraphQL */ `
  mutation DeleteRecommendation($input: deleteRecommendationInput!) {
    deleteRecommendation(input: $input) {
      id
      timeStamp
      recommendedBy
      recommendationFor
      text
    }
  }
`;
