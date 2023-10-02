import React from 'react'
import Header from '../Header'
import Post from '../Post'

function Feed(props) {
  return (
    <>
        <Header user={props.user} setState={props.setState} setUser={props.setUser}setPosts={props.setPosts}/>
        <main>
            {props.posts.map((post, index) => 
                <Post 
                    author={post[0]} 
                    id={post[1]} 
                    title={post[2]}
                    img={post[3]}
                    body={post[4]}
                    key={`${post[0]}/${post[1]}`}
                    loading={index === 0 ? "eager" : "lazy"}
                />)
            }
        </main>
    </>
  )
}

export default Feed