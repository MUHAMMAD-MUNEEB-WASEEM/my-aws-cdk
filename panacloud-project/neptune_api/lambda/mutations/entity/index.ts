import * as gremlin from 'gremlin';
import { v4 as uuidv4 } from 'uuid';
const identityVerifier = require('/opt/cognitoAuthentication')
import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
import { UpdateUserInput,CreateCompanyInput,UpdateCompanyInfoInput,AddUserToCompanyInput, UpdateProfilePictureInput,ChangeEntityProfileStatusInput} from '../../graphqlSchemaTypes';

const { edge, vertex } = hackolade_graphdb
const __ = gremlin.process.statics
const id = gremlin.process.t.id
const single = gremlin.process.cardinality.single


export async function updateUser(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UpdateUserInput, cognitoUsername: string) {

    let { userId, firstName, lastName, headline, city, country, phone_number } = data;



    const errorString1 = `input "userId" cannot be empty an string`
    const errorString2 = "an invalid error occured"
 


    if (!userId){
        throw new Error(errorString1)
    }

    const confirmUser = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


    if (!confirmUser) {

        throw new Error(errorString2)

    }


    let updateUser = g.V(userId)


    if (firstName) {
        updateUser.property(single, vertex.user.prop.firstName.N, firstName)
    }
    if (lastName) {
        updateUser.property(single, vertex.user.prop.lastName.N, lastName)
    }
    if (headline) {
        updateUser.property(single, vertex.user.prop.headline.N, headline)
    }
    if (city) {
        updateUser.property(single, vertex.user.prop.city.N, city)
    }
    if (country) {
        updateUser.property(single, vertex.user.prop.country.N, country)
    }
    if (phone_number) {
        updateUser.property(single, vertex.user.prop.phoneNumber.N, phone_number)
    }



    const result = await updateUser
        .project("id", "firstName", "lastName", "email", "city", "country", "phone_number", "headline")
        .by(id)
        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant('')))
        .next();

    console.log("getUpdateUser", result)

    return result.value

}



export async function createCompany(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CreateCompanyInput, cognitoUsername: string) {

    const { name, email, city, country, phone_number, owner } = data;


    const errorString1 = `inputs "name","email","city","country",""phone_number","owner" cannot be empty strings`
    const errorString2 = "an invalid error occured"
 


    if (!name || !email || !city || !country || !phone_number || !owner){
        throw new Error(errorString1)
    }


    const confirmEntity = await identityVerifier.confirmUserFromCognito(g, owner, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }

    const secretText = uuidv4();
    const timeStamp = Date.now()


    const profile_status = await g.V(vertex.profileStatus.prop.id.V.profileStatusUnpublished).fold().coalesce(__.unfold(),
        g.addV(vertex.profileStatus.L)
            .property(id, vertex.profileStatus.prop.id.V.profileStatusUnpublished)
            .property(vertex.profileStatus.prop.name.N, vertex.profileStatus.prop.name.V.UNPUBLISHED)
    ).next()

    const output = await
        g.addV(vertex.company.L).property(vertex.company.prop.name.N, name).property(vertex.company.prop.email.N, email).property(vertex.company.prop.city.N, city).property(vertex.company.prop.country.N, country).property(vertex.company.prop.phoneNumber.N, phone_number).property(vertex.company.prop.secretText.N, secretText).as('company')
            .addE(edge.OWNER.L).from_(__.V(owner)).to('company').property(edge.OWNER.prop.timeStamp.N, timeStamp)
            .addE(edge.has_status.L).from_('company').to(profile_status.value)
            .select('company').project('id', 'name', 'city', 'country', 'email', 'phone_number','headline')
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.company.prop.headline.N).fold().coalesce(__.unfold(), __.constant('')))

            .next();

    console.log(output)

    return output.value


}

export async function updateCompanyInfo(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data:UpdateCompanyInfoInput , cognitoUsername: string) {
  
    const { companyId, name, email, city, country, phone_number,headline } = data;


    const errorString1 = `input "companyId" cannot be empty an string`
    const errorString2 = "an invalid error occured"
 


    if (!companyId){
        throw new Error(errorString1)
    }


    const confirmEntity = await identityVerifier.confirmCompanyAccessFromCognito(g, companyId, cognitoUsername, true)

    if (!confirmEntity) {
        throw new Error(errorString2)
    }

    let updateCompany = g.V(companyId)


    if (name) {
        updateCompany.property(single, vertex.company.prop.name.N, name)
    }
    if (email) {
        updateCompany.property(single, vertex.company.prop.email.N, email)
    }
    if (city) {
        updateCompany.property(single, vertex.company.prop.city.N, city)
    }
    if (country) {
        updateCompany.property(single, vertex.company.prop.country.N, country)
    }
    if (phone_number) {
        updateCompany.property(single, vertex.company.prop.phoneNumber.N, phone_number)
    }
    if (headline) {
        updateCompany.property(single, vertex.company.prop.headline.N, headline)
    }


    const output: any = await updateCompany.project('id', 'name', 'city', 'country', 'email', 'phone_number','headline')
        .by(id)
        .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.company.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.company.prop.headline.N).fold().coalesce(__.unfold(), __.constant('')))

        .next();


    return output.value



}


