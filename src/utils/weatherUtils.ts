export function getWeatherEmoji(code: number): string {
	 if (code === 0) return '☀️';
	 if (code <= 2) return '🌤️';
	 if (code <= 3) return '☁️';
	 if (code <= 48) return '🌫️'; // fog
	 if (code <= 55) return '🌦️'; // drizzle
	 if (code <= 65) return '🌧️'; // rain
	 if (code <= 77) return '❄️'; // snow
	 if (code <= 80) return '🌦️'; // Slight shower
	 if (code <= 82) return '🌧️'; // showers
	 if (code <= 99) return '⛈️'; // thunderstorm
	 return '';
}
