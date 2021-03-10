import React from 'react';
import Board from '../board/Board';
import './style.css';

function showDigit(digit) {
    let ele = document.createElement('div');
    ele.className = 'card-body';
    ele.id='remove1';
    ele.innerHTML = `<p className="card-text" style={{color:'red', fontSize:20}}>I Guess it is ${digit[0]}</p>`;
    let com = document.getElementById('pre');
    com.appendChild(ele);
    showcard(digit)

}

function showcard(params) {
    let ele1=document.createElement('div');
    ele1.className='card mx-5 noteCard';
    ele1.id='remove2';
    ele1.style={ width: 200 };
    ele1.innerHTML=`<ul className="list-group list-group-flush" style={{ textAlign: 'center' }}>
    <li className="list-group-item">My First Guess ${params[0]}</li>
    <li className="list-group-item">My Second Guess ${params[1]}</li>
    <li className="list-group-item">My Third Guess ${params[2]}</li>
</ul>`;
let com1=document.getElementById('pre');
com1.appendChild(ele1);
    
}

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "#000000",
            size: "55"
        }
    }



    changeColor(params) {
        this.setState({
            color: params.target.value
        })
    }
    clearboard() {
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    sendimage() {
        console.log("button was clicked")
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        let imgd = canvas.toDataURL();

        var xr1 = new XMLHttpRequest();
        const fd = new FormData();
        fd.append('imgvalue', imgd);
        xr1.open("POST", "/imdata/", true);
        xr1.getResponseHeader('Content-type', 'application/json');
        xr1.onload = function () {
            if (this.status === 200) {
                let cd = this.responseText;
                let ele2=document.getElementById('remove1');
                let ele3=document.getElementById('remove2');
                if(ele2===null){
                    showDigit(cd);

                }
                else{
                    ele2.remove();
                    ele3.remove();
                    showDigit(cd);

                }

            }
            else {
                console.log("Some error occured");
            }
        }
        xr1.send(fd);

    }

    changeSize(params) {
        this.setState({
            size: params.target.value
        })
    }

    render() {

        return (
            <div className="container-fluid " style={{ textAlign: 'center' }}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" >Priyanko Mistri</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="https://www.linkedin.com/in/priyankom">LinkedIn</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="https://github.com/PriyankoM">GitHub</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="tools-section">
                    <h1>Draw any Digit (0-9)</h1>
                </div>
                <div className='tools-section' id='pre'>
                    <Board color={this.state.color} size={this.state.size}></Board>
                    <div className="tools-section">
                        <button id='rroo1' onClick={this.sendimage} className="btn btn-primary mx-2">Analyze Digit</button>
                        <button id='rroo2' onClick={this.clearboard} className="btn btn-primary mx-2">Clear Board</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Container