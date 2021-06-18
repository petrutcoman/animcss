import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

export default class Sample extends React.Component {
    constructor(props){
        super(props);
        this.state={valuesarray:[],clckcount:0,tlsarray:[],first:'',second:'',};
        let str=['A','B','C','D','E','F','G','H'];
        this.state.valuesarray=str.concat(str);
        this.shuffleArray(this.state.valuesarray);
        this.initArray(this.state.tlsarray);
      }
      initArray(arr){
        for (let i=0;i<16;i++){
            arr.push(false);
        }
        return(arr);  
      }
      shuffleArray(arr){
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
       }
       mesage(ind,val){
        let nr=this.state.clckcount; 
        let tmparr=this.state.tlsarray;
        if (this.state.clckcount===0){
            this.setState({first:val})
        }else{
            if(this.state.clckcount===1){
                if(this.state.first===val){
                    console.log("pair ( "+val+","+val+")");
                }
                this.setState({second:val})
               
        }else{ this.setState({first:'',second:''})}
        }
        if (nr>=2){
            nr=0;
            tmparr.fill(false);
            this.setState({clckcount:nr,tlsarray:tmparr});
        }else{
            nr=nr+1;
            tmparr[ind]=true;
            this.setState({clckcount:nr,tlsarray:tmparr});
        }
        

       }
       handleChange(ev,ind){
        if(this.state.tlsarray[ind] !== ev.target.checked) {
            let tmparr=this.state.tlsarray;
            tmparr[ind]=ev.target.checked;
            this.setState({tlsarray:tmparr});
         }
       }
    render(){
        
    return (
        <div className="board">
            <div className="overlay">
                {this.state.valuesarray.map(
                (valuesarray,index) => ( valuesarray!==null &&
                    <label key={index.toString()}  htmlFor={index.toString()}>
                    <input type="checkbox" id={index.toString()} checked={this.state.tlsarray[index]} onChange={(event,index)=>this.handleChange(event,index)} onClick={()=>this.mesage(index,valuesarray)}/>
                    <div className="card">
                        <div className="front">Front</div>
                        <div className="back">{valuesarray}</div>
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
  
