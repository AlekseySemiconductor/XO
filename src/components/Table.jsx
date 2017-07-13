import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx';
import './Table.less';


class CreateTable extends React.Component {
	state = {
		table: this.props.reducer.table,
		userWin: false,
		aiWin: false,
		winArrs: [
			[1, 2, 3], // Победы по горизонтали
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7], // Победы по вертикали
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9], // Победы наискосок
			[3, 5, 7]
		],
	}

	componentWillReceiveProps = nextProps => {
		let freeCells = [],
			userCells = [],
			generateRandom = (min, max) => {
				const number = Math.floor(Math.random() * (max - min + 1)) + min;
				return freeCells.includes(number) ? number : generateRandom(min, max);
			},
			randomNumber;

		nextProps.reducer.table.forEach((cell, i) => {
			if (cell.type === 'default') freeCells = [...freeCells, i];
			if (cell.type === 'user') userCells = [...userCells, i+1];
		});

		let newTable = [...nextProps.reducer.table];

		// Здесь реализована заглушка на 2 хода
		if (userCells.length >= 2) {
			this.state.winArrs.every((winArr, i) => {
				if (randomNumber) return false;
				let resultArr = [];
				return winArr.every(number => {
					if (randomNumber) return false;
					if (userCells.includes(number)) {
						resultArr = [...resultArr, i+1];
					}
					if (resultArr.length == 2) {
						winArr.forEach(lastNumber => {
							if (!userCells.includes(lastNumber)) {
								if (newTable[lastNumber-1].type === 'default') randomNumber = lastNumber;
							}
						});
					}
					return true;
				});
			});
		} else {
			randomNumber = generateRandom(0, nextProps.reducer.table.length - 1);
		}

		if (randomNumber) {
			newTable[randomNumber-1].type = 'ai';
		} else {
			if (freeCells.length) {
				randomNumber = generateRandom(0, nextProps.reducer.table.length - 1);
				newTable[randomNumber].type = 'ai';
			}
		}

		this.setState({
			table: newTable
		});
	}

	componentDidUpdate = () => {
		let userCells = [],
			aiCells = [];

		this.state.table.forEach((cell, i) => {
			if (cell.type === 'user') userCells = [...userCells, i+1];
			if (cell.type === 'ai') aiCells = [...aiCells, i+1];
		})

		if (userCells.length > 2) {
			this.state.winArrs.forEach((winArr, i) => {
				if (winArr.every(number => userCells.includes(number))) {
					if (!this.state.userWin) {
						let newTable = [...this.state.table];

						this.state.winArrs[i].forEach(number => {
							newTable[number-1].win = true;
						});

						this.setState({
							userWin: true,
							table: newTable
						});
					}
				}
			});
		}

		if (aiCells.length > 2) {
			this.state.winArrs.forEach((winArr, i) => {
				if (winArr.every(number => aiCells.includes(number))) {
					if (!this.state.aiWin) {
						let newTable = [...this.state.table];

						this.state.winArrs[i].forEach(number => {
							newTable[number-1].win = true;
						});

						this.setState({
							aiWin: true,
							table: newTable
						});

					}
				}
			});
		}
	}

	render = () => {
		return (
			<div>
				<div className="table" ref="table">
					{
						this.state.table.map((cell, i) => {
							let game;
							if (this.state.userWin || this.state.aiWin) game = false;
							return (
								<Cell
									key={i}
									id={i}
									type={cell.type}
									win={cell.win}
									game={game}
								/>
							)
						})
					}
				</div>
				<div
					className="win"
					style={{display: `${this.state.userWin ? "block" : "none"}`}}
				>Вы выиграли!</div>
				<div
					className="win"
					style={{display: `${this.state.aiWin ? "block" : "none"}`}}
				>"Компьютер выиграл!</div>
			</div>
			
		);
	}
};

export default connect(
	state => ({
		reducer: state
	})
)(CreateTable);