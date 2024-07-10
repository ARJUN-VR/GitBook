export interface UserDataInterface{
    login:string,
    name:string,
    avatar_url:string,
    followers_url:string,
    following_url:string,
    location:string,
    bio:string,
    created_at:string,
    public_repos:number,
    public_gists:number,
    message?:string,
    friends?:string[]
    
}

export interface FriendsInterface{
    friend:UserDataInterface[]
}