import type { DayForecast } from "../types/weather"

interface ForecastCardProps {
	dayForecast: DayForecast
}

export default function ForecastCard({ dayForecast }: ForecastCardProps) {
	const formattedDate = dayForecast.date.split('-').reverse().join('/')
	return (
		<div className="flex flex-col bg-gruv-fg0 rounded-xl text-center gap-2">
			<div className="w-full bg-gruv-orange rounded-t-xl p-2 text-gruv-fg0">
				<h2>{formattedDate}</h2>
			</div>
			<div className="p-3">
				<p>{dayForecast.precipitationProbability}% Precipitation</p>
				<p>{dayForecast.windspeedMax} km/h</p>
				<p>{dayForecast.tempMax} / {dayForecast.tempMin} ºC</p>
			</div>
		</div>
	)
}
