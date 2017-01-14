import React from 'react';
import Message from './Message';

import fetch from 'isomorphic-fetch';
import 'es6-promise';


export default class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items: []};
	}
	
	render() {
		return (
			<div className="messages">
				{
					this.props.messages.map((message, i) => {
						return (
							<Message
								key={i}
								user={message.user}
								text={message.text}
							/>
						);
					})
				}
			</div>
		);
	}
	
	componentWillMount() {
		fetch('localhost:3000/api/messages').then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({items: data.items});
		}).catch((err) => {
			throw new Error (err);
		});
	}
}