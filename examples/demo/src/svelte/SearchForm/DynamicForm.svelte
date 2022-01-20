<script>
  import { Columns, Col, BlockTitle, Card, CardContent, Icon, List, ListInput } from '@yakit/svelte/index'
  import { transformFields } from '@yakit/core/transformer'
  // import stringify from '@yakit/core/stringify'
  import stringify from '@yakit/core/stringify'

  let noref = "javascript:void(0)"

  let fields = [
    {key: "name"},
    {key: "email", type: 'email'},
    {key: "birthday", type: 'date'},
    {key: "note", type: 'textarea'},
    {
      key: "favColor",
      type: 'select',
      selectOptions: {
        data: ['blue', 'red', 'green' ]
      }
    },
  ]

  let tranFields = transformFields(fields)

  //convert to framwork7 prop object
  function f7InputProps(field){
    let optsToMerge = _.pick(field, [
      'id', 'label', 'type', 'name', 'placeholder',
    ])
    optsToMerge.id = field.key
    return optsToMerge
  }

</script>

<Columns>
<Col class='is-4'>
<BlockTitle>Form1</BlockTitle>
<Card>
  <CardContent class="p0">
    <List form name="list-form-example1" inlineLabels noHairlinesMd
      novalidate="true" autocomplete="off">
      {#each tranFields as field (field.key)}
        <ListInput {...f7InputProps(field)} clearButton/>
      {/each}
    </List>
    <pre class="mt-4">field model: {stringify(tranFields, null, 2)}</pre>
  </CardContent>
</Card>
</Col>
</Columns>
