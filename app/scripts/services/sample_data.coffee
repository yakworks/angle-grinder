services = angular.module("angleGrinder.services")

services.factory "random", ->
  range: (min, max) ->
    Math.floor (Math.random() * (max - min)) + min

  date: (minDate, maxDate = new Date()) ->
    min = minDate.getTime()
    max = maxDate.getTime()

    randomMilis = @range(min, max)
    date = new Date(randomMilis)

    year = date.getFullYear()
    month = "0#{date.getUTCMonth() + 1}".slice(-2)
    day = "0#{date.getUTCDate()}".slice(-2)

    "#{year}-#{month}-#{day}"

services.factory "sampleData", [
  "random", (random) ->
    (count = 50) ->
      rows = []

      for id in [1..count]
        rows.push
          id: id
          invdate: random.date(new Date(2001, 1, 1))
          tranDate: random.date(new Date(2001, 1, 1))
          customer: name: "Test Customer #{id}"
          name: "Test Item #{id}"
          description: "Test Description #{id}"
          note: "Note"
          amount: random.range(20, 200) / 10.0
          tax: random.range(10, 100) / 10.0
          total: random.range(100, 1000) / 10.0

      rows
]
