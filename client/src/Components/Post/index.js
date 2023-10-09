import React, { useEffect, useState } from 'react'
import { endpoint, getPostsTaggedAs, getTagsFromPost, getUserPosts } from '../../endpoint'
import "./Post.css"

function Post(props) {
  let [tags, setTags] = useState([]);
  // const [tags, setTags] = useState([])
  useEffect(()=>{
    async function getTags() {
      const postTags = await getTagsFromPost(props.author, props.id);
      setTags(postTags);
    };
    getTags();
  }, [props.author, props.id]);
  
  const seeAuthorFeed = async()=>{
    const posts = await getUserPosts(props.author);
    props.setPosts(posts)
    props.setLoc(props.author)
    window.scrollTo(0,0)
  }
  const seeTagFeed = async(tag)=>{
    const posts = await getPostsTaggedAs(tag);
    props.setPosts(posts)
    props.setLoc(tag)
    window.scrollTo(0,0)

  }
  return (
    <article className="post" value={`${props.author}/${props.id}`}>
        <h2>{props.title}</h2>
        <img src={endpoint(`/image/${props.author}/${props.id}`)} alt={props.title} loading={props.loading}/>
        <div className='infos'>
            <span className="author" onClick={seeAuthorFeed}>{props.author}</span><span className='description'>{props.body}</span>
        </div>
        <div className='tags'>
          {tags.map(x => <span style={{paddingRight:"10px"}} onClick={() => seeTagFeed(x)} className='tag' key={x}>{x}</span>)}
        </div>
    </article>
  )
}

export default Post