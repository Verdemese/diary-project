import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
	& canvas {
		margin: auto;
	}
`

const chart = props => {

	let [grey, red, yellow, green] = [1, 0, 0, 0];
	
	const labelColor = ['rgba(204,204,204, 0.5)', '#D65076', 'RGB(239, 192, 40)', '#009B77'];

	props.datesDetail.forEach(date => {
		const amountWords = date.words.length;

		if (amountWords) grey = 0;
		if (amountWords > 0 && amountWords <= 10) red++;
		if (amountWords > 10 && amountWords <= 20) yellow++;
		if (amountWords > 20) green++;

		
	})

	const data = {
		labels: ['grey', '0~10', '11~20', '21+'],
		datasets: [
			{
				backgroundColor: labelColor,
				borderColor: 'white',
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
			responsive: false,
			legend: {
				display: false,
			},
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						let label = data.labels[tooltipItem.index];

						label += ` : ${data.datasets[0].data[tooltipItem.index]}`;

						if (tooltipItem.index === 0){
							label = 'Start adding words!';
						}

						if (tooltipItem.index === 0 && data.datasets[0].data[tooltipItem.index] == 0) {
							label = ''
						}
						
						return label;
					}
				}
			}
		}

	return (
		<ChartContainer>
			<Doughnut width={150} height={150} data={data} options={options } />
		</ChartContainer>
	)
}
export default React.memo(chart, (prevProps, nextProps) => {
	return prevProps.datesDetail === nextProps.datesDetail;
});