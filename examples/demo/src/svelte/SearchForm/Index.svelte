
<script>
  import DynamicForm from './DynamicForm.svelte'
  import DynamicFormRaw from '!raw-loader!./DynamicForm.svelte'

  import ExamplePage from '../utils/ExamplePage.svelte'
</script>

<ExamplePage title="lists" code={DynamicFormRaw} horizontal={false} >
  <DynamicForm/>
</ExamplePage>
