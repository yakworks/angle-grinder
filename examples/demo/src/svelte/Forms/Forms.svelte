
<script>
  import Button from 'angle-grinder/src/svelte/Button'
  import { createForm } from "svelte-forms-lib";

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      title: "",
      name: "",
      email: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    }
  });
</script>
<div class="card">
  <div class="card-title">Simple Form</div>
  <hr>
  <div class="card-content">
    <form on:submit={handleSubmit}>
      <div class="field">
        <label class="label required" for="form_title">Title</label>
        <div class="field mb-0">
          <div class="control">
            <div class="select">
              <select
                id="form_title"
                name="title"
                on:change={handleChange}
                bind:value={$form.title}>
                <option></option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Mx.</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label required" for="form_name">Name</label>
        <div class="field mb-0">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="John Smith"
              autocomplete="off"
              name="name"
              id="form_name"
              on:change={handleChange}
              bind:value={$form.name}
            >
          </div>
        </div>
        <p class="help">this is a hint, must be &gt; 2 chars</p>
      </div>

      <div class="field">
        <label class="label required" for="form_email">Email</label>
        <div class="field mb-0">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="John@gmail.com"
              autocomplete="off"
              name="email"
              id="form_email"
              on:change={handleChange}
              bind:value={$form.email}
            >
          </div>
        </div>
      </div>

      <Button type=submit color=primary >Submit</Button>
    </form>
  </div>
</div>
