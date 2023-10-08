import React, { useEffect, useState } from 'react'
import { endpoint, getTaggedPosts, getTagsFromPost, getUserPosts } from '../../endpoint'

function Post(props) {
  let [tags, setTags] = useState([]);
  // const [tags, setTags] = useState([])
  useEffect(()=>{
    async function getTags() {
      const postTags = await getTagsFromPost(props.author, props.id);
      setTags(postTags);
    };
    getTags();
  });
  
  const seeAuthorFeed = async()=>{
    const posts = await getUserPosts(props.author);
    props.setPosts(posts)
    props.setLoc(props.author)
  }
  const seeTagFeed = async(tag)=>{
    const posts = await getTaggedPosts(tag);
    props.setPosts(posts)
    props.setLoc(tag)

  }
  return (
    <article value={`${props.author}/${props.id}`}>
        <h2>{props.title}</h2>
        <img src={endpoint(`/image/${props.author}/${props.id}`)} alt={props.title} loading={props.loading}/>
        <div>
            <span onClick={seeAuthorFeed}>{props.author}</span><span>{props.body}</span>
        </div>
        <div>
          {tags.map(x => <span style={{paddingRight:"10px"}} onClick={() => seeTagFeed(x)} className='tag' key={x}>{x}</span>)}
        </div>
    </article>
  )
}

export default Post