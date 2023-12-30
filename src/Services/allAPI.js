import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI.js"


//login api
export const loginAPI = async (admin)=>{
   return await commonAPI ('POST',`${BASE_URL}/login`,admin,"")
}

//product add api
export const addProductAPI = async (reqBody,reqHeader)=>{
   return await commonAPI ('POST',`${BASE_URL}/product/add`,reqBody,reqHeader)
}

//product get api
export const allProductAPI = async(searchKey,reqHeader) =>{

   //query parameter =path?key=value
   return await commonAPI ('GET',`${BASE_URL}/product/get?search=${searchKey}`,"",reqHeader)
}



//product edit api

export const editProductAPI = async(id,reqBody,reqHeader)=>{
   //path parameter - :id -router
      return await commonAPI("PUT",`${BASE_URL}/product/edit/${id}`,reqBody,reqHeader)
   }
   
   
// product delete api
   
   
   export const removeProductAPI = async(id,reqHeader)=>{
      //path parameter - :id -router
         return await commonAPI("DELETE",`${BASE_URL}/product/remove/${id}`,{},reqHeader)
      }
      