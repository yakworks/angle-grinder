module.exports =
  # Pauses for the given time in secounds
  sleep: (secounds) ->
    time = new Date().getTime() + (secounds * 1000)
    while new Date().getTime() <= time
      "do nothing"

  # Returns a random element from the given collection
  randomItemFrom: (collection) ->
    collection[Math.floor(Math.random() * collection.length)]
