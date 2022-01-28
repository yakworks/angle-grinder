<script>
  export let isActive = false;
  export let isFirst = false;
  export let isHover = false;
  export let isSelectable = false;
  export let getOptionLabel = undefined;
  export let item = undefined;
  export let filterText = '';

  let itemClasses = '';

  $: {
      const classes = [];
      if (isActive) {
          classes.push('active');
      }
      if (isFirst) {
          classes.push('first');
      }
      if (isHover) {
          classes.push('hover');
      }
      if (item.isGroupHeader) {
          classes.push('groupHeader');
      }
      if (item.isGroupItem) {
          classes.push('groupItem');
      }
      if (!isSelectable) {
          classes.push('notSelectable');
      }
      itemClasses = classes.join(' ');
  }
</script>

<style>
  .item {
    cursor: default;
    min-height: var(--height, 42px);
    /* padding-top: 8px;*/
    /* line-height: var(--height, 42px); */
    padding: var(--itemPadding, 0px 8px 0 8px);
    color: var(--itemColor, inherit);
    text-overflow: ellipsis;
    /* overflow: hidden; */
    /* white-space: nowrap; */
  }

  .groupHeader {
      text-transform: var(--groupTitleTextTransform, uppercase);
  }

  .groupItem {
      padding-left: var(--groupItemPaddingLeft, 40px);
  }

  .item:active {
      background: var(--itemActiveBackground, #b9daff);
  }

  .item.active {
      background: var(--itemIsActiveBG, #007aff);
      color: var(--itemIsActiveColor, #fff);
  }

  .item.notSelectable {
      color: var(--itemIsNotSelectableColor, #999);
  }

  .item.first {
      border-radius: var(--itemFirstBorderRadius, 4px 4px 0 0);
  }

  .item.hover:not(.active) {
      background: var(--itemHoverBG, #e7f2ff);
      color: var(--itemHoverColor, inherit);
  }

  .flex-item {
    display: flex;
    min-height: var(--itemHeight, 42px);
    /* align-items: stretch;
    width: 100%;
    min-height: 60px;
    border-radius: 8px;
    border: 1px solid darken($fade-grey, 3%);
    padding: 8px;
    margin-bottom: 6px; */
  }

  .flex-cell {
    flex: 1 1 0px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-left: 8px;
    overflow: hidden;
  }

  .flex-cell:first-child {
    /* overflow: hidden; */
    padding-left: 0;
    border-right: 1px solid #ddd;
  }

  .flex-cell:last-child {
    flex: 3;
    padding-right: 0;
    /* overflow: unset; */
  }



</style>

<div class="item {itemClasses}">
  <div class="flex-item">
  {#each getOptionLabel(item, filterText) as label}
    <div class="flex-cell" data-th={label}> {label}</div>
  {/each}
  </div>
</div>
