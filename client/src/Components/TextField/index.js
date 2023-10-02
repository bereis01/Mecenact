import React from 'react'

function TextField(props) {

    const aoDigitado = (e) => {
        props.setValor(e.target.value);
    }

    return (
        <div className="text-field">
            <label>{props.label}</label>
            <input 
                type={props.type} 
                value={props.valor} 
                onChange={aoDigitado} 
                required={props.required} 
                placeholder={props.placeholder}
                onBlur={props.focusOut}/>
        </div>
    )
}

export default TextField