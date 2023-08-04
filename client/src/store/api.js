export const apiBaseUrl = "http://emailmarketing.staging.5starcompany.com.ng/api"

export const setHeaders = ()=>{
    const user = JSON.parse(localStorage.getItem('marketingUserToken'))
    const headers ={
        headers: {
            "Authorization":`Bearer Bearer ${user?.access_token}`
        }
    }
    return headers
}
// https://emailmarketingapi.5starcompany.com.ng/api