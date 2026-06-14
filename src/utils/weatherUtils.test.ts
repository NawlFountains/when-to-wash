import { expect, it, describe } from 'vitest'
import { getWeatherEmoji } from './weatherUtils'

describe('Unit Test - weatherUtils.ts ', () => {
	describe('getWeatherEmoji', () => {
		it('should return sunny emoji if weather clear', () => {
			const weatherCode = 0 // Sunny
			const result = getWeatherEmoji(weatherCode)

			expect(result).toBe('☀️')
		})

		it('should return cloudy emoji if weather cloudy', () => {
			const weatherCode = 3 // Cloudy
			const result = getWeatherEmoji(weatherCode)

			expect(result).toBe('☁️')
		})
		
		it('should return storm emoji for any weatherCode between 95 <= 99', () => {
		
			const resultOne = getWeatherEmoji(95)
			const resultTwo = getWeatherEmoji(96)
			const resultThree = getWeatherEmoji(99)

			const expectedEmoji = '⛈️'

			expect(resultOne).toBe(expectedEmoji)
			expect(resultTwo).toBe(expectedEmoji)
			expect(resultThree).toBe(expectedEmoji)
		})

		it('should return an empty string if invalid code', () => {
			const result = getWeatherEmoji(100)

			expect(result).toBe('')
		})

		
		it('should return heavy rain emoji for any weatherCode of heavy rain or heavy shower', () => {
		
			const resultOne = getWeatherEmoji(64)
			const resultTwo = getWeatherEmoji(65)
			const resultThree = getWeatherEmoji(81) // Moderate shower
			const resultFour = getWeatherEmoji(82) // Heavy shower

			const expectedEmoji = '🌧️'

			expect(resultOne).toBe(expectedEmoji)
			expect(resultTwo).toBe(expectedEmoji)
			expect(resultThree).toBe(expectedEmoji)
			expect(resultFour).toBe(expectedEmoji)
		})


	})
})
