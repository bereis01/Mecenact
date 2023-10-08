import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { getAllPosts, getUserPosts } from '../../endpoint'

function Header(props) {
    const irPaginaInicial = async (e) => {
        if (props.loc === 'home') return;
        const posts = await getAllPosts();
        props.setPosts(posts)
        props.setLoc('home')
    }
    const irMeusPosts = async (e) => {
        if (props.loc === props.user.user) return;
        const posts = await getUserPosts(props.user.user)
        props.setPosts(posts)
        props.setLoc(props.user.user)
    }

    const logout = () => {
        props.setState("login");
        localStorage.removeItem('user')
        props.setUser({});
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