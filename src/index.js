import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

export default class Sample extends React.Component {
    constructor(props){
        super(props);
        this.state={clckcount:0,first:{},objarr:[],moves:0,time: 0,isOn: false,start: 0};
        this.initObjArr(this.state.objarr);
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
      }

      startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1);
      }  
      stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }  
      resetTimer() {
        this.setState({time: 0, isOn: false})
      }

      resetCards(){
        let arr=this.state.objarr
        for (let i=0;i<16;i++){
            arr[i]['isenabled']=true;
            arr[i]['isflipped']=false;
        }
          arr=[];
          setTimeout(()=>{this.initObjArr(arr)},700);
          setTimeout(()=>{this.setState({objarr:arr, moves:0})},700);


      }
      initObjArr(arr){
        let str=['/Assets/1.png','/Assets/2.png','/Assets/3.png','/Assets/4.png','/Assets/5.png','/Assets/6.png','/Assets/7.png','/Assets/8.png'];
        str=str.concat(str);
        this.shuffleArray(str);
        for (let nr=0;nr<16;nr++){
            arr.push({id:nr,val:str[nr],isflipped:false,isenabled:true});
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
       resetArray(arr){
           for (let i=0;i<16;i++){
               if (arr[i]['isenabled']===true){
               arr[i]['isflipped']=false;}
           }
           return arr;
       }
       mesage(ev,obj){
        if (obj['isenabled']===true){
            obj['isflipped'] = ev.target.checked;
            let tmparr=this.state.objarr;
            tmparr[obj['id']]=obj;
            this.setState({objarr:tmparr});
        }
        let nr=this.state.clckcount; 
        switch(nr){
            case 0:
                if (obj['isenabled']===true){
                nr=nr+1;
                this.setState({first:obj,clckcount:nr});
                }
            break;
            default:
                if (obj['isenabled']===true){
                if (obj!==this.state.first){
                if (this.state.first['val']===obj['val']){
                    let tmparr=this.state.objarr;
                    tmparr[tmparr.indexOf(obj)]['isenabled']=false;
                    tmparr[tmparr.indexOf(this.state.first)]['isenabled']=false;
                    this.setState({objarr:tmparr});
                }
                nr=0;
                let arr=this.state.objarr;
                setTimeout(()=>{this.resetArray(arr)},700);
                setTimeout(()=>{this.setState({objarr:arr,clckcount:nr})},700);
                
            }
            this.setState({moves:this.state.moves+1});     
            }
            }   
              
        }
        
       handleChange(ev,obj){
            //used just for state of obj for now flipped/not flipped
       }
    render(){
        
    return (
        <div className="container">
            <div className="board">
              <div className="overlay">
                {this.state.objarr.map(
                (obj,index) => ( obj!==null &&
                    <label key={index.toString()}  htmlFor={index.toString()}>
                    <input type="checkbox" id={index.toString()} checked={obj.isflipped} onChange={(event)=>this.handleChange(event,obj)} onClick={(event)=>this.mesage(event,obj)}/>
                    <div className="card">
                        <div className="front" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + './Assets/logo.png'})` }}></div>
                        <div className="back" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + obj['val']})` }}></div>
                    </div>
                </label>))}
                </div>
            </div>
            <div className="textstuff">
                <div>Moves: {this.state.moves}</div>
                <div>Time: </div>
                <button onClick={()=>this.resetCards()}>Reset</button>
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
  
