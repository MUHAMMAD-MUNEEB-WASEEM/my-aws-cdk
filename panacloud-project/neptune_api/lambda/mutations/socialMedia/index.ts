
import * as gremlin from "gremlin";
const identityVerifier = require('/opt/cognitoAuthentication')
import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
import { FollowEntityInput, UnFollowEntityInput, SocialMediaPostInput,CommentOnSocialMediaPostInput,LikeOnSocialMediaPostInput,ReactionType } from '../../graphqlSchemaTypes';


const { edge, vertex } = hackolade_graphdb
const __ = gremlin.process.statics;
const id = gremlin.process.t.id;
const single = gremlin.process.cardinality.single;
const desc = gremlin.process.order.desc

export const followEntity = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FollowEntityInput, cognitoUsername: string) => {

    const { entityId, followEntityId } = data


    const errorString1 = `inputs "entityId" and "followEntityId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "Entity to be followed not found"
    const errorString4 = "This entity is already being followed"
    const errorString5 = "Entity cannot follow themselves"


    if (!entityId || !followEntityId) {
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }

    if (entityId === followEntityId) {
        throw new Error(errorString5)
    }

    const errorHandling = await g.V(followEntityId).hasLabel(vertex.company.L, vertex.user.L).fold().coalesce(__.unfold().choose(__.inE(edge.follows.L).where(__.outV().hasId(entityId)), __.constant(errorString4))
        , __.constant(errorString3)).next()



    if (errorHandling.value === errorString3) {
        throw new Error(errorString3)
    }

    if (errorHandling.value === errorString4) {
        throw new Error(errorString4)
    }

    const timeStamp = Date.now()



    const followEntity = await g.addE(edge.follows.L).from_(g.V(entityId)).to(g.V(followEntityId)).property(edge.follows.prop.timeStamp.N, timeStamp)
        .V(followEntityId).choose(
            __.hasLabel(vertex.company.L),

            __.project("__typename", 'id', "name", 'city', 'country', "picture_url", "owner", "total_followers", "profileStatus")
                .by(__.constant('companyShowcaseProfileInfo'))
                .by(id)
                .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(
                    __.in_(edge.OWNER.L)
                        .project('id', "firstName", "lastName", "picture_url")
                        .by(id)
                        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

                )
                .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
                .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N)),



            __.project("__typename", 'id', "firstName", "lastName", 'city', 'country', "picture_url", "total_followers", "profileStatus")
                .by(__.constant('userShowcaseProfileInCompany'))
                .by(id)
                .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
                .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N))

        )
        .next()



    const entity = await g.V(entityId).choose(
        __.hasLabel(vertex.company.L),

        __.project("__typename", 'id', "name", 'city', 'country', "picture_url", "owner", "total_followers", "profileStatus")
            .by(__.constant('companyShowcaseProfileInfo'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(
                __.in_(edge.OWNER.L)
                    .project('id', "firstName", "lastName", "picture_url")
                    .by(id)
                    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

            )
            .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
            .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N)),



        __.project("__typename", 'id', "firstName", "lastName", 'city', 'country', "picture_url", "total_followers", "profileStatus")
            .by(__.constant('userShowcaseProfileInCompany'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
            .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N))

    ).next()

    console.log("followData ==== ", entity)

    const output = { entity: entity.value, followEntity: followEntity.value }

    return output

};





export const unFollowEntity = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UnFollowEntityInput, cognitoUsername: string) => {

    const { entityId, unFollowEntityId } = data

    const errorString1 = `inputs "entityId" and "unFollowEntityId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "Entity to be unfollowed not found"
    const errorString4 = "This entity is already unfollowed"
    const errorString5 = "Entity cannot unfollow themselves"



    if (!entityId || !unFollowEntityId) {
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    if (entityId === unFollowEntityId) {
        throw new Error(errorString5)
    }

    const errorHandling = await g.V(unFollowEntityId).hasLabel(vertex.company.L, vertex.user.L).fold().coalesce(__.unfold().choose(__.inE(edge.follows.L).where(__.outV().hasId(entityId)), __.unfold(), __.constant(errorString4))
        , __.constant(errorString3)).next()

    if (errorHandling.value === errorString3) {
        throw new Error(errorString3)
    }

    if (errorHandling.value === errorString4) {
        throw new Error(errorString4)
    }



    const entity = await g.V(entityId).sideEffect(__.outE(edge.follows.L).where(__.inV().hasId(unFollowEntityId)).drop())
        .choose(
            __.hasLabel(vertex.company.L),

            __.project("__typename", 'id', "name", 'city', 'country', "picture_url", "owner", "total_followers", "profileStatus")
                .by(__.constant('companyShowcaseProfileInfo'))
                .by(id)
                .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(
                    __.in_(edge.OWNER.L)
                        .project('id', "firstName", "lastName", "picture_url")
                        .by(id)
                        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

                )
                .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
                .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N)),



            __.project("__typename", 'id', "firstName", "lastName", 'city', 'country', "picture_url", "total_followers", "profileStatus")
                .by(__.constant('userShowcaseProfileInCompany'))
                .by(id)
                .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
                .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N))

        ).next()



    const unFollowEntity = await g.V(unFollowEntityId).choose(
        __.hasLabel(vertex.company.L),

        __.project("__typename", 'id', "name", 'city', 'country', "picture_url", "owner", "total_followers", "profileStatus")
            .by(__.constant('companyShowcaseProfileInfo'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(
                __.in_(edge.OWNER.L)
                    .project('id', "firstName", "lastName", "picture_url")
                    .by(id)
                    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

            )
            .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
            .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N)),



        __.project("__typename", 'id', "firstName", "lastName", 'city', 'country', "picture_url", "total_followers", "profileStatus")
            .by(__.constant('userShowcaseProfileInCompany'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
            .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N))

    ).next()


    console.log("followData ==== ", entity)

    const output = { entity: entity.value, unFollowEntity: unFollowEntity.value }

    return output

};



