
import { useState } from 'react'
import './App.css'
import { UserInfo } from './components/UserInfo'
import { RepoList } from './components/RepoList'
import { SingleRepo } from './components/SingleRepo'

function App() {

  const [userName, setUserName] = useState<string>('')

  const [userData, setUserData] = useState<object>({})

  const [repoData, setRepoData] = useState<string[]>([])





  const fetchUserData = async () => {
    try {

      const res = await fetch(`http://localhost:3500/api/getinfo?username=${userName}`)
      const data = await res.json()
      console.log('data',data)

      setUserData(data.user)

      setRepoData(data.repoData)
      
    } catch (error) {
      console.log(error)
      
    }
  }

  

  return (
    <div className='parent'>
      {/* search box */}
      <div className='header'>
        <input type="text" onChange={(e) => setUserName(e.target.value)}/>
        <button onClick={fetchUserData}>submit</button>
      </div>
      {/* {userInfo} */}
      <div style={{ width:'100%',display:'flex',justifyContent:'center',backgroundColor:'red'}}>
      <UserInfo data={userData}/>
      </div>

      {/* repoList */}
      <RepoList data={repoData} />


    </div>

  )
}

export default App
