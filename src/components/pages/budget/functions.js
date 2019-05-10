const trail = [
  {
    text: 'Dashboard',
    disabled: false,
    to: '/'
  },
  {
    text: 'Bugets',
    disabled: true
  }
]
var buget = 10000

export default {
  getTrail () {
    return trail
  },
  setValWithCommas (val) {
    return val.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  getbuget () {
    return buget
  }
}
