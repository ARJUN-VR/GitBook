export const findFriends = async(userName:string) => {
    try {


          // concurrently fetching following and followers
        const [followingResponse, followersResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${userName}/following`),
            fetch(`https://api.github.com/users/${userName}/followers`)
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