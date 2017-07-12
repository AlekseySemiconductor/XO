import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx';
import './Table.less';


class CreateTable extends React.Component {
	state = {
		table: this.props.reducer.table
	}

	componentWillReceiveProps = nextProps => {
		nextProps.reducer.table.forEach((cell, i) => {
			if (cell.type === 'ai') {
				this.setState({
					table: nextProps.reducer.table
				});
			}
		});
	}

	render = () => {
		return (
			<div className="table" ref="table">
				{
					this.state.table.map((cell, i) => {
						return (
							<Cell
								key={i}
								id={i}
								type={cell.type}
							/>
						)
					})
				}
			</div>
		);
	}
};

export default connect(
	state => ({
		reducer: state
	})
)(CreateTable);