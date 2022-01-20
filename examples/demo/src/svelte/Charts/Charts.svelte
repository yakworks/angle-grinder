<script>
  import { Card, Columns, Col } from '@yakit/svelte'
  import DsoSparkline from './DsoSparkline.svelte';
  import SalesSparkline from './SalesSparkline.svelte';
  import ColumnChart from './ColumnChart.svelte';
  import BarChart from './BarChart.svelte';
</script>

<div class="title is-5">CHARTS</div>

<Columns>
<Col>
  <Card>
    <DsoSparkline/>
  </Card>
</Col>
<Col>
  <Card>
    <SalesSparkline/>
  </Card>
</Col>
<Col>
  <Card>
    <ColumnChart/>
  </Card>
</Col>
<Col>
  <Card>
    <BarChart/>
  </Card>
</Col>
</Columns>
