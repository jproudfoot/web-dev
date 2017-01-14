import React from 'react';

export default class Label extends React.Component {
	constructor(props) {
		super(props);
		this.state = {serverValue: 'Default label'}
	}
	
	_onUpdateLabel(data) {
		this.setState(serverValue: data.value);
	}
	
	render() {
		return (
			<div class="my-label">
				<h2>{this.state.serverValue}</h2>
			</div>
		)
	}
}