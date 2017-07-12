import React from 'react';
import Links from './Links.jsx';
import './Home.less';

export default class About extends React.Component {
	render = () => {
		return (
			<div className="notes-app">
				<Links />
				<div className="home">
					<h1 className="home__title">Используемый стек технологий:</h1>
					<p className="home__text">react 15.6.1, redux 3.7.0, react-router 3.0.5, react-redux 5.0.5, react-router-redux 4.0.8, less</p>
				</div>
			</div>
		)
	}
};