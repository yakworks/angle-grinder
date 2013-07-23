class DataOrgs
  getAll: ->
    page: 1
    total: 1
    rows: [
      id: 1
      name: "Org One"
      num: "1"
    ,
      id: 2
      name: "Org Two"
      num: "2"
    ,
      id: 3
      name: "Org Three"
      num: "3"
    ,
      id: 4
      name: "Org Four"
      num: "4"
    ]

module.exports = DataOrgs
