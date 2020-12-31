import React from 'react';
import './Chart.css';

const chart = props => (
    <figure className="pie-chart">
	<h2>World electricity generation by source</h2>
	<figcaption>
		Coal 38<span ></span>
		Natural Gas 23<span ></span>
		Hydro 16<span ></span>
		Nuclear 10<span ></span>
		Renewable 6<span ></span>
		Other 7<span ></span>
	</figcaption>
	<cite>International Energy Agency</cite>
</figure>
);

export default chart;