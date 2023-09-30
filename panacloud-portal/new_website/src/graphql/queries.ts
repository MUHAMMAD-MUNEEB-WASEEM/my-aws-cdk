/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchMyApiTestingSubscriptions = /* GraphQL */ `
  query FetchMyApiTestingSubscriptions(
    $input: fetchMyApiTestingSubscriptionInput!
  ) {
    fetchMyApiTestingSubscriptions(input: $input) {
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
export const fetchMyUnderDevelopmentApis = /* GraphQL */ `
  query FetchMyUnderDevelopmentApis($input: fetchMyUnderDevelopmentApisInput!) {
    fetchMyUnderDevelopmentApis(input: $input) {
      apis {
        apiId
        title
        shortDescription
        apiType
        imageUrl
        status
        numOfSubscribers
        apiKind
        subscribed
      }
      count
    }
  }
`;
export const fetchMyPublicApis = /* GraphQL */ `
  query FetchMyPublicApis($input: fetchMyPublicApisInput!) {
    fetchMyPublicApis(input: $input) {
      apis {
        apiId
        title
        shortDescription
        apiType
        imageUrl
        status
        numOfSubscribers
        apiKind
        subscribed
      }
      count
    }
  }
`;
export const fetchMyPrivateApis = /* GraphQL */ `
  query FetchMyPrivateApis($input: fetchMyPrivateApisInput!) {
    fetchMyPrivateApis(input: $input) {
      apis {
        apiId
        title
        shortDescription
        apiType
        imageUrl
        status
        numOfSubscribers
        apiKind
        subscribed
      }
      count
    }
  }
`;
export const fetchMySubscribedApis = /* GraphQL */ `
  query FetchMySubscribedApis($input: fetchMySubscribedApisInput!) {
    fetchMySubscribedApis(input: $input) {
      apis {
        apiId
        title
        shortDescription
        apiType
        imageUrl
        status
        numOfSubscribers
        apiKind
        subscribed
      }
      count
    }
  }
