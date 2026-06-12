import type { DayForecast } from "../types/weather"

interface ForecastCardProps {
	dayForecast: DayForecast
}

export default function ForecastCard({ dayForecast }: ForecastCardProps) {
	return (
		<div>
			<h1>Forecast</h1>
			<h2>{dayForecast.date}</h2>
		</div>
	)
}
