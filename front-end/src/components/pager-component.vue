<template lang="html">
  <ul class="pager">
    <li>&laquo; Anterior</li>
    <li>Anterior &raquo;</li>
  </ul>
</template>

<script>
export default {
  name: "pager"
}
</script>

<style lang="scss">
.pager {
  margin-top: 20px;
  li {
    display: inline-block;
    line-height: 1em;
    padding-right: 10px;
    font-weight: bold;
    &+li {
      border-left: 1px solid #ccc;
      padding: 0 0 0 10px;
    }
  }
}
</style>
