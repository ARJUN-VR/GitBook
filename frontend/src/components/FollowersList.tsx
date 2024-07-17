import { useEffect, useState } from 'react'
import { FollowersInterface } from '../interfaces'


interface FollowersListProps {
  followersModal:()=>void
}



export const FollowersList = ({followersModal}:FollowersListProps) => {

    const [followers, setFollowers] = useState<FollowersInterface[]>([])
    const userName = localStorage.getItem('userName')

    useEffect(()=>{
        
    const getFollowers = async()=>{
        try {

          const res =   await fetch(`https://gitbook.arjunvr.live/api/getFollowers?userName=${userName}`)

          const followersList = await res.json()

          console.log('followersList',followersList)

          setFollowers(followersList.followers)
            
        } catch (error) {
            console.log(error)
        }
    }
    getFollowers()

    },[])

    const redirectToFollowers = (follower:string) =>{
      window.open(`https://gitbook.arjunvr.live?userName=${follower}`)
    }

  return (
    <div className='repo-detail-overlay'>
      <div className='close-button' onClick={followersModal}>close</div>
    <div style={{width:'300px',height:'500px',backgroundColor:'black',overflowY:'scroll',paddingLeft:'15px'}} >
        {
            followers.map((follower)=>(
                <div style={{display:'flex',alignItems:'center',color:'white',marginTop:'20px'}} onClick={()=>redirectToFollowers(follower.name)}>
                  <img src={follower.avatar_url} alt="" style={{width:'50px',height:'50px',borderRadius:'50%',marginRight:'10px'}} />
                  {follower.name}
                  </div>
            ))
        }

    </div>

    </div>
  )
}
