<script>
  import { Button, Button7 } from '@yakit/svelte/index'

  let component;
	let props;

	const button1 = () => {
		component = Button;
		props = {text: "normal"};
	};

	const button2 = () => {
		component = Button;
		props = {text: "f7"};
	};

	button1();

</script>

<button on:click={button1}>button</button>
<button on:click={button2}>f7</button>
<svelte:component this={component} {...props}/>
