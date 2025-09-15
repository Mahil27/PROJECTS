// Vercel / serverless function for OpenWeatherMap
// Reads WEATHER_KEY from environment variables (do NOT commit your key).
export default async function handler(req, res) {
  // Allow GitHub Pages or any origin to call this (adjust if you want to lock origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const city = (req.query.city || req.body?.city || 'Delhi').trim();
  const key = process.env.WEATHER_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server missing WEATHER_KEY environment variable' });
  }

  try {
    const q = encodeURIComponent(city);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${key}&units=metric`;
    const r = await fetch(apiUrl);
    const data = await r.json();
    // Forward status and payload from OpenWeather
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (err) {
    console.error('weather error', err);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
