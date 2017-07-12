import React from 'react';
import { connect } from 'react-redux';
import './Cell.less';

class Cell extends React.Component {
	constructor(props) {
		super(props);

		let type;

		if (props.type === 'default') {
			type = 'default';
		} else if (props.type === 'user') {
			type = 'user';
		} else {
			type = 'ai';
		}

		this.state = {
			type: type
		}
	}

	handleActive = () => {
		if (this.state.type !== 'default') return;

		this.props.onAddActiveCell(this.props.id);
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.type !== this.state.type) {
			this.setState({
				type: nextProps.type
			});
		}
	}

	render = () => {
		return (
			<div
				className="table__cell default"
				data-type={this.state.type}
				id={this.props.id}
				onClick={this.handleActive}
			></div>
		);
	}
};

export default connect(
	state => ({
		reducer: state
	}),
	dispatch => ({
		onAddActiveCell: (activeCell) => {
			dispatch({
				type: 'ADD_ACTIVECELL',
				activeCell
			})
		}
	})
)(Cell);