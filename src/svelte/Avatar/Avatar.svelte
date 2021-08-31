<script>
  import { onMount } from 'svelte'
  // import { classNames } from '../utils/helpers';
  import { ClassBuilder } from "../utils/classes.js"

  export let clazz = ''
	export { clazz as class } //work around since class is reserved

  export let name = ''
  export let letters = ''
  export let charCount = 2
  export let imgSrc = ''
  export let imgName
  export let square = false
  export let imgClass = ''
  export let dot = false

  const cbuilder = new ClassBuilder(clazz);

  let classes
  let lettersClass

  $: {
    //FIXME hard coded for now, pull baseUrl from config
    if(imgName && !imgSrc) imgSrc = `/assets/images/photos/${imgName}`// getAvatarUrl(imgName)
    if(square) imgClass = `${imgClass} is-squared`
    classes = cbuilder
      .flush()
      .add('is-squared', square)
      .add('has-dot', dot)
      .add('has-dot-squared', (dot && square))
      .add(`dot-${dot}`, _.isString(dot))
      .get();

    if(name && !imgSrc){
      name = name.trim()
      let splitString = name.split(/(?=[A-Z])/)
      if (charCount > splitString.length) {
        charCount = splitString.length
      }
      for (let i = 0; i < charCount; i++) {
        letters = letters + splitString[i].charAt(0)
      }

      letters = letters.toUpperCase()
    }

    if(letters){
      lettersClass = 'letter-color-' + letters.charAt(0).toLowerCase()
    }
  }

</script>

<span class="is-avatar {classes}">
  {#if imgSrc}
    <img class="avatar {imgClass}" src="{imgSrc}"  alt="">
  {/if}
  {#if letters}
    <span class="avatar is-letter {lettersClass}">
        <span>{letters}</span>
    </span>
  {/if}
</span>
