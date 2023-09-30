import { timeStamp } from 'console';
import * as gremlin from 'gremlin';
import { title } from 'process';
import { v4 as uuidv4 } from 'uuid';
const identityVerifier = require('/opt/cognitoAuthentication')
import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
import { UpdateUserInput,CreateCompanyInput,UpdateCompanyInfoInput,AddUserToCompanyInput, UpdateProfilePictureInput,ChangeEntityProfileStatusInput, RequestRecommendationInput,WriteRecommendationInput, CancelRecommendationRequestInput, DeleteRecommendationInput} from '../../graphqlSchemaTypes';

const { edge, vertex } = hackolade_graphdb
const __ = gremlin.process.statics
const id = gremlin.process.t.id
const single = gremlin.process.cardinality.single


export async function updateUser(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UpdateUserInput, cognitoUsername: string) {

    let { userId, firstName, lastName, headline, city, country, phone_number,education,workExperience } = data;



    const errorString1 = `input "userId" cannot be empty an string`
    const errorString2 = "an invalid error occured"
    const errorString3 = "You cannot add more than 10 education records"
    const errorString4 = `inputs "institute","startDate","city","country" and "degree_name" cannot be empty strings`
    const errorString5 = "You cannot add more than 15 work experience records"
    const errorString6 = `inputs "jobTitle","startDate","city","country" and "company" cannot be empty strings`



    if (!userId){
        throw new Error(errorString1)
    }

    const confirmUser = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


    if (!confirmUser) {

        throw new Error(errorString2)

    }

    if (education){
        if (education.length > 10){

            throw new Error(errorString3)

        }
    
    for (let edu of education){
        if (!edu!.institute || !edu!.startDate || !edu!.degree_name || !edu!.city || !edu!.country ){

            throw new Error(errorString4)

        }
    }

    }


    
    if (workExperience){
        if (workExperience.length > 15){

            throw new Error(errorString5)

        }
    
    for (let exp of workExperience){
        if (!exp!.jobTitle || !exp!.company || !exp!.city || !exp!.country || !exp!.startDate ){

            throw new Error(errorString6)

        }
    }

    }


    let updateUser = g.V(userId)

    if (education){


    const dropOldEducationVertices = g.V(userId).out('has_education').drop().next()
    
    for (let edu of education){
       
        const createEducationVertex =  g.addV('education')
        .property('startDate',edu!.startDate)
        .property('city',edu!.city)
        .property('country',edu!.country)
        .property('institute',edu!.institute)
        .property('completed',edu!.completed)
        .property('degree_name',edu!.degree_name)
        .property('education_level',edu!.education_level)
        .property('field_of_study',edu!.field_of_study)

    
    edu?.endDate && createEducationVertex.property('endDate',edu.endDate)
    edu?.grade && createEducationVertex.property('grade',edu.grade)


    const res = await createEducationVertex.next()

    updateUser.addE('has_education').to(res.value).outV()

    }
    
    }


    if (workExperience){


        const dropOldWorkExperienceVertices = g.V(userId).out('has_workExperience').drop().next()
        
        for (let exp of workExperience){
           
            const createWorkExperienceVertex =  g.addV('workExperience')
            .property('startDate',exp!.startDate)
            .property('city',exp!.city)
            .property('country',exp!.country)
            .property('company',exp!.company)
            .property('currentlyWorking',exp!.currentlyWorking)
            .property('jobTitle',exp!.jobTitle)
            .property('employmentType',exp!.employmentType)
    
        
        exp?.endDate && createWorkExperienceVertex.property('endDate',exp.endDate)
    
    
        const res = await createWorkExperienceVertex.next()
    
        updateUser.addE('has_workExperience').to(res.value).outV()
    
        }
        
        }





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
        .project("id", "firstName", "lastName", "email", "city", "country", "phone_number", "headline","education","workExperience")
        .by(id)
        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.out('has_education')
        .project("startDate","endDate","city","country","institute","completed","degree_name","education_level","field_of_study","grade")
        .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('institute').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('completed').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('degree_name').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('education_level').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('field_of_study').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('grade').fold().coalesce(__.unfold(), __.constant(''))).fold()

        )
        .by(__.out('has_workExperience')
        .project("startDate","endDate","city","country","company","currentlyWorking","jobTitle","employmentType")
        .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('company').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('currentlyWorking').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('jobTitle').fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values('employmentType').fold().coalesce(__.unfold(), __.constant(''))).fold()

        )

        .next();

    console.log("getUpdateUser", result)

    return result.value

}



