export interface SingleUserType{
    id:number,
    name:string,
    cretae_time:string,
    update_time:string,
    state:number,
  }
export interface UserState{
    data:SingleUserType[],
    meta:{
      total:number,
      page:number,
      per_page:number,
    }
  }
export interface FormValues {
    [name: string]:any
}
