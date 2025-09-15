const form = document.getElementById('searchForm');
const cityInput = document.getElementById('city');
const result = document.getElementById('result');
const errorEl = document.getElementById('error');

function showError(msg){ errorEl.textContent = msg; errorEl.classList.remove('hidden'); result.classList.add('hidden') }
function showResult(data){
  errorEl.classList.add('hidden');
  result.classList.remove('hidden');
  if(!data || data.cod && data.cod !== 200){
    result.innerHTML = `<p>Could not find weather for that city.</p>`;
    return;
  }
  const icon = data.weather?.[0]?.icon || '';
  result.innerHTML = `
    <div class="weather-row">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
      <div>
        <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
        <div class="small">${data.name}, ${data.sys?.country || ''} • ${data.weather?.[0]?.description || ''}</div>
      </div>
    </div>
    <div style="margin-top:12px" class="small">
      Feels like: ${Math.round(data.main.feels_like)}°C • Humidity: ${data.main.humidity}% • Wind: ${data.wind.speed} m/s
    </div>
  `;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if(!city) return;
  result.classList.add('hidden');
  errorEl.classList.add('hidden');
  try{
    const res = await fetch(`${window.API_BASE}?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    if(!res.ok) showError(data?.message || 'Failed to fetch');
    else showResult(data);
  }catch(err){
    showError('Network error or API not deployed yet.');
    console.error(err);
  }
});
