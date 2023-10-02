import React from 'react'

function Post(props) {
  return (
    <article value={`${props.author}/${props.id}`}>
        <h2>{props.title}</h2>
        <img src={props.img} alt={props.title} loading={props.loading}/>
        <div>
            <span>{props.author}</span><span>{props.body}</span>
        </div>
    </article>
  )
}

export default Post