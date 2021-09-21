
<script>
  import { onMount } from 'svelte'
  // import Button from 'angle-grinder/src/svelte/Button.svelte'
  import { Avatar } from 'angle-grinder/svelte'
  import { people } from '../../data/sample'
  import _ from 'lodash'

  let avatarData = _.cloneDeep(people).slice(0, 6)
  avatarData[0].size = 'is-small'
  avatarData[0].online = true
  avatarData[1].size = '' // nothing is is-normal
  avatarData[2].size = 'is-medium'
  avatarData[3].size = 'is-large'
  avatarData[3].online = true
  avatarData[4].size = 'is-xl'
  avatarData[5].size = 'is-xxl'

</script>

<div class="card">
  <div class="card-title">Avatars</div>
  <hr>
  <div class="card-content">
    <p>Avatars are rounded images used for media and personal pages. Avatar sizes can
      be controled with css classes. Available modifier classes are <code>is-small</code>,
      <code>is-medium</code>, <code>is-large</code>, <code>is-big</code> and
      <code>is-xl</code>. See code for more details about usage.
    </p>
    <Avatar class="is-small" imgSrc="/assets/images/photos/beard-guy.jpg"></Avatar>
    <Avatar imgSrc="/assets/images/photos/caldwell.jpg"></Avatar>
    <Avatar class="is-medium" imgSrc="/assets/images/photos/jefferson.jpg"></Avatar>
    <Avatar class="is-large" imgSrc="/assets/images/photos/douglas.jpg"></Avatar>
    <Avatar class="is-xl" imgSrc="/assets/images/photos/sowell.jpg"></Avatar>
    <Avatar class="is-xxl" imgSrc="/assets/images/photos/rand.jpg"></Avatar>

    <h1 class="title is-thin is-5 mt-5">Square</h1>

    {#each avatarData as item}
      <Avatar class="{item.size} mr-1" imgSrc="/assets/images/photos/{item.avatar}" square></Avatar>
    {/each}

    <h1 class="title is-thin is-5 mt-6 mb-2">Dots</h1>
    <p>Avatar dots can have different colors. Available modifier classes are
      <code>dot-primary</code>, <code>dot-info</code>, <code>dot-warning</code>,
      <code>dot-danger</code> and <code>dot-grey</code>. See code for more details about
      usage.
    </p>

    {#each avatarData as item}
      <Avatar class="{item.size} mr-1" imgSrc="/assets/images/photos/{item.avatar}" dot></Avatar>
    {/each}

    <hr class='my-4 mx-0'>

    {#each avatarData as item}
      <Avatar square class="{item.size} mr-1" imgSrc="/assets/images/photos/{item.avatar}" dot="danger" />
    {/each}

    <hr class='my-4 mx-0'>

    {#each avatarData as item}
      <span class="mr-1 avatar {item.size}">
        <img class="avatar-img" src="/assets/images/photos/{item.avatar}"  alt="">
        <img class="badge" src="https://via.placeholder.com/150x150" alt="">
      </span>
    {/each}

  </div>
</div>

<div class="card mt-4">
  <div class="card-title">Letter Avatars</div>
  <hr>
  <div class="card-content">

    {#each avatarData as item}
    <Avatar class="{item.size} mr-1" name="{item.name}"></Avatar>
    {/each}

    <span class="avatar">
      <span class="avatar-img is-letter is-primary">
        <span>JD</span>
      </span>
    </span>

  </div>
</div>

<div class="card mt-4">
  <div class="card-title">From Data with Fallback to Letter</div>
  <hr>
  <div class="card-content">
    {#each avatarData as item, i}
      <Avatar class="mr-1" name="{item.name}" imgName={item.avatar} dot={item.online} ></Avatar>
    {/each}
  </div>
</div>