export const publishSocialMediaPost = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: SocialMediaPostInput, cognitoUsername: string) => {


    const { by, text, imageUrl } = data

    const errorString1 = `input "by" cannot be an empty string`
    const errorString2 = "an invalid error occured"

    if (!by) {
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, by, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }

    const timeStamp = Date.now()


    const socialMediaPost = g
        .addV(vertex.socialMediaPost.L)
        .addE(edge.posts.L)
        .from_(g.V(by)).property(edge.posts.prop.timeStamp.N, timeStamp)
        .inV()


    imageUrl && socialMediaPost.property(vertex.socialMediaPost.prop.image_url.N, imageUrl)
    text && socialMediaPost.property(vertex.socialMediaPost.prop.text.N, text)


    const result = await socialMediaPost
        .project("id", "createdAt", "by", "imageUrl", "text", "numOfLikes", 'totalComments', "latestComments")
        .by(id)
        .by(__.inE(edge.posts.L).values(edge.posts.prop.timeStamp.N))
        .by(__.in_(edge.posts.L).choose(__.hasLabel(vertex.user.L)

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
            .by(__.out(edge.has.L).id())
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

        )
        .next()

    console.log("result ============ ", result)

    return result.value

};



export const commentOnSocialMediaPost = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CommentOnSocialMediaPostInput, cognitoUsername: string) => {


    const { by, text, postId } = data

    const errorString1 = `inputs "by", "text" and "postId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'post not found'

    if (!by || !text || !postId) {
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, by, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    const errorHandling = await g.V(postId).hasLabel(vertex.socialMediaPost.L).next()

    if (errorHandling.value === null) {
        throw new Error(errorString3)
    }



    const timeStamp = Date.now()


    const result = await g.addV(vertex.comment.L)
        .property(vertex.comment.prop.text.N, text)
        .addE(edge.commented_by.L)
        .to(__.V(by)).property(edge.commented_by.prop.timeStamp.N, timeStamp)
        .outV()
        .addE(edge.has.L)
        .from_(__.V(postId))
        .inV()

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
        ).next()

    console.log("result=====", result)

    return result.value

};




export const likeOnSocialMediaPost = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: LikeOnSocialMediaPostInput, cognitoUsername: string) => {


    const { by, postId } = data

    
    const errorString1 = `inputs "by" and "postId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'post not found'


    if (!by) {
        throw new Error(errorString1)
    }


    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, by, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }



    const errorHandling = await g.V(postId).hasLabel(vertex.socialMediaPost.L).next()


    if (errorHandling.value === null) {
        throw new Error(errorString3)
    }




    const result = await g.V(postId).choose(__.out(edge.liked_by.L).hasId(by)
        , __.sideEffect(__.V(postId).outE(edge.liked_by.L).where(__.inV().hasId(by)).drop())
            .project('postId', 'by', 'reaction')
            .by(id)
            .by(__.V(by)
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
            .by(__.constant(ReactionType.None))
        , __.addE(edge.liked_by.L).to(__.V(by)).outV().hasId(postId)
            .project('postId', 'by', 'reaction')
            .by(id)
            .by(__.out(edge.liked_by.L).hasId(by)
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
            .by(__.constant(ReactionType.Liked))
    ).next()


    console.log(result)
    return result.value


};



