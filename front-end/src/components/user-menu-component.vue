<template lang="html">
  <ul class="user-menu">
    <li><b>Usuário:</b> Helal Ferrari</li>
    <li><a href="#">Sair</a></li>
  </ul>
</template>

<script>
export default {
  name: "UserMenu"
}
</script>

<style lang="scss">
.user-menu {
  position: absolute;
  top: 10px;
  right: 0;
  li {
    display: inline-block;
    line-height: 1em;
    padding-right: 10px;
    &+li {
      border-left: 1px solid #ccc;
      padding: 0 0 0 10px;
    }
  }
}
</style>
