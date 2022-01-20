<script>
  import { BlockTitle, Button, Card, CardHeader, CardTitle, CardContent, CardSubtitle, Columns, Col } from '@yakit/svelte'

</script>

<BlockTitle>Misc Cards</BlockTitle>

<Columns>
<Col>
  <Card>
    <CardTitle>Card Title</CardTitle>
    <CardSubtitle>Subtitle text</CardSubtitle>
    <hr>
    <CardContent>Greyhound fantastic hello coldly wonderfully marginally far upon universe.</CardContent>
  </Card>
</Col>
<Col>
  <Card class="notification is-danger">
    <button type="button" class="delete" aria-label='Close'/>
    Notification with delete button
  </Card>
  <Card class="notification is-primary elevation-5" >
    Notification <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, <a href={'#'}>felis venenatis</a> efficitur.
  </Card>
</Col>
</Columns>

<Columns>
<Col>
  <Card outline>
    <CardTitle >Outlined</CardTitle>
    <hr>
    <CardContent>Greyhound fantastic hello coldly wonderfully far upon universe.</CardContent>
  </Card>
</Col>
<Col>
  <Card>
    <CardHeader title="Header with Button">
      <Button class="card-header-icon" icon="mdi mdi-pencil-outline"></Button>
    </CardHeader>
    <CardContent>GLorem ipsum</CardContent>
  </Card>
</Col>
</Columns>
