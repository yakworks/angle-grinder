export default (state) => {
  return {
    abstract: true,
    children: [state],
    url: '^',
    name: 'app',
    component: 'freshApp'
  }
}
