import React from 'react';
import reactCSS from 'reactcss'


export default class Label extends React.Component {
	render() {
		const styles = reactCSS({
			'default': {
				label: {
					color: 'black'
				}
			},
			'mine-true': {
				label: {
					color: 'gray'
				}
			},
			'mine-false': {
				label: {
					color: 'white'
				}
			}
		}, this.props);
		
		return (
			<div style={ styles.label } className="label">
				<h2>{this.props.labelValue}</h2>
			</div>
		)
	}
}