<script>
  import { Button, Card, CardHeader, CardTitle, CardContent, CardSubtitle, Columns, Col } from 'angle-grinder/svelte'
</script>

<div class="title is-5">Misc Cards</div>

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
  <Card class="notification is-danger" dismissible>
    Notification that dissmissable
  </Card>
  <Card class="notification is-primary" elevation="0" dismissible>
    Notification <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, <a href={'#'}>felis venenatis</a> efficitur.
  </Card>
</Col>
</Columns>

<Columns>
<Col>
  <Card elevation=0 outlined>
    <CardTitle >Outlined and elevation 0</CardTitle>
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
