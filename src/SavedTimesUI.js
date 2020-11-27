import React from 'react';
import Button from './components/Button';

const SavedTimesUI = ({list, setList}) => {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{minHeight: "50vh", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <div data-testid="list">
                <h1>Tallennetut ajat</h1>
                {list.map( (item, key) => {
                    return (
                        <div key={key} className="list-item">
                            <span>{item[0]}</span>
                            <span>{item[1]}</span>
                        </div>
                    );
                })}
                {list.length===0 && <p>Lista tyhjä.</p>}
                </div>
                <Button 
                    disabled={list.length===0}
                    fnc={() => setList([])}
                >Tyhjennä lista</Button>
            </div> 
        </div>      
    );
}

export default SavedTimesUI;