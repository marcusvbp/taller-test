<template lang="html">
  <div class="ticket-filter">
    <h4>Filtrar por</h4>
    <div class="filters control is-grouped">
      <p class="control filter">
        <span class="select">
          <select v-model="SelectedCat" id="catfilter">
            <option value="" selected>Categoria</option>
            <option v-for="item in categories">{{item}}</option>
          </select>
        </span>
      </p>
      <p class="control filter">
        <span class="select">
          <select v-model="SelectedProduct" id="prodfilter">
            <option value="" selected>Produto</option>
            <option v-for="item in products">{{item}}</option>
          </select>
        </span>
      </p>
      <p class="control filter-actions">
        <button class="button is-info" @click="doFilter()">Filtrar</button>
      </p>
    </div>
  </div>
</template>

<script>
import {bus} from '../config/event-bus';

export default {
  name: 'TicketFilter',
  props: ['categories', 'products'],
  data() {
    return {
      SelectedCat: '',
      SelectedProduct: ''
    }
  },
  methods: {
    doFilter: function() {
      bus.$emit("filtertickets", { cat: this.SelectedCat, prod: this.SelectedProduct });
    }
  }
}
</script>

<style lang="scss">
.ticket-filter {
  margin-bottom: 10px;
  h4 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
