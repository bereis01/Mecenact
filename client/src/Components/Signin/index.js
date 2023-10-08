import React, { useEffect, useState } from 'react'
import TextField from '../TextField'
import Warning from '../Warning'
import Botao from '../Botao'
import { createNewUser, getLogin } from '../../endpoint';

function Signin(props) {
    const [userErr, setUserErr] = useState(false);
    const [userFlag, setUserFlag] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [passFlag, setPassFlag] = useState(false);
    const [user, setUser] = useState('');
    const [userConfirm, setUserConfirm] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const aoSalvar = async (e) => {
        e.preventDefault();
        if (userErr || passErr) return;
        try {
            await createNewUser(user, pass);
            const posts = await getLogin(user, pass);
            localStorage.setItem('user', `{"user":"${user}"}`)
            props.setUser({'user': user})
            props.setState("feed");
            props.setValor(posts);
        } catch (error) {
            console.error(error);
        }
    }

    const comparaNomes = () => {
        setUserErr(user !== userConfirm && userFlag)
    }    
    const comparaSenhas = () => {
        setPassErr(pass !== passConfirm && passFlag)
    }

    useEffect(comparaNomes, [user, userConfirm, userFlag]);
    useEffect(comparaSenhas, [pass, passConfirm, passFlag]);

  return (
    <section className='login'>
        <form onSubmit={aoSalvar}>
            <TextField 
                label="Crie seu nome de usuário"
                type="text"
                value={user}
                setValor={setUser}
                required={true}
                placeholder='Como te conhecerão em Mecenact?'
                focusOut={() => {}}
            />
            <TextField 
                label="Confirme seu nome de usuário"
                type="text"
                value={userConfirm}
                setValor={setUserConfirm}
                required={true}
                placeholder='Repita seu lindo nome aqui'
                focusOut={() => {setUserFlag(true);}}
            />
            {(userErr) && 
            <Warning><p>Nomes de usuário não são iguais</p></Warning>}
            <TextField 
                label="Crie a senha para o usuário"
                type="text"
                value={pass}
                setValor={setPass}
                required={true}
                placeholder='Por diversão, você deveria lembrar dela'
                focusOut={() => {}}
            />
            <TextField 
                label="Confirme a senha para o usuário"
                type="text"
                value={passConfirm}
                setValor={setPassConfirm}
                required={true}
                placeholder='Repita a senha, para ter certeza que decorou'
                focusOut={() => setPassFlag(true)}
            />
            {(passErr) && <Warning><p>As senhas não são iguais</p></Warning>}
            <Botao>
                Signin
            </Botao>
            <p>Já tem uma conta? <button onClick={() => props.setState("login")}>Entrar</button> </p>
        </form>
    </section>
  )
}

export default Signin