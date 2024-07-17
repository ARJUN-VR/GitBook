
import { useEffect, useState } from 'react'
import './App.css'
import { UserInfo } from './components/UserInfo'
import { RepoList } from './components/RepoList'

import { FollowersList } from './components/FollowersList'
import { FriendsList } from './components/FriendsList'
import { DataInterface, RepoInterface } from './interfaces'

function App() {

  const [userName, setUserName] = useState<string>('')

  const [userData, setUserData] = useState<DataInterface | null>(null)

  const [repoData, setRepoData] = useState<RepoInterface[]>([])


  const [showFollowers, setShowFollowers] = useState<boolean>(false)

  const [showFriends, setShowFriends] = useState<boolean>(false)


  const followersModal =()=>{

    setShowFollowers(!showFollowers)
  }

  const friendsModal =()=>{
    console.log('getting the call')
    setShowFriends(!showFriends)
  }






  const fetchUserData = async (userName:string) => {
    try {

      const res = await fetch(`http://localhost:3500/api/getinfo?username=${userName}`)
      const data = await res.json()
      console.log('data',data)

      setUserData(data.user)

      setRepoData(data.repoData)

      localStorage.setItem('userName',userName)
      
    } catch (error) {
      console.log(error)
      
    }
  }

 useEffect(()=>{
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get('userName');

  console.log('name',name,typeof name)

  if(name){
    console.log('useeffect works...')
    fetchUserData(name)
  }

 },[userName])

  

  return (
    <div className='parent'>
      {/* search box */}
      <div className='header'>
        <input type="text" onChange={(e) => setUserName(e.target.value)} style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '300px',
          marginBottom: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}/>
        <button onClick={()=>fetchUserData(userName)}  style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          marginTop:'-9px',
          marginLeft:'10px'
          
         
        }}>submit</button>
      </div>
      {/* {userInfo} */}
      <div style={{ width:'100%',display:'flex',justifyContent:'center',backgroundColor:'antiquewhite'}}>
        {
          userData &&(

            <UserInfo data={userData} followersModal={followersModal} friendsModal={friendsModal}/>
          )
        }
      </div>

      {/* repoList */}
      {
        repoData && (

          <RepoList data={repoData} fetchUserData={fetchUserData} />
        )
      }

      {/* followers list */}

      {
        showFollowers && (
          <FollowersList followersModal={followersModal}/>
        )
      }

      {/* friendsList */}

      {
        showFriends && (
          <FriendsList friendsModal={friendsModal}/>
        )
      }


    </div>

  )
}

export default App
