
export const randomGen = {
  range(min, max) {
    return Math.floor((Math.random() * (max - min)) + min)
  },
  date(minDate, maxDate) {
    if (maxDate == null) { maxDate = new Date() }
    const min = minDate.getTime()
    const max = maxDate.getTime()

    const randomMilis = this.range(min, max)
    return new Date(randomMilis)
  }
}

export function generateData(count) {
  if (count == null) { count = 50 }
  const rows = []

  for (let id = 1, end = count, asc = end >= 1; asc ? id <= end : id >= end; asc ? id++ : id--) {
    rows.push({
      id,
      invoiceDate: randomGen.date(new Date(2001, 1, 1)),
      tranDate: randomGen.date(new Date(2001, 1, 1)),
      customer: { name: `Test Customer ${id}` },
      name: `Test Item ${id}`,
      description: `Test Description ${id}`,
      note: `Note number ${id}`,
      amount: randomGen.range(20, 200) / 10.0,
      tax: randomGen.range(10, 100) / 10.0,
      total: randomGen.range(100, 1000) / 10.0,
      complete: Math.random() > 0.5
    })
  }

  return rows
}
