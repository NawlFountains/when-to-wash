import { useState } from 'react'
import type { DayForecast } from '../types/weather'
import type { WashDay } from '../types/wash'

export function useCarWasAdvisior() {
	const [location, setLocation] = useState(null)
	const [daysToForecast, setDaysToForecast] = useState<number | null>(null)
	const [forecast, setForecast] = useState<DayForecast[] | null>(null)
	const [recommendation, setRecommendation] = useState<WashDay[]| null>(null)

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const handleRecommendation = () => {
		// const throwAway: forecast = 
		// setRecommendation(throwAway)
	}

	return {
		location,
		setLocation,
		forecast,
		daysToForecast,
		setDaysToForecast,
		recommendation,
		loading,
		error,
		handleRecommendation
	}
}
