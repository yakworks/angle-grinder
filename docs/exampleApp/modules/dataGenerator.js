import angular from 'angular'

const dataGenerator = angular.module("exampleApp.dataGenerator", []);

dataGenerator.value("random", {
  range(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  },

  date(minDate, maxDate) {
    if (maxDate == null) { maxDate = new Date(); }
    const min = minDate.getTime();
    const max = maxDate.getTime();

    const randomMilis = this.range(min, max);
    return new Date(randomMilis);
  }
})

class SampleData {
  constructor(random) {
    this.random = random;
  }

  generate(count) {
    if (count == null) { count = 50; }
    const rows = [];

    for (let id = 1, end = count, asc = 1 <= end; asc ? id <= end : id >= end; asc ? id++ : id--) {
      rows.push({
        id,
        invoiceDate: this.random.date(new Date(2001, 1, 1)),
        tranDate: this.random.date(new Date(2001, 1, 1)),
        customer: { name: `Test Customer ${id}`
      },
        name: `Test Item ${id}`,
        description: `Test Description ${id}`,
        note: `Note number ${id}`,
        amount: this.random.range(20, 200) / 10.0,
        tax: this.random.range(10, 100) / 10.0,
        total: this.random.range(100, 1000) / 10.0,
        complete: Math.random() > 0.5
      });
    }

    return rows;
  }
}
SampleData.$inject = ["random"]

dataGenerator.factory("sampleData", SampleData);

export default dataGenerator.name
