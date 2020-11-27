import React, { useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

const Button = (props) => {
    const [enableTooltip, setEnableTooltip] = useState(false);

    const handleClick = () => {
        if (!props.disabled){
            props.fnc();
        }
    }
    const but = useRef();

    useEffect( () => {
        if (props.toolTipSubmit){
            setEnableTooltip(props.toolTipSubmit())
        }
        
    },[props])
    
    return (
        <>
        <button 
            ref={but}
            onClick={() => {
                    handleClick();
                    
                }}
            data-type='error'
            data-tip="" 
            data-for={ props.datafor }
            className = { props.disabled ? "button-disabled" : "" }
        >{props.children}</button>
        {( enableTooltip && props.datafor !== undefined && !props.disabled ) && 
        <ReactTooltip  
            ref={but}
            event='click' 
            id='submit'
            effect="solid"
            afterShow={() => ReactTooltip.hide() }
            delayHide={5000}
            place="bottom"
        >     
        {props.tooltip} </ReactTooltip>}
        </>
    );
}

export default Button;