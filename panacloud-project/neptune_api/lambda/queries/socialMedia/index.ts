
import * as gremlin from "gremlin";
import {GetEntityFollowersInput,GetEntityFollowingsInput,GetEntityPostsInput,GetPostCommentsInput,GetEntityNewsFeedInput,FetchNewsFeedSideMenuInput} from '../../graphqlSchemaTypes';

import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
const identityVerifier = require('/opt/cognitoAuthentication')

const { edge, vertex } = hackolade_graphdb


const __ = gremlin.process.statics;
const id = gremlin.process.t.id;
const single = gremlin.process.cardinality.single;
const desc = gremlin.process.order.desc


export const getEntityFollowers = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetEntityFollowersInput, cognitoUsername: string) => {

    const { entityId, pageNumber, pageSize } = data

  
    const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `the page number starts from 1`
  
  
  
    if (!entityId || !pageSize ||! pageNumber) {
      throw new Error(errorString1)
    }


    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    if (pageNumber < 1) {

        throw new Error(errorString3)

    }



    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;


    const count = await g.V(entityId).in_(edge.follows.L).count().next()

    const entities = await g.V(entityId).in_(edge.follows.L).range(offset, pageNumber * limit).choose(__.hasLabel(vertex.user.L),

        __.project("__typename", "id", "firstName","lastName", 'city', 'country', "picture_url", "total_followers", 'profileStatus')
            .by(__.constant('userShowcaseProfileInfo'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.in_(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
        ,
        __.project("__typename", "id", "name", 'city', 'country', "picture_url", "owner", "total_followers", "profileStatus")
            .by(__.constant('companyShowcaseProfileInfo'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.in_(edge.OWNER.L).project("id", "firstName","lastName", "picture_url")
                .by(id)
                .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant("")))
            )
            .by(__.in_(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))

    ).toList()


    return { count: count.value, entities: entities }

};






export const getEntityFollowings = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetEntityFollowingsInput, cognitoUsername: string) => {

    const { entityId, pageNumber, pageSize } = data

     
    const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `the page number starts from 1`
  
  
  
    if (!entityId || !pageSize ||! pageNumber) {
      throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }



    if (pageNumber < 1) {

        throw new Error(errorString3)

    }



    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;


    const count = await g.V(entityId).out(edge.follows.L).count().next()

    const entities = await g.V(entityId).out(edge.follows.L).range(offset, pageNumber * limit).choose(__.hasLabel(vertex.user.L),

        __.project("__typename", "id", "firstName","lastName", 'city', 'country',"picture_url", "total_followers", 'profileStatus')
            .by(__.constant('userShowcaseProfileInfo'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.in_(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
        ,
        __.project("__typename", "id", "name", 'city', 'country', "picture_url", "owner", "total_followers", "profileStatus")
            .by(__.constant('companyShowcaseProfileInfo'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.in_(edge.OWNER.L).project("id", "firstName","lastName", "picture_url")
                .by(id)
                .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant("")))
            )
            .by(__.in_(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))

    ).toList()

    return { count: count.value, entities: entities }

};



export const getEntityPosts = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetEntityPostsInput, cognitoUsername: string) => {

    const { entityId, pageNumber, pageSize } = data


    const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `the page number starts from 1`
  
  
  
    if (!entityId || !pageSize ||! pageNumber) {
      throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    if (pageNumber < 1) {

        throw new Error(errorString3)

    }



    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;


    const count = await g.V(entityId).out(edge.posts.L).count().next()

    const posts = await g.V(entityId).out(edge.posts.L).order().by(__.inE(edge.posts.L).values(edge.posts.prop.timeStamp.N), desc).range(offset, pageNumber * limit).project("id", "createdAt", "by", "imageUrl", "text", "numOfLikes", "totalComments", "latestComments")
        .by(id)
        .by(__.inE(edge.posts.L).values(edge.posts.prop.timeStamp.N))
        .by(__.in_(edge.posts.L)
        .choose(__.hasLabel(vertex.user.L)

        , __.project("__typename", "id", "firstName", "lastName", "picture_url")
            .by(__.constant('userIdentifier'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

        , __.project("__typename", "id", "name", "picture_url")
            .by(__.constant('companyIdentifier'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

    )
        )
        .by(__.values(vertex.socialMediaPost.prop.image_url.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.socialMediaPost.prop.text.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.out(edge.liked_by.L).count())
        .by(__.out(edge.has.L).hasLabel(vertex.comment.L).count())
        .by(__.out(edge.has.L).order().by(__.outE(edge.commented_by.L).values(edge.commented_by.prop.timeStamp.N), desc).range(0, 2)
            .project('id', 'text', 'createdAt', 'postId', 'by')
            .by(id)
            .by(__.values(vertex.comment.prop.text.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.outE(edge.commented_by.L).values(edge.commented_by.prop.timeStamp.N))
            .by(__.in_(edge.has.L).id())
            .by(__.out(edge.commented_by.L)
            .choose(__.hasLabel(vertex.user.L)

            , __.project("__typename", "id", "firstName", "lastName", "picture_url")
                .by(__.constant('userIdentifier'))
                .by(id)
                .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

            , __.project("__typename", "id", "name", "picture_url")
                .by(__.constant('companyIdentifier'))
                .by(id)
                .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

        )
            ).fold()

        ).toList()


    return { count: count.value, posts: posts }

};


export const getPostComments = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetPostCommentsInput) => {

    const { postId, pageSize, pageNumber } = data

    
    const errorString1 = `inputs "postId", "pageSize" and "pageNumber" cannot be empty strings`
    const errorString2 = `the page number starts from 1`
    const errorString3 = `post not found`;
  
  
    if (!postId || !pageSize ||! pageNumber) {
      throw new Error(errorString1)
    }

   

    if (pageNumber < 1) {
        throw new Error(errorString2)

    }

    const checkPost = await g.V(postId).hasLabel(vertex.socialMediaPost.L).next();
    if (checkPost.value === null) {
        throw new Error(errorString3)
    }


    const count = await g.V(postId).out(edge.has.L).hasLabel(vertex.comment.L).count().next()

    const limit = pageSize + 2;
    const offset = ((pageNumber - 1) * limit) + 2;


    const comments = await g.V(postId).out(edge.has.L).hasLabel(vertex.comment.L).order().by(__.outE(edge.commented_by.L).values(edge.commented_by.prop.timeStamp.N), desc).range(offset, pageNumber * limit)
        .project('id', 'text', 'createdAt', 'postId', 'by')
        .by(id)
        .by(__.values(vertex.comment.prop.text.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.outE(edge.commented_by.L).values(edge.commented_by.prop.timeStamp.N))
        .by(__.in_(edge.has.L).id())
        .by(__.out(edge.commented_by.L)
        .choose(__.hasLabel(vertex.user.L)

        , __.project("__typename", "id", "firstName", "lastName", "picture_url")
            .by(__.constant('userIdentifier'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

        , __.project("__typename", "id", "name", "picture_url")
            .by(__.constant('companyIdentifier'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

    )
        ).toList()


    console.log(comments)

    return { count: count.value, comments: comments }


};


export const getEntityNewsFeed = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetEntityNewsFeedInput, cognitoUsername: string) => {

    const { entityId, pageNumber, pageSize } = data

    const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `the page number starts from 1`
  
  
    if (!entityId || !pageSize ||! pageNumber) {
      throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }



    if (pageNumber < 1) {

        throw new Error(errorString3)

    }



    const count = await g.V(entityId).out(edge.follows.L).out(edge.posts.L).count().next()

    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;

    const posts = await g.V(entityId).out(edge.follows.L).out(edge.posts.L).order().by(__.inE(edge.posts.L).values(edge.posts.prop.timeStamp.N), desc).range(offset, pageNumber * limit).project("id", "createdAt", "by", "imageUrl", "text", "numOfLikes", "totalComments", "latestComments")
        .by(id)
        .by(__.inE(edge.posts.L).values(edge.posts.prop.timeStamp.N))
        .by(__.in_(edge.posts.L)
        .choose(__.hasLabel(vertex.user.L)

        , __.project("__typename", "id", "firstName", "lastName", "picture_url")
            .by(__.constant('userIdentifier'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

        , __.project("__typename", "id", "name", "picture_url")
            .by(__.constant('companyIdentifier'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

    )
        )
        .by(__.values(vertex.socialMediaPost.prop.image_url.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.socialMediaPost.prop.text.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.out(edge.liked_by.L).count())
        .by(__.out(edge.has.L).hasLabel(vertex.comment.L).count())
        .by(__.out(edge.has.L).order().by(__.outE(edge.commented_by.L).values(edge.commented_by.prop.timeStamp.N), desc).range(0, 2)
            .project('id', 'text', 'createdAt', 'postId', 'by')
            .by(id)
            .by(__.values(vertex.comment.prop.text.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.outE(edge.commented_by.L).values(edge.commented_by.prop.timeStamp.N))
            .by(__.in_(edge.has.L).id())
            .by(__.out(edge.commented_by.L)
            .choose(__.hasLabel(vertex.user.L)

            , __.project("__typename", "id", "firstName", "lastName", "picture_url")
                .by(__.constant('userIdentifier'))
                .by(id)
                .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    
            , __.project("__typename", "id", "name", "picture_url")
                .by(__.constant('companyIdentifier'))
                .by(id)
                .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
                .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    
        )
            ).fold()

        ).toList()

    console.log(posts)

    return { count: count.value, posts: posts }
};





export const getNewsFeedSideMenu = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchNewsFeedSideMenuInput, cognitoUsername: string) => {

    const { entityId} = data

    const errorString1 = `input "entityId" cannot be an empty string`
    const errorString2 = "an invalid error occured"
  
  
    if (!entityId) {
      throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    const output = await g.V(entityId).project('followers','following','companies','my_apis','subscribed_apis')
    .by(__.in_(edge.follows.L).count())
    .by(__.out(edge.follows.L).count())
    .by(__.out(edge.OWNER.L, edge.OTHER_EMPLOYEE.L, edge.DEVELOPER.L).count())
    .by(__.out(edge.creates.L).count())
    .by(__.out(edge.subscribes.L).out(edge.subscription_for.L).where(__.in_(edge.creates.L).not(__.hasId(entityId))).count()).next()

    console.log(output.value)

    return output.value

}