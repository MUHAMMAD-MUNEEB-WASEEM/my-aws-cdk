import * as gremlin from "gremlin";
import {vertex,edge} from './graphdb-elements-name.json'

enum entityType{
    user= "user",
    company = "company"
    
    }

export async function confirmEntityFromCognito(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, entityIdRequest:string, entityIdCognito:string, confirmOnlyCompanyOwnerAccess:boolean){

const errorString1 = "entity not found"
const errorString2 = "the user is not permitted to perform this action"
const errorString3 = "this action can only be performed by the owner of the company"
const errorString4 = "the user trying to perform the action does not belong to this company"


const checkEntityType = await g.V(entityIdRequest).hasLabel(vertex.user.L,vertex.company.L).label().next()

if (checkEntityType.value === null) {
    throw new Error(errorString1)
}

else{

if (checkEntityType.value === entityType.user ){

    if (entityIdRequest === entityIdCognito){
        return true
    }
    else{
        throw new Error(errorString2)
    }

}


else{

 if (confirmOnlyCompanyOwnerAccess){
     const confirmCompanyOwnerAccess = await g.V(entityIdRequest).in_(edge.OWNER.L).hasId(entityIdCognito).next()

     if (confirmCompanyOwnerAccess.value === null) {
        throw new Error(errorString3)
    }
    
    else{
        return true
    }
 }

 else{

    const confirmCompanyAccess = await g.V(entityIdRequest).in_(edge.OWNER.L,edge.DEVELOPER.L,edge.OTHER_EMPLOYEE.L).hasId(entityIdCognito).next()

    
    if (confirmCompanyAccess.value === null) {
        throw new Error(errorString4)
    }
    
    else{
        return true
    }


 }

}

}


}




export async function confirmUserFromCognito(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, userIdRequest:string, userIdCognito:string){
    
    const checkUser = await g.V(userIdRequest).hasLabel(vertex.user.L).label().next()


    const errorString1 = "user not found"
    const errorString2 = "the user is not permitted to perform this action"


    if (checkUser.value === null) {
        throw new Error(errorString1)
    }

    else{

        
    if (userIdRequest === userIdCognito){
        return true
    }
    else{
        throw new Error(errorString2)
    }

    }

}



export async function confirmCompanyAccessFromCognito(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, companyIdRequest:string, userIdCognito:string,confirmOnlyCompanyOwnerAccess:boolean){
    
    const checkCompany = await g.V(companyIdRequest).hasLabel(vertex.company.L).label().next()


    const errorString1 = "company not found"
    const errorString2 = "this action can only be performed by the owner of the company"
    const errorString3 = "the user trying to perform the action does not belong to this company"
    

    if (checkCompany.value === null) {
        throw new Error(errorString1)
    }

    else{


        if (confirmOnlyCompanyOwnerAccess){
            const confirmCompanyOwnerAccess = await g.V(companyIdRequest).in_(edge.OWNER.L).hasId(userIdCognito).next()
       
            if (confirmCompanyOwnerAccess.value === null) {
               throw new Error(errorString2)
           }
           
           else{
               return true
           }
        }


        else{

            const confirmCompanyAccess = await g.V(companyIdRequest).in_(edge.OWNER.L,edge.DEVELOPER.L,edge.OTHER_EMPLOYEE.L).hasId(userIdCognito).next()
        
            
            if (confirmCompanyAccess.value === null) {
                throw new Error(errorString3)
            }
            
            else{
                return true
            }
        
        
         }
        
    

    }

}