// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// fetch alerts

document.addEventListener('DOMContentLoaded', () => {
  const stateInput = document.getElementById('state-input')
  const fetchButton = document.getElementById('fetch-alerts')
  const alertDisplay = document.getElementById('alerts-display')
  const errorMessage = document.getElementById('error-message')

  fetchButton.addEventListener('click', async () => {
    const state = stateInput.value.trim()
    if (!state) return

    errorMessage.classList.add('hidden')
    errorMessage.textContent = ''

    try {
      const response = await fetch(weatherApi + state)
      if (!response.ok) {
        throw new Error('Fetch failed')
      } 

      const data = await response.json()

      alertDisplay.textContent = `Weather Alerts: ${data.features.length}`
      data.features.forEach(alert => {
        alertDisplay.textContent += `\n${alert.properties.headline}`
      })
    
    stateInput.value = ''
    } catch (error) {
      errorMessage.textContent = error.message
      errorMessage.classList.remove('hidden')
    }
  })
})