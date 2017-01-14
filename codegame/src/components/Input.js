import React from 'react';
import reactCSS from 'reactcss';
import Label from './Label'

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {labelValue: '', mine: 'false' }
		
		this._initialize = this._initialize.bind(this);
		this._updateLabel = this._updateLabel.bind(this);
	}
	
	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('client:update-label', this._updateLabel);
	}
	
	_initialize(data) {
		this.setState({labelValue: data});
	}
	
	_updateLabel(data) {
		this.setState({labelValue: data, mine: 'false'});
	}
	
	handleChange(event) {
		socket.emit('client:input', { value: event.target.value });
		this.setState({labelValue: event.target.value, mine: 'true'});
	}
	
	render() {
		const styles = reactCSS({
			'default': {
				input: {
					color: 'white',
					background: 'transparent',
					border: 'none',
					borderBottom: '2px solid #fff',
					outline: 'none',
					textAlign: 'center',
					width: '60%',
					fontSize: '3vw',
					marginTop: '45vh',
					marginLeft: '20%'
				} 
			},
			'mine-true': {
				input: {
					color: 'gray'
				}
			},
			'mine-false': {
				input: {
					color: 'white'
				}
			}
		}, this.state);
		
		return (
			<div className="input">
				<div className="update-label">
					<input maxLength='40' style={styles.input} type="text" value={ this.state.labelValue } onChange={this.handleChange.bind(this)}/>
				</div>
			</div>
		);
	}
}