import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

export default class Sample extends React.Component {
    render(){
    return (
        <label htmlFor="#">
            <input type="checkbox" id="#"/>
            <div className="card">
                <div className="front">Front</div>
                <div className="back">Back</div>
            </div>
        </label>
    )
 
    }
}


// ========================================

ReactDOM.render(
    <Sample />,
    document.getElementById('root')
  );
  
