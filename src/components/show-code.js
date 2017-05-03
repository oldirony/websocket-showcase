import React, {Component} from 'react';
import socket from '../lib/socket';
const style = {
	display: 'flex',
	height: '100vh',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white',
	textAlign: 'center',
};

const codeStyle= {
	fontSize: '3rem',
	display: 'block',
	fontFamily: 'monospace',
	letterSpacing: '.1em'
};

class ShowCode extends Component {
	constructor(props){
		super(props);
		this.code = Math.floor(Math.random() * 9000) + 1000;
	}

	componentDidMount(){
		socket.on('code-used', ({code})=>{
			if(code !== String(this.code)) return;


			socket.emit('code-worked', {code});
			window.location.href='/showcase/'
		})
	}

    render(){
        return <div style={style}>
			<p>Insert code: <span style={codeStyle}>{this.code}</span></p>
		</div>
    }

    static propTypes = {};
}

export default ShowCode