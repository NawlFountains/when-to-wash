import { useState } from 'react'
import type { DayForecast } from '../types/weather'
import type { WashDay } from '../types/wash'
import {getForecast} from '../utils/weatherForecast'
import {calculateDailyScore, getOptimalWashDay} from '../utils/washScore'

export function useCarWasAdvisor() {
	const [location, setLocation] = useState<L.LatLng | null>(null)
	const [recommendations, setRecommendations] = useState<WashDay[]| null>(null)
	const [optimalWashDay, setOptimalWashDay] = useState<WashDay | null>(null)

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const validate = () => {
		if (!location) {
			setError('Missing location')
			setLoading(false)
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
			if (!location) return
			const forecasts : DayForecast[] = await getForecast(location.lat, location.lng)
			const washDays: WashDay[] = forecasts.map((dayForecast) => ({
				forecast: dayForecast,
				score: calculateDailyScore(dayForecast)

			}))
			const optimalWashDay : WashDay | null = getOptimalWashDay(washDays) 

			setRecommendations(washDays)
			setOptimalWashDay(optimalWashDay)
			setError('')
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('An unknown error occured')
			}
		} finally {
			setLoading(false)
		}

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
