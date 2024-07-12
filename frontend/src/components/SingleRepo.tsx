import React from 'react'
import { toast } from 'react-toastify';

export const SingleRepo = ({ repo, fetchUserData,closeRepo }) => {


  const deleteRepo = async()=>{
    try {

      console.log('owner',repo.owner,'name',repo.name)

      await fetch(`http://localhost:3500/api/softdelete?username=${repo.owner}&repoName=${repo.name}`,{
        method:'PATCH'
      })
      toast.success('repo deleted.')

     

      fetchUserData(repo.owner)

      closeRepo()
      
    } catch (error) {
      console.log(error)
    }
  }
    return (
      <div className="single-repo">
        <div className="repo-left">
          <img src={repo.image} alt={repo.name} className="repo-image" />
          <div className="repo-verified">
            <span className="verified">&#10004;</span> Verified by GitHub
          </div>
          <p className="repo-verified-text">GitHub confirms that this app meets the requirements for verification.</p>

        </div>
        <div className="repo-right">
          <h1 className="repo-title">{repo.name}</h1>
          <button className="repo-delete-button" onClick={deleteRepo}>Delete</button>
          <p className="repo-description">{repo.description}</p>
          {/* <p className="repo-long-description">{repo.longDescription}</p> */}
        </div>
      </div>
    );
  };
  