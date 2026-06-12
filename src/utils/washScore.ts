import type { WashDay, WashScore, WashRating } from "../types/wash";
import type { DayForecast } from "../types/weather";

export function calculateDailyScore(forecast: DayForecast): WashScore {
	const reasons: string[] = []

	// WeatherCodes based upon WMO maybe refactor to adapter if new api doens't use it
	const isRain = forecast.weatherCode >= 51 && forecast.weatherCode <= 67
	const isSnow = forecast.weatherCode >= 71 && forecast.weatherCode <= 77
	const isStorm = forecast.weatherCode >= 80 && forecast.weatherCode <= 99

	if (isRain || isSnow || isStorm) {
		if (isRain) reasons.push('Precipitation or rain detected.')
		if (isSnow) reasons.push('Snowfall detected.')
		if (isStorm) reasons.push('Severe storms detected.')
		return { rating: 'avoid', reasons }
	}

	// Test windy conditions
	
	if (forecast.windspeedMax >= 25) {
		return { rating: 'poor', reasons: ['High winds will blow dust onto a fresh wash.'] }
	}

	if (forecast.windspeedMax >= 15) {
		return { rating: 'good', reasons: ['Moderate wind gusts.'] }
	}


	if (forecast.precipitationProbability < 15 && forecast.weatherCode <= 3) {
		reasons.push('Clear skies and excellent washing conditions')
		return { rating: 'great', reasons }
	}

	reasons.push('Acceptable weather conditions.')
	return { rating: 'good', reasons }
}


export function getOptimalWashDay(days: WashDay[]): WashDay | null {
	if (days.length === 0 ) return null

	const points: Record<WashRating, number> = {
		great: 3,
		good: 2,
		poor: 1,
		avoid: 0
	}

	let bestDay: WashDay | null = null
	let highestScore = 0


	for (let i = 0; i < days.length; i++) {
		const currentDay = days[i]
		const nextDay = days[i + 1]

		if (currentDay.score.rating === 'avoid') {
			continue;
		}

		let currentDayPoints = points[currentDay.score.rating]

		if (nextDay && nextDay.score.rating === 'avoid') {
			currentDayPoints = 0
		}

		if (currentDayPoints > highestScore) {
			highestScore = currentDayPoints
			bestDay = currentDay
		}
	}

	return bestDay
}


