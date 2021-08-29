<script>
  import Code from './Code.svelte'

  export let lang = 'html'
  export let code
  export let horizontal = true

  let showCode = false

  function show() {
    showCode = true
  }

  function hide(e) {
    e.stopPropagation()
    showCode = false
  }
</script>

<div class="example-section mb-4">
  <div class="example" class:is-horizontal="{horizontal}">
    <div class="example-component">
      <slot/>
    </div>
    <div class="codeview">
      <Code {lang} {code} />
    </div>
  </div>
</div>

