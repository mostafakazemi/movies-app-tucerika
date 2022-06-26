export default {
  methods: {
    numberSeparator (number, separator = ',', prefix) {
      if (number) {
        number = typeof number === 'number' ? number.toString() : number
        number = number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator)
        return prefix ? prefix + number : number
      }
      return 0
    }
  }
}
