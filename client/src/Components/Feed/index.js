import "./Feed.css"
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Post from '../Post'

function Feed(props) {
  const [loc, setLoc] = useState(props.user.user)
  const [form, setForm] = useState('form hidden')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [pictureImageTxt, setPictureImageTxt] = useState('Escolha uma imagem')
  const [pictureData, setPictureData] = useState(new Blob())
  const [tags, setTags] = useState("")
  
  useEffect(() => {
    document.title = `Mecenact — ${loc}`
    if (loc === '') document.title = 'Mecenact'
  }, [loc])

  const openForm = (e) => {
    e.preventDefault()
    setForm('form')
  }

  const closeForm = (e) => {
    e.preventDefault();
    setForm('form hidden')
    setTitle('')
    setDesc('')
    setPictureData(new Blob())
    setPictureImageTxt("Escolha uma imagem")
    setTags('')
  }

  const onImageChange = (e) => {
    e.preventDefault()

    const file = (e.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setPictureData(e.target.result)
        setPictureImageTxt("")
      })
      reader.readAsDataURL(file)
    } else {
      setPictureImageTxt("Escolha uma imagem")
    }
  }


  return (
    <>
        <Header loc={loc} setLoc={setLoc} user={props.user} setState={props.setState} setUser={props.setUser}setPosts={props.setPosts}/>
        <main className="feed">
            <section>
              {(loc === props.user.user) && <button className={"new-post-btn".concat(form === 'form hidden' ? "" : " hidden")} onClick={openForm}>Criar Post</button>}
              <form className={form}>
                <h1>#EM CONSTRUÇÂO</h1>
                <fieldset>
                  <label htmlFor="title">
                    <span>Título</span>
                    <input id="title" name="title" type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                  </label>
                </fieldset>
                <fieldset>
                  <label htmlFor="desc">
                    <span>Descrição</span>
                    <textarea id="desc" name="desc" value={desc} onChange={(e) => {setDesc(e.target.value)}} rows="5" cols="80">

                    </textarea>
                  </label>
                </fieldset>
                <fieldset>
                  <label className="picture" htmlFor='img' tabIndex="0">
                    <input onChange={onImageChange} className="picture__input" type="file" id="img" name="img" accept="image/*"/>
                    <span className="picture__image">{pictureImageTxt}<img src={pictureData} alt="" className="picture__img"></img></span>
                  </label>
                </fieldset>
                <fieldset>
                  <label htmlFor="tags" className="tag-input">
                    <span>Insira as tags do seu post(cada vírgua é uma nova tag)</span>
                    <input name="tags" id="tags" type="text" value={tags} onChange={e => setTags(e.target.value)}></input>
                    <div className="tag-container">{tags.includes(',') && tags.split(',').map(x => (x !== '') ? <div className="tag" key={x}>{x}</div> : <></>)}</div>
                  </label>
                </fieldset>
                <div>
                  <button>Enviar</button>
                  <button onClick={closeForm}>Cancelar</button>
                </div>
              </form>
            </section>
            <section className="feed__timeline">
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
            </section>
        </main>
    </>
  )
}

export default Feed