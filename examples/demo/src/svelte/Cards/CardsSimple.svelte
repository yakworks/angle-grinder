<script>
  import { Card, Columns, Col } from '@yakit/svelte'
</script>

<div class="title is-5">Simple Cards</div>

<Columns>
<Col>
  <Card content="simple card with plain text, cards can also contain header,
                  footer, list view, image, or any other element."/>
</Col>
<Col>
  <Card title="Card header"
      content="Card with header and footer. "
      footer="Card footer"
    />
</Col>
</Columns>
