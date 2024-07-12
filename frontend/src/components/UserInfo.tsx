import { useState } from "react"


export const UserInfo = ({data, followersModal, friendsModal}) => {

  return (
    <div className="userInfo">

        <img src={data.avatar_url} alt="" />
        <h1>{data.name}</h1>
        <p>{data.location}</p>
        <p>{data.bio}</p>

       {
        data.name && (
          <div style={{display: 'flex',width: '100%',justifyContent:'center',gap:'10px'}}>
          <button onClick={followersModal}>followers</button>
          <button onClick={friendsModal}>friends</button>
 
         </div>
        )
       }

        

    </div>
  )
}