`;
export const fetchMyApiSubscription = /* GraphQL */ `
  query FetchMyApiSubscription($input: fetchMyApiSubscriptionInput!) {
    fetchMyApiSubscription(input: $input) {
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
export const fetchMyApiToken = /* GraphQL */ `
  query FetchMyApiToken($input: fetchMyApiTokenInput!) {
    fetchMyApiToken(input: $input) {
      api_token
      apiId
      entityId
    }
  }
`;
export const fetchAllPublicApis = /* GraphQL */ `
  query FetchAllPublicApis($input: fetchAllPublicApisInput) {
    fetchAllPublicApis(input: $input) {
      apis {
        apiId
        title
        shortDescription
        apiType
        imageUrl
        status
        numOfSubscribers
        apiKind
        subscribed
      }
      count
    }
  }
`;
export const fetchMyCompanies = /* GraphQL */ `
  query FetchMyCompanies($input: fetchMyCompaniesInput!) {
    fetchMyCompanies(input: $input) {
      companies {
        id
        name
        city
        country
        picture_url
        total_followers
        profileStatus
        following
      }
      count
    }
  }
`;
export const fetchApiInfo = /* GraphQL */ `
  query FetchApiInfo($input: fetchApiInfoInput!) {
    fetchApiInfo(input: $input) {
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
      longDescription
      apiType
      imageUrl
      status
      numOfSubscribers
      creationDate
      apiKind
      subscribed
      ... on graphQlApiFullInfo {
        apiUrl
        graphQlSchema
      }
      ... on openApiFullInfo {
        apiRootUrl
        openApiDef
      }
    }
  }
`;
export const fetchApiReviews = /* GraphQL */ `
  query FetchApiReviews($input: fetchApiReviewsInput!) {
    fetchApiReviews(input: $input) {
      count
      reviews {
        reviewId
        apiId
        title
        text
        stars
        dateCreated
      }
    }
  }
`;
export const getEntityFollowers = /* GraphQL */ `
  query GetEntityFollowers($input: getEntityFollowersInput!) {
    getEntityFollowers(input: $input) {
      entities {
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
      count
    }
  }
`;
export const getEntityFollowings = /* GraphQL */ `
  query GetEntityFollowings($input: getEntityFollowingsInput!) {
    getEntityFollowings(input: $input) {
      entities {
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
      count
    }
  }
`;
export const getEntityPosts = /* GraphQL */ `
  query GetEntityPosts($input: getEntityPostsInput!) {
    getEntityPosts(input: $input) {
      posts {
        id
        createdAt
        imageUrl
        text
        numOfLikes
        totalComments
        liked
      }
      count
    }
  }
`;
export const getEntityProfile = /* GraphQL */ `
  query GetEntityProfile($input: getEntityProfileInput!) {
    getEntityProfile(input: $input) {
      id
      city
      country
      email
      phone_number
      picture_url
      headline
      total_followers
      total_following
      profileStatus
      following
      ... on companyFullProfileInfo {
        name
        owner {
          id
          firstName
          lastName
          picture_url
        }
      }
      ... on userFullProfileInfo {
        firstName
        lastName
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
        recommendationRequestedFromUser
        recommendationRequestedByUser
        recommendedUser
        recommendedByUser
      }
    }
  }
`;
export const getPostComments = /* GraphQL */ `
  query GetPostComments($input: getPostCommentsInput!) {
    getPostComments(input: $input) {
      count
      comments {
        id
        text
        createdAt
        postId
      }
    }
  }
`;
export const getEntityNewsFeed = /* GraphQL */ `
  query GetEntityNewsFeed($input: getEntityNewsFeedInput!) {
    getEntityNewsFeed(input: $input) {
      count
      posts {
        id
        createdAt
        imageUrl
        text
        numOfLikes
        totalComments
        liked
      }
    }
  }
`;
export const getUsersList = /* GraphQL */ `
  query GetUsersList($input: getUsersListInput!) {
    getUsersList(input: $input) {
      count
      users {
        id
        firstName
        lastName
        city
        country
        picture_url
        total_followers
        profileStatus
        following
      }
    }
  }
`;
export const getPublicApisCountByType = /* GraphQL */ `
  query GetPublicApisCountByType {
    getPublicApisCountByType {
      type
      count
    }
  }
`;
export const fetchNewsFeedSideMenu = /* GraphQL */ `
  query FetchNewsFeedSideMenu($input: fetchNewsFeedSideMenuInput!) {
    fetchNewsFeedSideMenu(input: $input) {
      followers
      following
      companies
      my_apis
      subscribed_apis
    }
  }
`;
export const getUsersListInCompany = /* GraphQL */ `
  query GetUsersListInCompany($input: getUsersListInCompanyInput!) {
    getUsersListInCompany(input: $input) {
      count
      users {
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
  }
`;
export const getRecommendationRequestsByMe = /* GraphQL */ `
  query GetRecommendationRequestsByMe(
    $input: getRecommendationRequestsByMeInput!
  ) {
    getRecommendationRequestsByMe(input: $input) {
      count
      requests {
        id
        timeStamp
        requesterUserId
        requestedUserId
        message
      }
    }
  }
`;
export const getRecommendationRequestsForMe = /* GraphQL */ `
  query GetRecommendationRequestsForMe(
    $input: getRecommendationRequestsForMeInput!
  ) {
    getRecommendationRequestsForMe(input: $input) {
      count
      requests {
        id
        timeStamp
        requesterUserId
        requestedUserId
        message
      }
    }
  }
`;
export const getRecommendationsForMe = /* GraphQL */ `
  query GetRecommendationsForMe($input: getRecommendationsForMeInput!) {
    getRecommendationsForMe(input: $input) {
      count
      recommendations {
        id
        timeStamp
        recommendedBy
        recommendationFor
        text
      }
    }
  }
`;
export const getRecommendationsByMe = /* GraphQL */ `
  query GetRecommendationsByMe($input: getRecommendationsByMeInput!) {
    getRecommendationsByMe(input: $input) {
      count
      recommendations {
        id
        timeStamp
        recommendedBy
        recommendationFor
        text
      }
    }
  }
`;
