

export const UserInfo = ({data}) => {
  return (
    <div className="userInfo">

        <img src={data.avatar_url} alt="" />
        <h1>{data.name}</h1>
        <p>{data.location}</p>
        <p>{data.bio}</p>

        

    </div>
  )
}
