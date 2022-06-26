export default {
  methods: {
    convertMinutesToDuration (minutes) {
      const duration = []
      if (minutes > 59) {
        duration.push(Math.floor(minutes / 60) + 'h')
      }
      if (minutes % 60) {
        duration.push(minutes % 60 + 'm')
      }
      return duration.toString().replaceAll(',', ' ')
    },
    getFlightDuration (flightDuration, unit = 'm') {
      if (unit === 'ms') { flightDuration = Math.floor(flightDuration / 60000) }
      const flightHour = Math.floor(flightDuration / 60)
      const flightMinute = flightDuration % 60
      let duration = 0
      if (flightHour >= 3) {
        duration = '-'
      } else if (flightHour === 0 && flightMinute <= 30) {
        duration = '-'
      } else if (flightHour === 0) {
        duration = flightMinute + ' دقیقه'
      } else if (flightMinute === 0) {
        duration = flightHour + ' ساعت'
      } else {
        duration = flightHour + ' ساعت و ' + flightMinute + ' دقیقه'
      }
      return duration
    }
  }
}
