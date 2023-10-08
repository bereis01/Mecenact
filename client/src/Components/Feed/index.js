import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Post from '../Post'

function Feed(props) {
  const [loc, setLoc] = useState(props.user.user)
  
  useEffect(() => {
    document.title = `Mecenact — ${loc}`
    if (loc ==='') document.title = 'Mecenact'
  }, [loc])

  return (
    <>
        <Header loc={loc} setLoc={setLoc} user={props.user} setState={props.setState} setUser={props.setUser}setPosts={props.setPosts}/>
        <main>
            {props.posts.map((post, index) => 
                <Post 
                    author={post[0]} 
                    id={post[1]} 
                    title={post[2]}
                    body={post[3]}
                    key={`${post[0]}/${post[1]}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    setPosts={props.setPosts}
                    setLoc={setLoc}
                />)
            }
        </main>
    </>
  )
}

export default Feed