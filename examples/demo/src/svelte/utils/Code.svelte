<script>
  import Clipboard from 'clipboard'
  import hljs from 'highlight.js/lib/core'
  import { onMount, onDestroy } from 'svelte'

  export let lang = 'js'
  export let code = ''
  $: hljsCode = hljs.highlightAuto(code, [lang]).value
  export let showCopy = true
  export let maxHeight = '300px'


  onMount(async () => {

  })

  onDestroy(() => {
    // if (clip) clip.destroy()
    // if (observer) observer.disconnect()
  })
</script>

<div class="hljs-container" style="max-height: {maxHeight}">
  <pre>
    <code class="hljs {lang}"  >
      {@html hljsCode}
    </code>
  </pre>
</div>

