<!--
  Dynamic search from config. Based on config will setup multiple column cards with fields
 -->
<script>
  import { Card, CardContent } from '@yakit/svelte/index'
  import { ListForm, FormifyField } from '@yakit/svelte/Formify';
  import { transformFields } from '@yakit/core/transformer'
  import { _defaults } from '@yakit/core/dash'

  export let opts = {}
  export let defaultOpts = {
    formOnly: true
  }
  _defaults(opts, defaultOpts)

  export let schema={}

  export let data = {}
  export let formContext = undefined

  export let transformedSchema = transformFields(schema)

</script>

<ListForm name="list-form-example1" {opts} bind:data bind:formContext>
  <Card class="m-0 bg-body-low" >
    <CardContent class="p0">
      <div class="tile is-ancestor">
        {#each transformedSchema.columns as colCfg}
        <div class="tile is-parent">
          <Card class="tile is-child m-0" noShadow>
            <CardContent class="p0">
              <div class="list inline-labels">
              <ul>
                {#each colCfg as field (field.key)}
                  <FormifyField opts={field}/>
                {/each}
              </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        {/each}
      </div>
    </CardContent>
  </Card>
</ListForm>
