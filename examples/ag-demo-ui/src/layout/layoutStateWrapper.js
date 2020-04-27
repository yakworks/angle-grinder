export default (state) => {
  return {
    abstract: true,
    children: [state],
    url: '^',
    name: 'app',
    template: require('../layout/packet/index.html')
  }
}
