import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getAllPosts, getAllTags, getFilteredPosts, getUserPosts } from '../../endpoint'
import Warning from '../Warning'

function Header(props) {
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [tagsT, setTagsT] = useState([])
    const [tagsF, setTagsF] = useState([])
    const [tagsCopy, setTagsCopy] = useState([])
    const [emptyResultsFlag, setEmptyResultsFlag] = useState(false)

    useEffect(() => {
        async function getTags() {
            const tags = await getAllTags();
            setTags(tags);
            setTagsCopy(tags)
          };
          getTags();
    }, [props.loc])

    useEffect(() => {      
        setTags(tagsCopy.filter(x => x.startsWith(search)));
        setEmptyResultsFlag(tags.length === 0)
    }, [search, tagsCopy, tags.length])

    const irPaginaInicial = async (e) => {
        const posts = await getAllPosts();
        props.setPosts(posts)
        props.setLoc('Home')
        window.scrollTo(0,0)
    }
    const irMeusPosts = async (e) => {
        if (props.loc === props.user.user) return;
        const posts = await getUserPosts(props.user.user)
        props.setPosts(posts)
        props.setLoc(props.user.user)
        window.scrollTo(0,0)

    }

    const irFiltrarTags = async () => {
        console.log(tagsT);
        console.log(tagsF);
        const tags_t = tagsT.join(',')
        const tags_f = tagsF.join(',')
        const posts = await getFilteredPosts(tags_t, tags_f)
        props.setPosts(posts)
        props.setLoc(tags_t.concat('/'.concat(tags_f)))
        window.scrollTo(0,0)
        setSearch('')
        setTagsF([])
        setTagsT([])
    }

    const logout = () => {
        props.setState("login");
        localStorage.removeItem('user')
        props.setLoc('')
        props.setUser({});
    }

    const addTagT = (e) => {
        setSearch('')
        setTagsT([...tagsT, e])
        setTagsCopy(tagsCopy.filter(x => x !== e))
    }
    const removeTagT = (e) => {
        setTagsT(tagsT.filter(x => x !== e))
        setTagsCopy([...tagsCopy, e])
    }
    
    const addTagF = (e) => {
        setSearch('')
        setTagsF([...tagsF, e])
        setTagsCopy(tagsCopy.filter(x => x !== e))
    }
    
    const removeTagF = (e) => {
        setTagsF(tagsF.filter(x => x !== e))
        setTagsCopy([...tagsCopy, e])
    }
    
    const filterTagT = (e) => {
        setSearch(e.target.value)
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <button onClick={irPaginaInicial}>
                            Página principal
                        </button>
                    </li>
                    <li>
                        <button>
                            Filtrar por tags
                        </button>
                        <div className='dropdown'>
                            <div id="tags-t">
                                {tagsT.map(x => <span onClick={() => removeTagT(x)} key={x} style={{paddingRight:"10px"}}>{x}</span>)}
                            </div>
                            <div id="tags-f">
                                {tagsF.map(x => <span onClick={() => removeTagF(x)} key={x} style={{paddingRight:"10px"}}>{x}</span>)}
                            </div>
                            <input type='text' placeholder="Pesquisar tag..." value={search} onChange={filterTagT}/>
                            {<div id="tags">
                                {tags.slice(0,5).map(x => <span key={x} style={{paddingRight:"10px"}}>
                                    <button onClick={() => addTagT(x)}><FontAwesomeIcon icon={faCheck} /></button>
                                    {x}
                                    <button onClick={() => addTagF(x)}><FontAwesomeIcon icon={faXmark} /></button>
                                </span>)}
                            </div>}
                            {emptyResultsFlag && <Warning><p>Nenhuma tag corresponde à pesquisa</p></Warning>}
                            <button onClick={irFiltrarTags}>Pesquisar</button>
                        </div>
                    </li>
                    <li>
                        <button onClick={irMeusPosts}>
                            Meus posts
                        </button>
                    </li>
                </ul>
                <button onClick={logout}>
                    {props.user.user} 
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Log out</span>
                </button>
            </nav>
        </header>
    )
}

export default Header