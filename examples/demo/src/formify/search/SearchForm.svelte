<script>
  import { Columns, Col, BlockTitle, Card, CardContent, Icon, List, ListInput } from 'angle-grinder/svelte/index'
  import { transformFields } from '@yakit/core/transformer'
  // import stringify from '@yakit/core/stringify'
  import stringify from 'fast-safe-stringify'

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

  let searchConfig = {
    column1:[
      {key: "num"},
      {key: "name"},
      {key: "date", type: 'date'}
    ],
    column2:[
      {
        key: "favColor",
        type: 'select',
        selectOptions: {
          data: ['blue', 'red', 'green' ]
        }
      }
    ],
    column3:{
      baz:{},
      buzz:{}
    }
  }

  let tranFields = transformFields(searchConfig)

  //convert to framwork7 prop object
  function f7InputProps(field){
    let optsToMerge = _.pick(field, [
      'id', 'label', 'type', 'name', 'placeholder',
    ])
    optsToMerge.id = field.key
    return optsToMerge
  }

</script>

<div class="tile is-ancestor">
  {#each tranFields.columns as colCfg}
  <div class="tile is-parent">
    <Card class="tile is-child m-0">
      <CardContent class="p0">
        <List form name="list-form-example1" inlineLabels noHairlinesMd
          novalidate="true" autocomplete="off">
          {#each colCfg as field (field.key)}
            <ListInput {...f7InputProps(field)} clearButton/>
          {/each}
        </List>
      </CardContent>
    </Card>
  </div>
  {/each}
</div>

<pre class="mt-4">field model: {stringify(tranFields, null, 2)}</pre>
