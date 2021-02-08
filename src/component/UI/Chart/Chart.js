import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
	display: block;	

	& {
		width: 5rem;
		aspect-ratio: 1;
	}

	& canvas {
		margin: 0 auto;
	}

	@media (max-width: 599px) {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.changeDate & {
			display: block;
		}

		& {
			width: 50%;
		}

		&.monthly {
			display: block;
		}

	}
`

const Chart = props => {

	let [grey, red, yellow, green] = [1, 0, 0, 0];

	const labelColor = ['rgba(204,204,204, 0.5)', '#D65076', 'RGB(239, 192, 40)', '#009B77'];

	if (props.datesDetail) {
		props.datesDetail.forEach(date => {
			const amountWords = date.words.length;

			if (amountWords) grey = 0;
			if (amountWords > 0 && amountWords <= 10) red++;
			if (amountWords > 10 && amountWords <= 20) yellow++;
			if (amountWords > 20) green++;
		})
	}

	const data = {
		labels: ['grey', '0~10', '11~20', '21+'],
		datasets: [
			{
				backgroundColor: labelColor,
				borderColor: 'rgb(255, 255, 255, 0.2)',
				borderWidth: 1,
				data: [grey, red, yellow, green],
				scales: {
					display: false
				}
			}
		]
	};

	const options = {
		maintainAspectRatio: true,
		responsive: true,
		legend: {
			maxWidth: 100,
			display: false,
		},
		tooltips: {
			callbacks: {
				label: function (tooltipItem, data) {
					let label = data.labels[tooltipItem.index];

					label += ` : ${data.datasets[0].data[tooltipItem.index]}`;

					if (tooltipItem.index === 0) {
						label = 'Start adding words!';
					}

					if (tooltipItem.index === 0 && data.datasets[0].data[tooltipItem.index] === 0) {
						label = ''
					}

					return label;
				}
			}
		},
	}

	return (
		<ChartContainer className={props.quizMethod === 'monthly' ? 'monthly' : null}>
			<Doughnut width={150} height={150} data={data} options={options} />
		</ChartContainer>
	)
}
export default React.memo(Chart);