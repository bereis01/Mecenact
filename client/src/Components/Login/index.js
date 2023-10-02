import React, { useState } from 'react'
import TextField from '../TextField'
import Botao from '../Botao';
import {getLogin} from '../../endpoint';
import Warning from '../Warning';

function Login(props) {
    const [username, setUsername] = useState('Patricia Perrien');
    const [password, setPassword] = useState('-5cpwYtfoI6');
    const [err, setErr] = useState(false);
    
    const aoSalvar = async (e) => {
        e.preventDefault();
    
        try {
            const json = await getLogin(username, password);     
            props.setValor(json);
            props.setState('feed');
            props.setUser({'user':username})
        } catch (error) {
            setErr(true);
            console.error(error)
        }
    }
    
  return (
    <section className='login'>
        <form onSubmit={aoSalvar}>
            <TextField 
                label="Nome de usuário"
                type="text"
                value={username}
                setValor={setUsername}
                required={true}
                placeholder='Zabuza Momochi'
            />
            <TextField 
                label="Senha"
                type="password"
                value={password}
                setValor={setPassword}
                required={true}
                placeholder='Calopsita_Metaleira1'
            />
            {(err) && <Warning><p>Nome de usuário ou senha incorreto</p></Warning>}
            <Botao>
                Login
            </Botao>
            <p>Não tem uma conta? <button onClick={() => props.setState("signin")}>Cadastre-se</button> </p>
        </form>
    </section>
  )
}

export default Login