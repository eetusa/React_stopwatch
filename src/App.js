import './App.css';
import TimerUI from './TimerUI';
import SavedTimesUI from './SavedTimesUI';
import { useState } from 'react';


function App() {

  // [ timer on/off [boolean], timer current time [ms], timer start time [ms ]]
  const [timer, setTimer] = useState([false, 0, 0]);
  const [list, setList] = useState([])
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6" style={{position:"relative"}} >
          <TimerUI timer={timer} setTimer={setTimer} list={list} setList={setList} />
        </div>
        
        <div className="col-12 col-sm-6">
          <SavedTimesUI list={list} setList={setList}/>
        </div>
        
        </div>
    </div>
  );
}

export default App;
