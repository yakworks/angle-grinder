
<script>
  // import { getContext } from 'svelte';
  import stringify from 'fast-safe-stringify'

  import { Avatar, Columns, Col, BlockTitle, Card, CardContent, Icon, List, ListInput, ListItem } from '@yakit/svelte'

  let formConfig = [
    {
      name: "name",
      type: "text",
      placeholder: "Your name",
      minlength: 3,
      clearButton: true,
      required: true,
    },
  ]

  let data = {
    name: 'Bill',
    birthday: '2014-04-30'
  }
</script>

<Columns>
  <Col class="is-8">
    <BlockTitle>Simple List</BlockTitle>
    <Card>
      <CardContent class="p0">
        <List inlineLabels noHairlinesMd>
          <ListInput
            label="Name"
            type="text"
            placeholder="Your name"
            validateOnBlur={true}
            minlength=3
            required={true}
            clearButton
            bind:value={data['name']}
          >
          </ListInput>
          <ListInput
            label="Password"
            type="password"
            placeholder="Your password"
            clearButton
            bind:value={data['pwd']}
          >
          </ListInput>

          <ListInput
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            validateOnBlur={true}
            clearButton
            bind:value={data['email']}
          >
          </ListInput>

          <ListInput
            label="URL"
            type="url"
            placeholder="URL"
            clearButton
            bind:value={data['Url']}
          >

          </ListInput>

          <ListInput
            label="Phone"
            type="tel"
            placeholder="Your phone number"
            clearButton
            bind:value={data['phone']}
          >

          </ListInput>

          <ListInput
            label="Gender"
            type="select"
            placeholder="Please choose..."
            bind:value={data['sex']}
          >

            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </ListInput>

          <ListInput
            label="Default Date"
            type="date"
            placeholder="Please choose..."
            bind:value={data['birthday']}
          >

          </ListInput>

          <ListInput
            label="Date picker"
            type="datepicker"
            calendarParams={{ closeOnSelect: true}}
            placeholder="Please choose..."
            bind:value={data['datePicker']}
          >

          </ListInput>

          <ListInput
            label="Textarea"
            type="textarea"
            placeholder="Bio"
            bind:value={data['textarea']}
          >

          </ListInput>

          <ListInput
            label="Resizable"
            type="textarea"
            resizable
            placeholder="Bio"
            bind:value={data['resizeTextarea']}
          >

          </ListInput>
        </List>
      </CardContent>
    </Card>
  </Col>
</Columns>

<pre class="mb-4">model: {stringify(data, null, 2)}</pre>

