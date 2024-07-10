export const findFriends = async(following_url:string, followers_url:string) => {
    try {

          // removing the {/other_user} from following url
        const cleanFollowing_url = following_url.replace('{/other_user}', '')

          // concurrently fetching following and followers
        const [followingResponse, followersResponse] = await Promise.all([
            fetch(cleanFollowing_url),
            fetch(followers_url)
          ]);

          const following_data = await followingResponse.json();
          const followers_data = await followersResponse.json();


          console.log('followers-data', followers_data)



          // creating a Set of logins for quick lookup and o(n) complexity.
          const following_logins = new Set(following_data.map((user:any)=>user.login));
          // filtering users who present in both array  based on the login field from Set.
          const friends = followers_data.filter((user:any) => following_logins.has(user.login))



          return friends;

        
        
    } catch (error) {
        console.log(error)
    }
}