export async function createCompany(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CreateCompanyInput, cognitoUsername: string) {

    const { name, email, city, country, phone_number, owner,companyId } = data;


    const errorString1 = `inputs "name","email","city","country",""phone_number","owner" and "companyId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "company id not available"


    if (!name || !email || !city || !country || !phone_number || !owner || !companyId){
        throw new Error(errorString1)
    }


    const confirmEntity = await identityVerifier.confirmUserFromCognito(g, owner, cognitoUsername, false)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }

    const checkCompanyId = await g.V(companyId).next()

    if (checkCompanyId.value !== null){

        throw new Error(errorString3)
    }

    const secretText = uuidv4();
    const timeStamp = Date.now()


    const profile_status = await g.V(vertex.profileStatus.prop.id.V.profileStatusUnpublished).fold().coalesce(__.unfold(),
        g.addV(vertex.profileStatus.L)
            .property(id, vertex.profileStatus.prop.id.V.profileStatusUnpublished)
            .property(vertex.profileStatus.prop.name.N, vertex.profileStatus.prop.name.V.UNPUBLISHED)
    ).next()

    const output = await
        g.addV(vertex.company.L).property(id,companyId).property(vertex.company.prop.name.N, name).property(vertex.company.prop.email.N, email).property(vertex.company.prop.city.N, city).property(vertex.company.prop.country.N, country).property(vertex.company.prop.phoneNumber.N, phone_number).property(vertex.company.prop.secretText.N, secretText).as('company')
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
    const errorString5 = `user's profile is not published`;

 


    if (!userId || !companyId){
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmCompanyAccessFromCognito(g, companyId, cognitoUsername, true)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    const errorHandling = await g.V(userId).hasLabel(vertex.user.L).fold()
    .coalesce(__.unfold()
    .choose(__.out(edge.has_status.L).hasId(vertex.profileStatus.prop.id.V.profileStatusPublished)
    ,__.choose(__.out(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).hasId(companyId)
    , __.constant(errorString3))
    , __.constant(errorString5))
    , __.constant(errorString4))
    .next()

    if (errorHandling.value === errorString3) {
        throw new Error(errorString3)
    }


    if (errorHandling.value === errorString4) {
        throw new Error(errorString4)
    }


    if (errorHandling.value === errorString5) {
        throw new Error(errorString5)
    }

     

    

    const timeStamp = Date.now()

    const output: any = await g.addE(role).from_(__.V(userId)).to(__.V(companyId)).property(edge.DEVELOPER.prop.timeStamp.N, timeStamp).outV()
    .project('id', 'firstName','lastName', 'city', 'country', 'picture_url',"role", "date_added", 'total_followers', 'profileStatus')
        .by(id)
        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.outE(edge.OTHER_EMPLOYEE.L, edge.DEVELOPER.L).where(__.inV().hasId(companyId)).label())
        .by(__.outE(edge.OTHER_EMPLOYEE.L, edge.DEVELOPER.L).where(__.inV().hasId(companyId)).values(edge.DEVELOPER.prop.timeStamp.N))
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





export async function requestRecommendation(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: RequestRecommendationInput, cognitoUsername: string) {

    let { requestedUserId,requesterUserId,message } = data;



    const errorString1 = `inputs "requesterUserId" and "requestedUserId cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "requested user id not found"
    const errorString4 = "users cannot request recommendations from themeselves"
    const errorString5 = "the user has already requested a recommendation from this user"
    const errorString6 = "the user has already recieved a recommendation from this user"



    if (!requestedUserId || !requesterUserId){
        throw new Error(errorString1)
    }

    const confirmUser = await identityVerifier.confirmUserFromCognito(g, requesterUserId, cognitoUsername, false)


    if (!confirmUser) {

        throw new Error(errorString2)

    }

    if (requesterUserId === requestedUserId){
        throw new Error(errorString4)

    }


    const errorHandling = await g.V(requestedUserId).hasLabel(vertex.user.L).fold().
    coalesce(__.unfold().choose(__.in_('requestsRecommendation').hasId(requesterUserId)
    ,__.constant(errorString5)
    ,__.choose(__.out('recommends').hasId(requesterUserId),__.constant(errorString6))
    )
    ,__.constant(errorString3)).next()

    if (errorHandling.value === errorString3 ){
        throw new Error(errorString3)

    }

    if (errorHandling.value === errorString5 ){
        throw new Error(errorString5)

    }

    if (errorHandling.value === errorString6 ){
        throw new Error(errorString6)

    }

    const timeStamp = Date.now()


    const result = await g.V(requesterUserId).addE('requestsRecommendation').to(__.V(requestedUserId)).property('timeStamp',timeStamp).property('message',message)
    .project("id", "timeStamp","requesterUserId","requestedUserId","message")
    .by(id)
    .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
    .by(__.outV().id())
    .by(__.inV().id())
    .by(__.values('message').fold().coalesce(__.unfold(), __.constant(''))).next()

    console.log(result.value)
    return result.value

}





export async function writeRecommendation(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: WriteRecommendationInput, cognitoUsername: string) {

    let { text,recommendedBy,recommendationFor } = data;



    const errorString1 = `inputs "requesterUserId", "text" and "requestedUserId cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "user to be recommended not found"
    const errorString4 = "users cannot write recommendations for themeselves"
    const errorString5 = "the user has already written a recommendation for this user"



    if (!recommendedBy || !recommendationFor || !text){
        throw new Error(errorString1)
    }

    const confirmUser = await identityVerifier.confirmUserFromCognito(g, recommendedBy, cognitoUsername, false)


    if (!confirmUser) {

        throw new Error(errorString2)

    }



    if (recommendedBy === recommendationFor){
        throw new Error(errorString4)

    }


    const errorHandling = await g.V(recommendationFor).hasLabel(vertex.user.L).fold().
    coalesce(__.unfold().choose(__.in_('recommends').hasId(recommendedBy),__.constant(errorString5))
    ,__.constant(errorString3)).next()


    
    if (errorHandling.value === errorString3 ){
        throw new Error(errorString3)

    }

    if (errorHandling.value === errorString5 ){
        throw new Error(errorString5)

    }

    const timeStamp = Date.now()

    const dropRecommendationRequestEdge = await g.V(recommendationFor).outE('requestsRecommendation').where(__.inV().hasId(recommendedBy)).drop().next()


    const result = await g.V(recommendedBy).addE('recommends').to(__.V(recommendationFor)).property('timeStamp',timeStamp).property('text',text)
    .project("id", "timeStamp","recommendationFor","recommendedBy","text")
    .by(id)
    .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
    .by(__.inV().id())
    .by(__.outV().id())
    .by(__.values('text').fold().coalesce(__.unfold(), __.constant(''))).next()

    return result.value

}


export async function cancelRecommendationRequest(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CancelRecommendationRequestInput, cognitoUsername: string) {

    let { userId,recommendationRequestId } = data;



    const errorString1 = `inputs "userId"and "recommendationRequestId cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "recommndation request not found"
    const errorString4 = "the user is not permitted to cancel the recommendation request"



    if (!userId || !recommendationRequestId){
        throw new Error(errorString1)
    }

    const confirmUser = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


    if (!confirmUser) {

        throw new Error(errorString2)

    }

    const errorHandling = await g.E(recommendationRequestId).hasLabel('requestsRecommendation')
    .fold().coalesce(__.unfold().coalesce(__.or(__.outV().hasId(userId), __.inV().hasId(userId))
    ,__.constant(errorString4))
    ,__.constant(errorString3)).next()

       
    if (errorHandling.value === errorString3 ){
        throw new Error(errorString3)

    }

    if (errorHandling.value === errorString4 ){
        throw new Error(errorString4)

    }

    const getDeletedRequest = await g.E(recommendationRequestId)
    .project("id", "timeStamp","requesterUserId","requestedUserId","message")
    .by(id)
    .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
    .by(__.outV().id())
    .by(__.inV().id())
    .by(__.values('message').fold().coalesce(__.unfold(), __.constant(''))).next()

    const result = await g.E(recommendationRequestId).drop().next()

    return getDeletedRequest.value

}










export async function deleteRecommendation(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: DeleteRecommendationInput, cognitoUsername: string) {

    let { userId,recommendationId } = data;



    const errorString1 = `inputs "userId"and "recommendationId cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "recommndation not found"
    const errorString4 = "the user is not permitted to delete the recommendation"



    if (!userId || !recommendationId){
        throw new Error(errorString1)
    }

    const confirmUser = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


    if (!confirmUser) {

        throw new Error(errorString2)

    }

    const errorHandling = await g.E(recommendationId).hasLabel('recommends')
    .fold().coalesce(__.unfold().coalesce(__.outV().not(__.hasId(userId))
    ,__.constant(errorString4))
    ,__.constant(errorString3)).next()

       
    if (errorHandling.value === errorString3 ){
        throw new Error(errorString3)

    }

    if (errorHandling.value === errorString4 ){
        throw new Error(errorString4)

    }

    const getDeletedRecommendation = await g.E(recommendationId)
    .project("id", "timeStamp","recommendedBy","recommendationFor","text")
    .by(id)
    .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
    .by(__.outV().id())
    .by(__.inV().id())
    .by(__.values('text').fold().coalesce(__.unfold(), __.constant(''))).next()

    const result = await g.E(recommendationId).drop().next()

    return getDeletedRecommendation.value

}
