import React from 'react';
import Table from './Table.jsx';
import './MainPage.less';

export default class MainPage extends React.Component {
	reload = () => {
		location.reload();
	}

	render = () => {
		return (
			<div className="box">
				<h2 className="title">Крестики-нолики</h2>
				<div
					className="restart"
					onClick={this.reload}
				>Начать новую игру</div>
				<Table />
			</div>
		);
	}
};