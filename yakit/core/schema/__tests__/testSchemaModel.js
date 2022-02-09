
const testSchema = {
  name:{
    label: 'Cust Name',
    description: "A descriptive name for this entity",
    type:'string',
    maxLength: 50,
    minLength: 3,
    required: true //not standard json-schema, but should pick up
  },
  email:{},
  birthday:{
    type: 'string',
    format: 'date'
  },
  type:{
    type: 'string',
    enum: [ 'Customer', 'Vendor', 'Prospect']
  },
  picker:{
    input: 'select',
    options:{
      isValueObject: true,
      data:['foo', 'bar']
    }
  },
  inactive: {
    type: 'boolean'
  },
  credits: {
    type: 'number',
    minimum: 0,
    multipleOf : 0.01
  },
  weight: {
    type: 'integer',
    minimum: 0
  },
  'user.password':{
    minLength: 5,
    required: true,
    input: 'password'
  },
  'user.login':{
    minLength: 5,
    required: true,
  },
  'dates.date1':{
    format: 'date-time'
  },
  'dates.date2':{
    type: 'string',
    format: 'date'
  }
}

let testSchemaColumns = {
  column1:{
    name:{
      label: 'Cust Name',
      description: "A descriptive name for this entity",
      type:'string',
      maxLength: 50,
      minLength: 3,
      required: true
    },
    email:{},
    birthday:{
      type: 'string',
      format: 'date'
    },
    type:{
      type: 'string',
      enum: [ 'Customer', 'Vendor', 'Prospect']
    }
  },
  column2:{
    inactive: {
      type: 'boolean'
    },
    credits: {
      type: 'number',
      minimum: 0,
      multipleOf : 0.01
    },
    weight: {
      type: 'integer',
      minimum: 0
    },
    'user.login':{
      minLength: 5,
      required: true
    },
    'user.password':{
      minLength: 5,
      required: true,
      input: 'password'
    },
    'dates.date1':{
      format: 'date-time'
    },
    'dates.date2':{
      type: 'string',
      format: 'date'
    }
  }
}

export { testSchema, testSchemaColumns }