export async function addUserToCompany(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: AddUserToCompanyInput, cognitoUsername: string) {

    const { userId, companyId, role } = data;

    const errorString1 = `inputs "userId" and"companyId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `user is already in the company`;
    const errorString4 = 'user not found';

 


    if (!userId || !companyId){
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmCompanyAccessFromCognito(g, companyId, cognitoUsername, true)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    const errorHandling = await g.V(userId).hasLabel(vertex.user.L).fold().coalesce(__.unfold().choose(__.out(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).hasId(companyId), __.constant(errorString3))

        , __.constant(errorString4)).next()

    if (errorHandling.value === errorString3) {
        throw new Error(errorString3)
    }


    if (errorHandling.value === errorString4) {
        throw new Error(errorString4)
    }

    const timeStamp = Date.now()

    const output: any = await g.addE(role).from_(__.V(userId)).to(__.V(companyId)).property(edge.DEVELOPER.prop.timeStamp.N, timeStamp).outV()
    .project('id', 'firstName','lastName', 'city', 'country', 'picture_url', 'company_relation_info', 'total_followers', 'profileStatus')
        .by(id)
        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.project('role','date_added')
        .by(__.outE(role).where(__.inV().hasId(companyId)).label())
        .by(__.outE(role).where(__.inV().hasId(companyId)).values(edge[role].prop.timeStamp.N))   
   )
        .by(__.inE(edge.follows.L).count())
        .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))

        .next()


    console.log(output.value)

    return output.value

}





export async function updateProfilePicture(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UpdateProfilePictureInput, cognitoUsername: string) {

    const { entityId, picture_url } = data;


    const errorString1 = `inputs "entityId" and "picture_url" cannot be empty strings`
    const errorString2 = "an invalid error occured"
 


    if (!entityId || !picture_url){
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, true)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }

    const output: any = await g.V(entityId).property(single, vertex.user.prop.pictureUrl.N, picture_url)
        .project('id', 'picture_url')
        .by(id)
        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .next()


    console.log(output.value)



    return output.value
}




export async function changeEntityProfileStatus(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: ChangeEntityProfileStatusInput, cognitoUsername: string) {

    const { entityId, status } = data;


    const errorString1 = `input "entityId" cannot be an empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `Entity is already ${status}`;
    const errorString4 = `Please enter all the required information before publishing the profile`
 


    if (!entityId ){
       throw new Error(errorString1)
    }
    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, true)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    let profileStatusVertexId;

    profileStatusVertexId = status === vertex.profileStatus.prop.name.V.PUBLISHED ? vertex.profileStatus.prop.id.V.profileStatusPublished : vertex.profileStatus.prop.id.V.profileStatusUnpublished;



    const errorHandling = await g.V(entityId).choose(__.out(edge.has_status.L).hasId(profileStatusVertexId), __.constant(errorString3)
        ,__.choose(__.hasLabel(vertex.user.L),
        __.project('firstName','lastName', 'email', 'city', 'country')
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
            .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))

        ,
        __.project('name', 'email', 'city', 'country')
         .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
          .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant('')))
          .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
          .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))

        
        
        ) 
    ).next()



    if (errorHandling.value == errorString3) {
        throw new Error(errorString3)
    }

    if (status === vertex.profileStatus.prop.name.V.PUBLISHED) {
        const requiredProfileInputs = Object.keys(errorHandling.value)

        for (let i = 0; i < requiredProfileInputs.length; i++) {

            if (!errorHandling.value[requiredProfileInputs[i]] ) {
                throw new Error(`${errorString4}. Missing **${requiredProfileInputs[i]}**`)
            }
        }

    }

    const timeStamp = Date.now()


    const profile_status = await g.V(profileStatusVertexId)
        .fold()
        .coalesce(__.unfold(),
            g.addV(vertex.profileStatus.L)
                .property(id, profileStatusVertexId)
                .property(vertex.profileStatus.prop.name.N, status)
        ).next();

    const output = await g.V(entityId).sideEffect(__.outE(edge.has_status.L).drop()).addE(edge.has_status.L).from_(g.V(entityId)).to(g.V(profileStatusVertexId)).property(edge.has_status.prop.timeStamp.N, timeStamp).V(entityId)
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
                        .project('id', "firstName","lastName", "picture_url")
                        .by(id)
                        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

                )
                .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
                .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N)),



            __.project("__typename", 'id', "firstName","lastName", 'city', 'country', "picture_url", "total_followers", "profileStatus")
                .by(__.constant('userShowcaseProfileInfo'))
                .by(id)
                 .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                 .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
                .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
                .by(__.out(edge.has_status.L).hasLabel(vertex.profileStatus.L).values(vertex.profileStatus.prop.name.N))

        )
        .next();

    console.log("output", output);



    return output.value;

}












