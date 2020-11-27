import React, { useEffect, useState } from 'react';
import Button from './components/Button';


const TimerUI = ({timer, setTimer, list, setList}) => {

//  timer = [ timer on/off [boolean], current time [ms], start time [ms ]]
    const [name, setName] = useState("");
   

    useEffect( () => {
        if (timer[0]){
            const timerinterval = setInterval( () => {
                let temp = [...timer];
                temp[1] = Date.now() - timer[2];
                setTimer(temp)
            }, 10);
            return () => clearInterval(timerinterval)
        }
    })
    
    const startTimer = () => {
        setTimer([true, timer[1], Date.now() - timer[1] ]);
     
    }

    const pauseTimer = () => {
        setTimer( [false, timer[1], timer[2] ]);
    }

    const stopTimer = () => {
        setTimer([false, 0, 0]);
       
        setName("");
    }

    const handleStartPause = () => {
        if (timer[0]===true) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    const addToList = (e) => {
        if (e.length===0)return;
        if (name==="")return;
        for (let i = 0; i < list.length; i++){
            if (list[i][0] === e[0])return;
        }
        
            let temp = [...list];
            temp.push(e);
            setList(temp);
            setName("");   
            stopTimer();
        
    }
    
    let centiseconds = ("0" + (Math.floor(timer[1] / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timer[1] / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timer[1] / 60000) % 60)).slice(-2);
    const print = `${minutes} : ${seconds} : ${centiseconds}`


    const toolTipSubmit = () => {
        let target = 0;
        if (name==="")target++;
        for (let i = 0; i < list.length; i++){
            if (list[i][0] === name){
                target++;
            }
        }
        if (target>0){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div style={{borderRight:"1px solid rgb(200,200,200)", height:"100vh", display:"flex", justifyContent:"center   "}}>
            <div style={{height: "50%", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>

                <h1>Sekuntikello</h1>
                <div>
                <Button 
                    fnc={() => handleStartPause()}
                >
                    {timer[0] && 
                        <>Pysäytä</>
                    } 
                    {!timer[0] && 
                        <>Aloita</>
                    }
                </Button>
                
                <Button 
                    fnc={() => stopTimer()}
                    disabled={timer[0]===true}
                >
                    Nollaa
                </Button>

                <div data-testid="display" className="stopwatch-display">
                    {print}
                </div>

                <input data-testid="input" value={name} onChange={(e) => setName(e.target.value)}></input>

                <Button  
                    name={name}
                    list={list}
                    datafor='submit' 
                    tooltip="Tyhjä syöte tai sen niminen tallennus on jo olemassa"
                    data-testid="submit" 
                    disabled={timer[0]===true}
                    fnc={() => addToList([name, print])}
                    toolTipSubmit={toolTipSubmit}
                >
                    Tallenna
                </Button>

                </div>
                
            </div>
        </div>
    );
}

export default TimerUI;