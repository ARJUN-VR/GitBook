import  { useState } from 'react'
import { SingleRepo } from './SingleRepo'
import { RepoInterface } from '../interfaces'

interface RepoListProps {
  data: RepoInterface[] | RepoInterface
  fetchUserData:(userName:string)=>void
}

export const RepoList = ({data,fetchUserData}:RepoListProps) => {
  const [isRepoOpen, setIsRepoOpen] = useState<boolean>(false)
  const [selectedRepo, setSelectedRepo] = useState<RepoInterface| null>(null)

  const viewRepo = (repo:RepoInterface) => {
    console.log('getting the clicked repo', repo)
    setIsRepoOpen(true)
    setSelectedRepo(repo)
  }

  const handleCloseRepo = () =>{
     console.log('working...')
     setIsRepoOpen(false)
  }

  const normalizedData = Array.isArray(data) ? data : [data];

  return (
    <div className="repo-list">
    {normalizedData.map((repo) => (
      <div className="repo-card" key={repo.id} onClick={() => viewRepo(repo)}>
        <img src={repo.image} alt={repo.name} />
        <div className="repo-content">
          <h1>{repo.name} <span className="verified">&#10004;</span></h1>
          <p>{repo.description}</p>
        </div>
      </div>
    ))}

{isRepoOpen && (
        <div className="repo-detail-overlay">
          <div className="repo-detail-container">
            <button className="close-button" onClick={handleCloseRepo}>Close</button>
            {selectedRepo && (
              <SingleRepo repo={selectedRepo} fetchUserData={fetchUserData} closeRepo={handleCloseRepo} />
)}
          </div>
        </div>
      )}

  </div>
  )
}
