import React, { useEffect, useState } from 'react'

export const FriendsList = ({friendsModal}) => {

    const [friends, setFriends] = useState([])
    const userName = localStorage.getItem('userName')

    useEffect(()=>{
        
    const getFriends = async()=>{
        try {

          const res =   await fetch(`http://localhost:3500/api/getfriends?userName=${userName}`)

          const friendsData = await res.json()

       

          setFriends(friendsData.friendsList)
            
        } catch (error) {
            console.log(error)
        }
    }
    getFriends()

    },[])


    const redirectToFollowers = (follower:string) =>{
        window.open(`http:localhost:5173?userName=${follower}`)
      }



  return (
    <div className='repo-detail-overlay'>
    <div className='close-button' onClick={friendsModal}>close</div>
  <div style={{width:'300px',height:'500px',backgroundColor:'black',overflowY:'scroll',paddingLeft:'15px'}} >
      {
          friends.map((friend)=>(
              <div style={{display:'flex',alignItems:'center',color:'white',marginTop:'20px'}} onClick={()=>redirectToFollowers(friend.name)}>
                <img src={friend.avatar_url} alt="" style={{width:'50px',height:'50px',borderRadius:'50%',marginRight:'10px'}} />
                {friend.name}
                </div>
          ))
      }

  </div>

  </div>
  )
}
