import React, { useState } from 'react'
import { SingleRepo } from './SingleRepo'

export const RepoList = ({data}) => {
  const [isRepoOpen, setIsRepoOpen] = useState<boolean>(false)
  const [selectedRepo, setSelectedRepo] = useState<object>({})

  const viewRepo = (repo) => {
    console.log('getting the clicked repo', repo)
    setIsRepoOpen(true)
    setSelectedRepo(repo)

  }

  const handleCloseRepo = () => setIsRepoOpen(false)

  return (
    <div className="repo-list">
    {data.map((repo) => (
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
            <SingleRepo repo={selectedRepo} />
          </div>
        </div>
      )}

  </div>
  )
}
