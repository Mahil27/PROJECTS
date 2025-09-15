import fetch from 'node-fetch';

export default async function handler(request, response) {
    const { city } = request.query;
    const apiKey = process.env.OPENWEATHER_API_KEY; 

    if (!city) {
        return response.status(400).json({ error: 'City parameter is missing' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
