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
			type: type,
			win: props.win,
			game: true
		}
	}

	handleActive = () => {
		if (this.state.type !== 'default' || this.state.game === false) return;

		this.props.onAddUserCell(this.props.id);
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.game === false) {
			this.setState({
				'game': false
			});
		}
		if (nextProps.win) {
			this.setState({
				win: nextProps.win
			});
		}
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
				data-win={this.state.win}
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
		onAddUserCell: (userCell) => {
			dispatch({
				type: 'ADD_USERCELL',
				userCell
			})
		}
	})
)(Cell);