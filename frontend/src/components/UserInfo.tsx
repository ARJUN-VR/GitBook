

export const UserInfo = ({data}) => {
  return (
    <div className="userInfo">

        <img src={data.avatar_url} alt="" />
        <h1>{data.name}</h1>
        <p>{data.location}</p>
        <p>{data.bio}</p>

       {
        data.name && (
          <div style={{display: 'flex',width: '100%',justifyContent:'center',gap:'10px'}}>
          <button>followers</button>
          <button>friends</button>
 
         </div>
        )
       }

        

    </div>
  )
}
