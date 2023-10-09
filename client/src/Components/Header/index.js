import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getAllPosts, getAllTags, getFilteredPosts, getUserPosts } from '../../endpoint'
import Warning from '../Warning'
import "./Header.css"

function Header(props) {
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [tagsT, setTagsT] = useState([])
    const [tagsF, setTagsF] = useState([])
    const [tagsCopy, setTagsCopy] = useState([])
    const [emptyResultsFlag, setEmptyResultsFlag] = useState(false)

    async function getTags() {
        const tags = await getAllTags();
        setTags(tags);
        setTagsCopy(tags);
    };

    useEffect(() => {
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
        setTagsCopy([...tagsCopy, e].sort())
    }
    
    const addTagF = (e) => {
        setSearch('')
        setTagsF([...tagsF, e])
        setTagsCopy(tagsCopy.filter(x => x !== e))
    }
    
    const removeTagF = (e) => {
        setTagsF(tagsF.filter(x => x !== e))
        setTagsCopy([...tagsCopy, e].sort())
    }
    
    const filterTagT = (e) => {
        setSearch(e.target.value)
    }

    const [dropdown, setDropdown] = useState("dropdown hidden")

    const dropdownEnter = () => {
        setDropdown('dropdown')
    }

    const dropdownExit = () => {
        setDropdown('dropdown hidden')
        const arr = tagsCopy.concat(tagsF, tagsT).sort()
        setTags(arr);
        setTagsCopy(arr);
        setSearch('')
        setTagsF([])
        setTagsT([])

    }

    const [userMenu, setUserMenu] = useState("user-menu hidden")

    const showUserMenu = () => {
        setUserMenu("user-menu")
    }

    const hideUserMenu = () => {
        setUserMenu("user-menu hidden")
    }

    const deletarConta = () => {

    }

    return (
        <header>
            <nav className='cabecalho'>
                <ul>
                    <li className="cabecalho__item" onClick={irPaginaInicial}>
                        <div>
                            <span>Página principal</span>
                        </div>
                    </li>
                    <li className="cabecalho__item" onMouseEnter={() => dropdownEnter()}  onMouseLeave={() => dropdownExit()}>
                        <div>
                            <span>Filtrar por tags</span>
                        </div>
                        <div className={dropdown} id='dropdown' onMouseLeave={() => dropdownExit()}>     
                            <div className='filter-container'>
                                <div className="tags-t">
                                    {tagsT.map(x => <span className="tag-t" onClick={() => removeTagT(x)} key={x}>{x}</span>)}
                                </div>
                                <div className="tags-f">
                                    {tagsF.map(x => <span className='tag-f' onClick={() => removeTagF(x)} key={x}>{x}</span>)}
                                </div>
                            </div>
                            <input className="tag-search" type='text' placeholder="Pesquisar tag..." value={search} onChange={filterTagT}/>
                            {<div className="tags">
                                {tags.slice(0,5).map(x => <span key={x}>
                                    <button className="tag-include-button"onClick={() => addTagT(x)}><FontAwesomeIcon icon={faPlus} /></button>
                                    <span className='tag'>{x}</span>
                                    <button className="tag-exclude-button" onClick={() => addTagF(x)}><FontAwesomeIcon icon={faMinus} /></button>
                                </span>)}
                            </div>}
                            {(emptyResultsFlag && search !== '') && <Warning><p>Nenhuma tag corresponde à pesquisa</p></Warning>}
                            <button className="tag-search-btn"onClick={irFiltrarTags}>Pesquisar</button>
                        </div>
                    </li>
                    <li className="cabecalho__item" onClick={irMeusPosts}>
                        <div>
                            <span>Meus posts</span>
                        </div>
                    </li>
                </ul>
                <div onMouseEnter={showUserMenu} onMouseLeave={hideUserMenu} >
                    <div>
                        <span>{props.user.user}</span>
                    </div>
                    <div className={userMenu} onMouseLeave={hideUserMenu}>
                        <div>
                            <span>{props.user.user}</span>
                        </div>
                        <button className="delete-account-button"onClick={deletarConta}>
                            <span>Deletar Conta</span>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="logout-button" onClick={logout}>
                            <span>Log out</span>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                        
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header