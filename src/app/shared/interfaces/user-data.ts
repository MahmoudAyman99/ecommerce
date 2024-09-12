export interface loginData{
    email:string,
    password:string,
}
export interface UserData extends loginData{
    name: string,
    rePassword:string,
    phone:string
}
