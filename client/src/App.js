import React, {useState} from 'react'
import Login from './Components/Login';
import Signin from './Components/Signin';
import Feed from './Components/Feed';

function App() {
  
  const [currUser, setCurrUser] = useState({})
  const [feedPosts, setFeedPosts] = useState([{}]);
  const [state, setState] = useState("login")

  const setFeedPostsSpy = (e) => {
    console.log(e);
    setFeedPosts(e);
  }

  return (
    <>
      {state === "login" && <Login setUser={setCurrUser} setValor={setFeedPostsSpy} setState={setState}/>}
      {state === "signin" && <Signin setUser={setCurrUser} setValor={setFeedPostsSpy} setState={setState}/>}
      {state === "feed" && 
          <Feed user={currUser} setUser={setCurrUser} setState={setState} posts={feedPosts} setPosts={setFeedPostsSpy}/>
      }
    </>
  )
}

export default App