import React, {Component} from 'react';
import socket from '../lib/socket';

const style = {
	display: 'flex',
	height: '100vh',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white',
	textAlign: 'center',
	flexDirection: 'column'
};

const inputStyle = {
	backgroundColor: 'transparent',
	border: 'none',
	borderBottom: '2px solid white',
	outline: 'none',
	color: 'inherit',
	width: '7rem',
	fontSize: '3rem',
	display: 'block',
	fontFamily: 'monospace',
	letterSpacing: '.1em'
};

const buttonStyle = {
	marginTop: '1rem',
	color: 'inherit',
	backgroundColor: 'transparent',
	border: 'none',
	fontWeight: 'bold'
};

class InsertCode extends Component {
	constructor(props) {
		super(props);

		this.state={
			code: ''
		};
	}

	componentDidMount(){
		this.input.focus();
	}

    render(){
        return <form onSubmit={e => this.handleSubmit(e)} style={style}>

			<input style={inputStyle}
				   placeholder=""
				   type="number"
				   ref={el => this.input = el}
				   value={this.state.code}
				   maxLength="4"
				   onChange={e=>this.handleChange(e)}/>
			<button className="submit" style={buttonStyle} type="submit">Type and go</button>
		</form>
    }

    handleChange(e){
    	this.setState({code:e.target.value});
	}

    handleSubmit(e){
    	e.preventDefault();
    	console.log('submitted');

    	socket.emit('get-code', {code: this.state.code});

    	socket.on('code-worked', ({code})=>{
    		if (code === this.state.code) window.location.href='controller';
		})
	}

    static propTypes = {};
}

export default InsertCode