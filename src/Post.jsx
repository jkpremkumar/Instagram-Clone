import { useEffect, useState } from "react";

function Post(){
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/posts').
        then((data)=> data.json()).
        then((data=>setPosts(data))).
        catch(err=>console.log(err))
    },[]);
    return (
      <div className="d-flex justify-content-center">
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div className="my-5" key={post.id}>
                <div className="d-flex">
                  <img
                    className="dp rounded-circle"
                    src={post.user.profile_pic}
                    alt="Profile_pic"
                  />
                  <h5>{post.user.username}</h5>
                </div>
                <img className="image" src={post.image} alt="post" />
                <div>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-share"></i>
                </div>
                <div>
                  <b>{post.likes}</b>
                </div>
                <p>{post.caption}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
}
export default Post;