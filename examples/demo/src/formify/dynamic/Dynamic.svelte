<script>
  import { BlockTitle, Columns, Col, Card, CardContent, Select, Button } from '@yakit/svelte/index';
  import { Formify } from '@yakit/svelte/Formify';
  import stringify from 'fast-safe-stringify'

  //array of object data. identifier defaults to id and label is name.
  //added code in for the demo of multi labels.
  const simpleData = ['🍫 Chocolate', '🍕 Pizza', '🍪 Cookies', '🎉 Big Really Long Desc Lorem Ipsum 123 abc def']

  let opts ={
    initData: {
      name: 'Bill',
      user: {login: 'Bill'},
      dates: { date2: '2022-01-06' },
      inactive: true
    }
  }

  let schema = {
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
    },
    state:{
      input: 'select',
      selectOptions:{
        isValueObject: true,
        data:[{id:0, name: 'Open'}, {id:1, name: 'Closed'}]
      }
    },
    chips:{
      input: "chips"
    },
    customer:{
      input: 'select',
      selectOptions:{
        dataApi:{
          key:'customer'
        }
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

  let data = {}
  let formContext
  let transformedSchema
  let state
  $: if(formContext) {
    state = formContext.state
  }

</script>

<Columns>
  <Col class="is-4">
    <BlockTitle>Simple Form</BlockTitle>
    <Card>
      <CardContent class="p0">
        <Formify name="formify-example" {opts} {schema} bind:data bind:formContext bind:transformedSchema/>
      </CardContent>
    </Card>
  </Col>
  <Col class="is-6">
    <pre class="mt-4">field model: {stringify(data, null, 2)}</pre>
    <pre class="mt-4">state: {stringify($state, null, 2)}</pre>
  </Col>
</Columns>
<Columns>
  <Col>
    <pre class="mt-4">field model: {stringify(transformedSchema, null, 2)}</pre>
  </Col>

</Columns>

<!-- <Button class="mt-1" on:click={setPizza}>Set Pizza</Button> -->

