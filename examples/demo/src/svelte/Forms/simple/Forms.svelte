
<script>
  // import { getContext } from 'svelte';
  import stringify from 'fast-safe-stringify'
  import Button from 'angle-grinder/src/svelte/Button'
  import { Input, Select, ErrorMessage } from 'angle-grinder/src/svelte/Form'
  import Form from 'angle-grinder/src/svelte/Form/Form.svelte';
  import * as yup from "yup";

  const formProps = {
    initialValues: { name: "Bill", email: "" },
    validationSchema: yup.object().shape({
      title: yup.string().oneOf(["Mr.", "Mrs.", "Mx."]),
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
    }
  };

  export let numFields = 0

  let theForm
  let someInput

  let flexFields = []

  function updateFlexFields() {
    flexFields = [] //reset
    for (let i = 0; i < numFields; i++) {
      flexFields.push({
        key: `flex${i}`
      })
    }
    flexFields = flexFields //trigger reactivity
  }
  let formData = {}

  function getFormInstanceData() {
    console.log("getModel()", theForm.getModel())
    formData = theForm.getModel()
    someInput.foo()
    // console.log("someInput", someInput)
  }

  // const {form, handleChange} = getContext(FORM);

</script>

<div class="card">
  <div class="card-title">Simple Form</div>
  <hr>
  <div class="card-content">

    <Form {...formProps} bind:this={theForm}>
      <div class="field">
        <label class="label required" for="title">Title</label>
        <div class="field mb-0">
          <div class="control">
            <div class="select">
              <Select name="title">
                <option />
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Mx.</option>
              </Select>
            </div>
          </div>
        </div>
        <ErrorMessage name="title" />
      </div>

      <div class="field">
        <label class="label required" for="form_name">Name</label>
        <div class="control">
          <Input name="name" bind:this={someInput} />
        </div>
        <p class="help">this is a hint, must be &gt; 2 chars</p>
        <ErrorMessage name="name" />
      </div>

      <div class="field">
        <label class="label required" for="form_email">Email</label>
        <div class="field mb-0">
          <div class="control">
            <Input name="email" type="email" />
          </div>
        </div>
        <ErrorMessage name="email" />
      </div>

      <div class="field">
        <label class="label required" for="form_email">More Fields</label>
        <div class="field mb-0">
          <div class="control">
            <input
              class="input"
              type="number"
              autocomplete="off"
              name="numFields"
              id="numFields"
              on:change={updateFlexFields}
              bind:value={numFields}
            >
          </div>
        </div>
      </div>

      {#each flexFields as fld}
        <div class="field">
          <label class="label required" for="form_{fld.key}">{fld.key}</label>
          <div class="field mb-0">
            <div class="control">
              <Input name="{fld.key}" />
            </div>
          </div>
        </div>
      {/each}
      <Button type=submit color=primary >Submit</Button>
      <Button color=primary on:click={getFormInstanceData}>Show Form Data</Button>
      <pre class="mt-4">model: {stringify(formData, null, 2)}</pre>
    </Form>

  </div>
</div>
