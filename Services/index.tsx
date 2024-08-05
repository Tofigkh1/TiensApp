import { AxiosPromise } from "axios"
import { instanceAxios } from "../Shared/Helpers/instanceAxios"

export const PutAuthUser = (body: object) => {

    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "GET",
        url: "auth/user",
        data: body,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}


export const postSignUp = (body:object) => {

    
    return instanceAxios({
        method: "POST",
        url: "auth/signup",
        data: body
    })
}




export const PutAuthUserr = (body: object): AxiosPromise => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "PUT",
        url: "auth/user",
        data: body,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
