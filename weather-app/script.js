form.addEventListener('submit', async e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if(!city) return;

  result.classList.add('hidden');
  errorEl.classList.add('hidden');

  const API_KEY = '2d67759607eab8c39e30920199f959f4'; // <- Put your API key here
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    if (!res.ok) showError(data?.message || 'Failed to fetch');
    else showResult(data);
  } catch(err) {
    showError('Network error or API not deployed yet.');
    console.error(err);
  }
});
