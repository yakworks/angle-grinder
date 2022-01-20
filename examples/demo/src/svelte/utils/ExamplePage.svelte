<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import ExampleSnippet from '../utils/ExampleSnippet.svelte'

  export let title = 'Example'
  export let code
  export let horizontal = true
  export let backLink = true

  let className = undefined;
  export { className as class };

  let showCode = false

  function show() {
    showCode = true
  }

  function hide(e) {
    e.stopPropagation()
    showCode = false
  }

  function init(node) {
    // const rippleElement = node.querySelector(`.${_btn__ripple__base}`)
    const eComp = jq(node).find('.example-component')
    const srcHeight = eComp.innerHeight() - 32
    jq(node).find('.hljs-container').css('max-height', (srcHeight < 300) ? 300 : srcHeight)
  }

</script>

<Page>
  <Navbar {title} {backLink} />
  <Block>
    <ExampleSnippet {code} {horizontal}>
      <slot/>
    </ExampleSnippet>
  </Block>
</Page>


