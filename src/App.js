import React,{useState} from 'react';
import './App.css';
import Graph from './graph'

function App() {
  const initialState = [];
  const [xcoord, setxcoord] = useState(initialState);
  const [ycoord, setycoord] = useState(initialState);
  const [xmean, setxmean] = useState(0);
  const [ymean, setymean] = useState(0);
  const [allcoord, setallcoord] = useState(initialState);
  const [xdevi, setxdevi] = useState(0);
  const [ydevi, setydevi] = useState(0);
  const [covariance, setcovariance] = useState(0);
  const [pearcoe, setpearcoe] = useState(0);

  const AddPoint = () => {
    const tempX = [...xcoord];
    const tempY = [...ycoord];
    if (document.getElementsByName("x-coordinate")[0].value.length!== 0 && document.getElementsByName("y-coordinate")[0].value!== 0){ 
    tempX.push(Number(document.getElementsByName("x-coordinate")[0].value));
    tempY.push(Number(document.getElementsByName("y-coordinate")[0].value));
    setxcoord(tempX);
    setycoord(tempY);
    }
    const tempallpoint = tempX.map((e,idx) =>([e, tempY[idx]]));
    setallcoord(tempallpoint);
  }

  const Calculate = () => {
    const tempXmean = (xcoord.reduce(function(total,currentValue){ return total + currentValue },0))/xcoord.length;
    const tempYmean = (ycoord.reduce(function(total,currentValue){ return total + currentValue },0))/ycoord.length;
    const tempXdevi = Math.sqrt(xcoord.reduce(function(total,currentValue){ return total + Math.pow((currentValue-tempXmean),2) },0)/(xcoord.length-1));
    const tempYdevi = Math.sqrt(ycoord.reduce(function(total,currentValue){ return total + Math.pow((currentValue-tempYmean),2) },0)/(ycoord.length-1));
    const tempCovariance = (allcoord.reduce(function(total,currentValue){ return total + (currentValue[0]-tempXmean)*(currentValue[1]-tempYmean) } ,0))/(allcoord.length - 1);
    const tempPearcoe = (tempCovariance)/(tempXdevi*tempYdevi);
    setxmean(tempXmean);
    setymean(tempYmean);
    setxdevi(tempXdevi);
    setydevi(tempYdevi);
    setcovariance(tempCovariance);
    setpearcoe(tempPearcoe);
  }

  return (
    <div className="App">
      <header className="App-header">
      Pearson's Regression React
      </header>
      <div id="main-panel">
        <div id="left-panel">
          <div id="input-panel">
            <header><b>Enter new coordinate</b></header>
            <div id="input-container">
              <div><span>x coordinate:</span><input type="number" name="x-coordinate"></input></div>  
              <div><span>y coordinate:</span><input type="number" name="y-coordinate"></input></div>
              <button id="add" onClick={AddPoint}>Add to the List</button>
              <button id="calculate" onClick={Calculate}>Calculate</button>
            </div>
          </div>
          <div>
            <header id="plot-title">Scatter Plot</header>
          <Graph data={allcoord}/>
          </div>
        </div>
        <div id="data-list">
          <header>Data Points</header>
          {allcoord.map((e,idx)=><div className="data-points" key={idx}>{e[0]}, {e[1]}</div>)}
          </div>
      </div>
      <div id="result-section">
        <ul>
          <li>X mean:{+xmean.toFixed(3)} </li>
          <li>Y mean:{+ymean.toFixed(3)} </li>
          <li>X standard deviation:{+xdevi.toFixed(3)}</li>
          <li>Y standard deviation:{+ydevi.toFixed(3)}</li>
          <li>Covariance: {+covariance.toFixed(3)}</li>
          <li>Pearson's Coefficient:{+pearcoe.toFixed(3)}</li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
