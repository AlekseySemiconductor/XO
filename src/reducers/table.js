let state = [
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	},
	{
		'type': 'default'
	}
];

export default function notes (data = state, action) {
	if (action.type === 'ADD_ACTIVECELL') {

		data = [
			...data.slice(0, action.activeCell),
			{
				'type': 'user'
			},
			...data.slice(action.activeCell + 1)
		];

		let freeCells = [],
			aiCells = [],
			userCells = [],
			generateRandom = (min, max) => {
				const number = Math.floor(Math.random() * (max - min + 1)) + min;
				return freeCells.includes(number) ? number : generateRandom(min, max);
			},
			randomNumber;

		data.forEach((cell, i) => {
			if (cell.type == 'default') freeCells = [...freeCells, i];
			if (cell.type == 'ai') aiCells = [...aiCells, i+1];
			if (cell.type == 'user') userCells = [...userCells, i+1];
		});

		if (aiCells.length === 0) {
			randomNumber = generateRandom(0, data.length - 1);
		} else if (aiCells.length === 1) {
			if (Math.abs(aiCells[0]-1)%3 === 0) {
				if (data[aiCells[0]+1-1].type === 'default') {
					randomNumber = aiCells[0]+1;
				} else if (data[aiCells[0]-3-1].type === 'default') {
					randomNumber = aiCells[0]-3;
				} else if (data[aiCells[0]+3-1].type === 'default') {
					randomNumber = aiCells[0]+3;
				}
			} else if (Math.abs(aiCells[0])%3 === 0) {
				if (aiCells[0]-1-1 < 1) {
					if (data[aiCells[0]+3-1].type === 'default') {
						randomNumber = aiCells[0]+3;
					}
				} else if (aiCells[0]+1-1 > data.length) {
					if (data[aiCells[0]-1-1].type === 'default') {
						randomNumber = aiCells[0]-1;
					} else if (data[aiCells[0]-3-1].type === 'default') {
						randomNumber = aiCells[0]-3;
					}
				}
			} else {
				if (aiCells[0]-1-1 < 1) {
					if (data[aiCells[0]+1-1].type === 'default') {
						randomNumber = aiCells[0]+1;
					} else if (data[aiCells[0]+3-1].type === 'default') {
						randomNumber = aiCells[0]+3;
					}
				} else if (aiCells[0]+1-1 > data.length) {
					if (data[aiCells[0]-1-1].type === 'default') {
						randomNumber = aiCells[0]-1;
					} else if (data[aiCells[0]-3-1].type === 'default') {
						randomNumber = aiCells[0]-3;
					}
				}
			}
		} else if (aiCells.length === 2) {
			if (Math.abs(aiCells[0] - aiCells[1]) === 3) { // Значит по вертикали или горизонтали

				if (aiCells[0] > aiCells[1]) {
					if (aiCells[0]+3 > data.length) {
						if (data[aiCells[1]-6-1].type === 'default') {
							randomNumber = aiCells[0]-3;
						}
					} else if (aiCells[0]+3 < data.length) {
						if (data[aiCells[0]+3-1].type === 'default') {
							randomNumber = aiCells[0]+3;
						}
					} else if (aiCells[0]+3 === data.length) {
						if (data[aiCells[1]-1-1].type === 'default') {
							randomNumber = aiCells[0]-1;
						}
					}
				} else if (aiCells[0] < aiCells[1]) {
					if (aiCells[0]-3 < 1) {
						if (data[aiCells[1]+6-1].type === 'default') {
							randomNumber = aiCells[0]+6;
						} else if (data[aiCells[1]+3-1].type === 'default') {
							randomNumber = aiCells[0]+3;
						}
					} else if (aiCells[0]-3 > 1) {
						if (data[aiCells[1]-3-1].type === 'default') {
							randomNumber = aiCells[0]-3;
						}
					} else if (aiCells[0]-3 === 1) {
						if (data[aiCells[1]+1-1].type === 'default') {
							randomNumber = aiCells[0]+1;
						}
					}
				}
			} else if (Math.abs(aiCells[0] - aiCells[1]) > 3) { // Значит наискосок

				if (data[(aiCells[0] + aiCells[1])/2 - 1].type === 'default') {
					randomNumber = (aiCells[0] + aiCells[1])/2;
				}

			} else if (Math.abs(aiCells[0] - aiCells[1]) == 2) { // Значит рядышком

				if (data[(aiCells[0] + aiCells[1])/2 - 1].type === 'default') {
					randomNumber = (aiCells[0] + aiCells[1])/2;
				}
			} else if (Math.abs(aiCells[0] - aiCells[1]) == 1) { // Значит совсем рядышком

				if (aiCells[0] < aiCells[1]) {
					if ((aiCells[0]-1)%3 === 0) {
						if (data[aiCells[1] + 1 - 1].type === 'default') {
							randomNumber = aiCells[1]+1;
						}
					} else if ((aiCells[0]-1)%3 !== 0) {
						if (data[aiCells[0] - 1 - 1].type === 'default') {
							randomNumber = aiCells[1]-1;
						}
					}
				} else if (aiCells[0] > aiCells[1]) {
					if ((aiCells[1]-1)%3 === 0) {
						if (data[aiCells[1] + 1 - 1].type === 'default') {
							randomNumber = aiCells[1]+1;
						}
					} else if ((aiCells[1]-1)%3 !== 0) {
						if (data[aiCells[1] - 1 - 1].type === 'default') {
							randomNumber = aiCells[1]-1;
						}
					}
				}
			}
		}

		if (!randomNumber) {
			const freeCells = data.map((cell, i) => {
					if (cell.type === 'default') return i;
				}),
				freeNumbers = freeCells.filter(freeNumber => freeNumber !== undefined);

			if (freeNumbers.length) {
				randomNumber = freeNumbers[0] + 1;
			}

			aiCells = [...aiCells, randomNumber];
		}

		if (randomNumber) {
			data = [
				...data.slice(0, randomNumber-1),
				{
					'type': 'ai'
				},
				...data.slice(randomNumber)
			];
			aiCells = [...aiCells, randomNumber];
		}

		if (aiCells.length > 2 || userCells.length > 2) {
			let userwin,
				aiwin,
				win1 = [1, 2, 3], // Победы по горизонтали
				win2 = [4, 5, 6], // Победы по горизонтали
				win3 = [7, 8, 9], // Победы по горизонтали
				win4 = [1, 4, 7], // Победы по вертикали
				win5 = [2, 5, 8], // Победы по вертикали
				win6 = [3, 6, 9], // Победы по вертикали
				win7 = [1, 5, 9], // Победы наискосок
				win8 = [3, 5, 7]; // Победы наискосок

			userwin = win1.every(number => {
				return userCells.includes(number);
			});

			if (!userwin) {
				userwin = win2.every(number => {
					return userCells.includes(number);
				});
			}

			if (!userwin) {
				userwin = win3.every(number => {
					return userCells.includes(number);
				});
			}

			if (!userwin) {
				userwin = win4.every(number => {
					return userCells.includes(number);
				});
			}

			if (!userwin) {
				userwin = win5.every(number => {
					return userCells.includes(number);
				});
			}

			if (!userwin) {
				userwin = win6.every(number => {
					return userCells.includes(number);
				});
			}

			if (!userwin) {
				userwin = win7.every(number => {
					return userCells.includes(number);
				});
			}

			if (!userwin) {
				userwin = win8.every(number => {
					return userCells.includes(number);
				});
			}

			if (userwin) {
				alert('Вы выиграли! (по горизонтали или наискосок)');
				location.reload();
				return;
			}
			
			if (!userwin) {
				if (userCells[userCells.length-1] - userCells[userCells.length-2] == 3 
				 && userCells[userCells.length-2] - userCells[userCells.length-3] == 3) {
					userwin = true;  // Победы по вертикали
					if (userwin) {
						alert('Вы выиграли! (по вертикали)');
						location.reload();
						return;
					}
				}
			}

			// теперь проверяем выиграл ли компьютер

			aiwin = win1.every(number => {
				return aiCells.includes(number);
			});

			if (!aiwin) {
				aiwin = win2.every(number => {
					return aiCells.includes(number);
				});
			}

			if (!aiwin) {
				aiwin = win3.every(number => {
					return aiCells.includes(number);
				});
			}

			if (!aiwin) {
				aiwin = win4.every(number => {
					return aiCells.includes(number);
				});
			}

			if (!aiwin) {
				aiwin = win5.every(number => {
					return aiCells.includes(number);
				});
			}

			if (!aiwin) {
				aiwin = win6.every(number => {
					return aiCells.includes(number);
				});
			}

			if (!aiwin) {
				aiwin = win7.every(number => {
					return aiCells.includes(number);
				});
			}

			if (!aiwin) {
				aiwin = win8.every(number => {
					return aiCells.includes(number);
				});
			}

			if (aiwin) {
				alert('Компьютер выиграл! (по горизонтали или наискосок)');
				location.reload();
				return;
			}
			
			if (!aiwin) {
				if (aiCells[aiCells.length-1] - aiCells[aiCells.length-2] == 3 
				 && aiCells[aiCells.length-2] - aiCells[aiCells.length-3] == 3) {
					aiwin = true;  // Победы по вертикали
					if (aiwin) {
						alert('Компьютер выиграл! (по вертикали)');
						location.reload();
						return;
					}
				}
			}
		}

		return state = data;
	}

	return data;
};