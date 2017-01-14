import React from 'react';
import Label from './Label'

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleChange = this.handleChange.bind(this);
	}

	
	handleChange(event) {
		console.log('i was changed.')
		socket.emit('client event', { value: 'hello' }); //old value: event.target.value
	}
	
	render() {
		console.log('I rendered!');
		return (
			<div className="input">
				Wrong one!
				<div className="update-label">
					<input type="text" placeholder="Enter Text" onChange={this.handleChange.bind(this)}/>
				</div>
				<Label />
			</div>
		);
	}
}