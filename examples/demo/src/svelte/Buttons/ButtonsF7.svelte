<script>
  import { Block, BlockTitle,
    Button7, Segmented, Col, Row } from '@yakit/svelte/index'

  let activeBtn = 'bt3'

  let segBtnClick = (id) => () => {
    activeBtn = id
  }

  let isLoading = false;

  const load = () => {
    if (isLoading) return;
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
    }, 4000);
  };

</script>

  <!-- <Navbar title="Buttons" /> -->

  <BlockTitle>Segmented</BlockTitle>
  <Block strong>
    <Segmented raised tag="p" class='m-2'>
      <Button7>Button7</Button7>
      <Button7>Button7</Button7>
      <Button7 active>Active</Button7>
    </Segmented>
    <Segmented strong tag="p" round class='m-2'>
      <Button7 round active={activeBtn === 'bt1'} on:click={segBtnClick('bt1')}>Open</Button7>
      <Button7 round active={activeBtn === 'bt2'} on:click={segBtnClick('bt2')}>Closed</Button7>
      <Button7 round active={activeBtn === 'bt3'} on:click={segBtnClick('bt3')}>All</Button7>
    </Segmented>
    <Segmented class='m-2'>
      <Button7 outline>Outline</Button7>
      <Button7 outline>Outline</Button7>
      <Button7 outline active>Active</Button7>
    </Segmented>
    <Segmented raised round class='m-2'>
      <Button7 round active={activeBtn === 'bt1'} on:click={segBtnClick('bt1')}>Open</Button7>
      <Button7 round active={activeBtn === 'bt2'} on:click={segBtnClick('bt2')}>Closed</Button7>
      <Button7 round active={activeBtn === 'bt3'} on:click={segBtnClick('bt3')}>All</Button7>
    </Segmented>
    <Segmented round class='m-2'>
      <Button7 round outline>Outline</Button7>
      <Button7 round outline>Outline</Button7>
      <Button7 round outline active>Active</Button7>
    </Segmented>
  </Block>

  <BlockTitle>Usual Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button7>Button7</Button7>
      </Col>
      <Col>
        <Button7>Button7</Button7>
      </Col>
      <Col>
        <Button7 round>Round</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Fill Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button7 fill>Button7</Button7>
      </Col>
      <Col>
        <Button7 fill>Button7</Button7>
      </Col>
      <Col>
        <Button7 fill round>Round</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Outline Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button7 outline>Button7</Button7>
      </Col>
      <Col>
        <Button7 outline>Button7</Button7>
      </Col>
      <Col>
        <Button7 outline round>Round</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Raised Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <Button7 raised>Button7</Button7>
      </Col>
      <Col tag="span">
        <Button7 raised fill>Fill</Button7>
      </Col>
      <Col tag="span">
        <Button7 raised outline>Outline</Button7>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button7 raised round>Round</Button7>
      </Col>
      <Col tag="span">
        <Button7 raised fill round>Fill</Button7>
      </Col>
      <Col tag="span">
        <Button7 raised outline round>Outline</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Segmented</BlockTitle>
  <Block strong>
    <Segmented raised tag="p">
      <Button7>Button7</Button7>
      <Button7>Button7</Button7>
      <Button7 active>Active</Button7>
    </Segmented>
    <Segmented strong tag="p">
      <Button7>Button7</Button7>
      <Button7>Button7</Button7>
      <Button7 active>Active</Button7>
    </Segmented>
    <Segmented tag="p">
      <Button7 outline>Outline</Button7>
      <Button7 outline>Outline</Button7>
      <Button7 outline active>Active</Button7>
    </Segmented>
    <Segmented raised round tag="p">
      <Button7 round>Button7</Button7>
      <Button7 round>Button7</Button7>
      <Button7 round active>Active</Button7>
    </Segmented>
    <Segmented round tag="p">
      <Button7 round outline>Outline</Button7>
      <Button7 round outline>Outline</Button7>
      <Button7 round outline active>Active</Button7>
    </Segmented>
  </Block>

  <BlockTitle>Large Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <Button7 large>Button7</Button7>
      </Col>
      <Col tag="span">
        <Button7 large fill>Fill</Button7>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button7 large raised>Raised</Button7>
      </Col>
      <Col tag="span">
        <Button7 large raised fill>Raised Fill</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Small Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <Button7 large small>Button7</Button7>
      </Col>
      <Col tag="span">
        <Button7 large small outline>Outline</Button7>
      </Col>
      <Col tag="span">
        <Button7 large small fill>Fill</Button7>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button7 large small round>Button7</Button7>
      </Col>
      <Col tag="span">
        <Button7 large small outline round>Outline</Button7>
      </Col>
      <Col tag="span">
        <Button7 large small fill round>Fill</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Preloader Button7</BlockTitle>
  <Block strong>
    <Button7 fill preloader loading={isLoading} onClick={load}>
      Load
    </Button7>
  </Block>

  <BlockTitle>Color Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button7 color="red">Red</Button7>
      </Col>
      <Col>
        <Button7 color="green">Green</Button7>
      </Col>
      <Col>
        <Button7 color="blue">Blue</Button7>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Color Fill Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button7 fill color="red">Red</Button7>
      </Col>
      <Col>
        <Button7 fill color="green">Green</Button7>
      </Col>
      <Col>
        <Button7 fill color="blue">Blue</Button7>
      </Col>
    </Row>
  </Block>

