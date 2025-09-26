import { useState,useEffect } from "react";
import React from "react";
import axios from "axios"

function Profile(){
    const [profile,setProfile]=useState(null);
    const [followers,setFollowers]=useState([]);
    const [unfollowed,setUnfollowed]=useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3000/profile')
        .then(data=>setProfile(data.data))
        .catch(err=>console.log(err))

        axios.get('http://localhost:3000/followers')
        .then(data=>setFollowers(data.data))
        .catch(err=>console.log(err))
    },[unfollowed])

    function HandleOnChange(e){
        setProfile(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const HandleUpdate=async()=>{
        axios.put("http://localhost:3000/profile",profile)
        .then(alert("Updated"))
        .catch(err => console.err(err))
    }

    const HandleUnFollow = async (id) => {
      axios.delete(`http://localhost:3000/followers/${id}`)
        .then(alert("Unfollow"))
        .then(setUnfollowed(!unfollowed))
        .catch((err) => console.log(err));
    }
    

    return (
      <div className="m-5">
        {profile ? (
          <div>
            <img
              src={profile.profile_pic}
              className="profile rounded-circle"
              alt=""
            />
            <h5>{profile.username}</h5>
            <input
              type="text"
              value={profile.username}
              name="username"
              className="form-control my-5"
              onChange={HandleOnChange}
            />
            <input
              type="text"
              name="profile_pic"
              value={profile.profile_pic}
              className="form-control"
              onChange={HandleOnChange}
            />
            <button onClick={HandleUpdate} className="btn btn-primary my-5">Update</button>
          </div>
        ) : (
          <div>Profile Loading...</div>
        )}
        {followers.length >0 ?(
            followers.map(follower=>(
                <div key={follower.id} className="d-flex my-2">
                    {follower.username}
                    <button onClick={()=>{HandleUnFollow(follower.id)}} className="btn btn-secondary ms-auto">Un Follow</button>
                </div>
            ))
        ):(
            <div> Loading Followers</div>
        )}
      </div>

      
    );
}
export default Profile;