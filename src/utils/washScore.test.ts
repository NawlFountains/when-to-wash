import { describe, it, expect } from 'vitest'
import type { WashScore, WashDay, WashRating } from '../types/wash'
import type { DayForecast } from '../types/weather'
import {calculateDailyScore, getOptimalWashDay} from './washScore'

describe('QA Unit Test - Wash Score', () => {

	describe('calculateDailyScore()', () => {
		it('should rate "avoid" if snow or storm is forecast', () => {
			const stormyDay: DayForecast = {
				date: '2026-06-13',
				precipitationProbability: 90,
				precipitationSum: 12.0,
				windspeedMax: 15,
				tempMax: 14,
				tempMin: 8,
				weatherCode: 95 // Thunderstorm
			}

			const result = calculateDailyScore(stormyDay)

			expect(result.rating).toBe('avoid')
		})

		it('should lower rating to "poor" if wind >= 25 km/h', () => {
			const windyDay: DayForecast = {
				date: '2026-06-14',
				precipitationProbability: 5,
				precipitationSum: 0,
				windspeedMax: 32,
				tempMax: 22,
				tempMin: 11,
				weatherCode: 1
			}

			const result = calculateDailyScore(windyDay)

			expect(result.rating).toBe('poor')
		})

		it('should rate "great" even though its overcast', () => {
			const greatDay: DayForecast = {
				date: '2026-06-15',
				precipitationProbability: 10,
				precipitationSum: 1.2,
				windspeedMax: 5,
				tempMax: 15,
				tempMin: 10,
				weatherCode: 3
			}

			const result = calculateDailyScore(greatDay)

			expect(result.rating).toBe('great')
		})

		it('should lower rating to "good" if clear but wind >= 15 km/h', () => {
			const greatWithSomeWindDay: DayForecast = {
				date: '2026-06-15',
				precipitationProbability: 0,
				precipitationSum: 0,
				windspeedMax: 15,
				tempMax: 15,
				tempMin: 10,
				weatherCode: 0
			}

			const result = calculateDailyScore(greatWithSomeWindDay)

			expect(result.rating).toBe('good')
		})

		it('should rate "avoid" because of drizzle', () => {
			const drizzleDay: DayForecast = {
				date: '2026-06-10',
				precipitationProbability: 15,
				precipitationSum: 1.2,
				windspeedMax: 5,
				tempMax: 15,
				tempMin: 10,
				weatherCode: 51
			}

			const result = calculateDailyScore(drizzleDay)

			expect(result.rating).toBe('avoid')
		})
	})

	describe('getOptimalWashDay()', () => {
		it('if not wash days, should return null', () => {
			const washDays: WashDay[] = []
			const result = getOptimalWashDay(washDays)

			expect(result).toBeNull
		})

		it('if sunny day followed by rainy day should discard', () => {
			const greatDay: DayForecast = {
				date: '2026-06-15',
				precipitationProbability: 10,
				precipitationSum: 0,
				windspeedMax: 5,
				tempMax: 15,
				tempMin: 10,
				weatherCode: 0
			}

			const rainyDay: DayForecast = {
				date: '2026-06-16',
				precipitationProbability: 90,
				precipitationSum: 8.0,
				windspeedMax: 5,
				tempMax: 11,
				tempMin: 10,
				weatherCode: 61
			}

			const weekMock: WashDay[] = [
				{ forecast: greatDay, score: calculateDailyScore(greatDay) },
				{ forecast: rainyDay, score: calculateDailyScore(rainyDay) }
			]

			const optimalDay = getOptimalWashDay(weekMock)

			expect(optimalDay).toBeNull()
		})

		it('if sunny after rainy then return sunny day', () => {

			const rainyDay: DayForecast = {
				date: '2026-06-14',
				precipitationProbability: 90,
				precipitationSum: 8.0,
				windspeedMax: 5,
				tempMax: 11,
				tempMin: 10,
				weatherCode: 61
			}


			const greatDay: DayForecast = {
				date: '2026-06-15',
				precipitationProbability: 10,
				precipitationSum: 0,
				windspeedMax: 5,
				tempMax: 15,
				tempMin: 10,
				weatherCode: 0
			}

			const weekMock: WashDay[] = [
				{ forecast: rainyDay, score: calculateDailyScore(rainyDay) },
				{ forecast: greatDay, score: calculateDailyScore(greatDay) }
			]

			const expectedWashDay: WashDay = weekMock[1]
			const optimalDay = getOptimalWashDay(weekMock)

			expect(optimalDay).toBe(expectedWashDay)
		})



	})
})

