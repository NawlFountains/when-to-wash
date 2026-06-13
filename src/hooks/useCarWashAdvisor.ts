import { useState } from 'react'
import type { DayForecast } from '../types/weather'
import type { WashDay, WashScore } from '../types/wash'
import {getForecast} from '../utils/weatherForecast'
import {calculateDailyScore, getOptimalWashDay} from '../utils/washScore'

export function useCarWasAdvisior() {
	const [location, setLocation] = useState(null)
	const [recommendations, setRecommendations] = useState<WashDay[]| null>(null)
	const [optimalWashDay, setOptimalWashDay] = useState<WashDay | null>(null)

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const validate = () => {
		if (!location) {
			setError('Missing location')
			return false
		}
		return true
	}

	const handleRecommendations = async () => {
		setLoading(true)
		setRecommendations(null)
		setOptimalWashDay(null)
		if (!validate()) return 
		try {
			const forecasts : DayForecast[] = await getForecast(location.lat, location.lng)

			const daysScored : WashScore[] = []

			forecasts.map((dayForecast : DayForecast, i : number) => {
				daysScored[i] = calculateDailyScore(dayForecast)
			})

			const washDays : WashDay [] = []

			daysScored.map((dayScored: WashScore , i : number) => {
				washDays[i] = { forecast: forecasts[i], score: dayScored } 
			})

			const optimalWashDay : WashDay = getOptimalWashDay(washDays) 
			setRecommendations(washDays)
			setOptimalWashDay(optimalWashDay)
			setError('')
		} catch (error) {
			setError(error.message)
		}

		setLoading(false)
	}

	return {
		location,
		setLocation,
		recommendations,
		optimalWashDay,
		loading,
		error,
		handleRecommendations
	}
}
