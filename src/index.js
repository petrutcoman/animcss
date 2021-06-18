import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

export default class Sample extends React.Component {
    constructor(props){
        super(props);
        this.state={tlsarray:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};
        
      }
    initArray(){
        let tmparr=[];
        for (let i=0;i<16;i++){
            tmparr.push(i);
        }
        this.setState({tlsarray:tmparr});
    }
    render(){
        
    return (
        <div className="board">
            <div className="overlay">
                {this.state.tlsarray.map(
                (tlsarray,index) => (
                    <label key={index.toString()} htmlFor={index.toString()}>
                    <input type="checkbox" id={index.toString()}/>
                    <div className="card">
                        <div className="front">Front</div>
                        <div className="back">{index.toString()}</div>
                    </div>
                </label>))}
            </div>
        </div>

    )
 
    }
}
// ========================================
ReactDOM.render(
    <Sample />,
    document.getElementById('root')
  );
  
