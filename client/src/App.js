import React, {useEffect, useState} from 'react'
import Login from './Components/Login';
import Signin from './Components/Signin';
import Feed from './Components/Feed';
import { getUserPosts } from './endpoint';

function App() {

  useEffect(() => {
    async function getLoggedUserPosts() {
      let userData = localStorage.getItem('user');
      if (userData != null) {
        userData = JSON.parse(userData);
        setCurrUser(userData)
        const posts = await getUserPosts(userData.user)
        setFeedPosts(posts)
        setState("feed")
      }
    }
    getLoggedUserPosts();
    
  }, [])

  const [currUser, setCurrUser] = useState({})
  const [feedPosts, setFeedPosts] = useState([{}]);
  const [state, setState] = useState('login')

  return (
    <div>
      {state === "login" && <Login user={currUser} setUser={setCurrUser} setValor={setFeedPosts} setState={setState}/>}
      {state === "signin" && <Signin setUser={setCurrUser} setValor={setFeedPosts} setState={setState}/>}
      {state === "feed" && 
          <Feed user={currUser} setUser={setCurrUser} setState={setState} posts={feedPosts} setPosts={setFeedPosts}/>
      }
    </div>
  )
}

export default App