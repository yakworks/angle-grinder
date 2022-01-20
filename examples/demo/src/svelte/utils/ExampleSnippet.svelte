<script>
  import { Page, Navbar, Block } from '@yakit/svelte/index'
  import Code from './Code.svelte'
  const jq = window.$

  export let lang = 'html'
  export let code
  export let horizontal = true

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

<div use:init class="example-section mb-4 {className}">
  <div class="example" class:is-horizontal="{horizontal}">
    <div class="example-component">
      <slot/>
    </div>
    <div class="codeview">
      <Code {lang} {code} />
    </div>
  </div>
</div>


