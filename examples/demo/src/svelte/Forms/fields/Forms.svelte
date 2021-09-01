
  <script>
    import { Button, Form, Input } from 'angle-grinder/svelte'

    import * as yup from "yup";

    const formProps = {
      initialValues: {
        text: "",
        email: "",
        password: "",
        number: 0,
        date: ""
      },
      validationSchema: yup.object().shape({
        text: yup.string(),
        email: yup.string().email(),
        password: yup.string(),
        number: yup.number(),
        date: yup.date()
      }),
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      }
    };
  </script>

  <Form {...formProps}>

    <div class="field">
      <label for="text">input[type=text]</label>
      <div class="control">
        <Input name="text" type="text" />
      </div>
    </div>

    <label for="password">input[type=password]</label>
    <Input name="password" type="password" />

    <label for="email">input[type=email]</label>
    <Input name="email" type="email" />

    <label for="number" >input[type=number]</label>
    <Input name="number" type="number" />

    <label for="date">input[type=date]</label>
    <Input name="date" type="date" />

    <Button type=submit color=primary >Submit</Button>
  </Form>
