export interface UserInfoInterface{
    name:string,
    avatar_url:string,
    location:string,
    bio:string
}

export interface DataInterface{
    login:string,
    name:string,
    avatar_url:string,
    location:string,
    bio:string
}

export interface RepoInterface{
    id:number,
    owner:string,
    name:string,
    description:string,
    image:string
}

export interface FollowersInterface{
    name:string,
    avatar_url:string
}


export interface FriendsInterface{
    name:string,
    avatar_url:string
}