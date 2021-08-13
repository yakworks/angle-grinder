export const themeColors = {
  primary: '#2f5e8e',
  primaryMedium: '#d4b3ff',
  primaryLight: '#f4edfd',
  secondary: '#ff227d',
  accent: '#797bf2',
  success: '#06d6a0',
  info: '#039BE5',
  warning: '#faae42',
  danger: '#FF7273',
  purple: '#8269B2',
  blue: '#37C3FF',
  green: '#93E088',
  yellow: '#FFD66E',
  orange: '#FFA981',
  lightText: '#a2a5b9',
  fadeGrey: '#ededed'
}

export const randomizeArray = function(arg) {
  var array = arg.slice()
  var currentIndex = array.length; var temporaryValue; var randomIndex

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
