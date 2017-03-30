<template>
  <div class="container">
    <UserMenu />

    <h1 class="has-text-centered">Bem-vindo ao Suporte</h1>

    <alert :type="alertType" :closable="true" v-if="showAlert" :on-close="resetAlert">
      {{ alertMsg }}
    </alert>

    <p>
      <button class="button is-primary is-large" @click="toggleModal()">Abrir um novo ticket</button>
      <modal
            title="Novo Ticket"
            :width="700"
            :is-show="showAddTicketModal"
            transition="fadeDown"
            @close="showAddTicketModal=false"
            :show-ok="false"
            :show-cancel="false">

        <div class="control">
          <p class="control">
            <span class="select">
              <select v-model="newTicket.prod">
                <option selected value="" disabled>Selecione um Produto</option>
                <option v-for="item in allProducts">{{ item }}</option>
              </select>
            </span>
            <span class="select">
              <select v-model="newTicket.cat">
                <option selected value="" disabled>Selecione uma Categoria</option>
                <option v-for="item in allCategories">{{ item }}</option>
              </select>
            </span>
          </p>
          <p class="control">
            <textarea class="textarea" placeholder="Descreva o seu pedido" v-model="newTicket.description"></textarea>
          </p>
          <p class="has-text-right">
            <button class="button" @click="showAddTicketModal=false">Cancelar</button>
            <button class="button is-primary" :disabled="disableSaveBtnModal" @click="saveNewTicket">Salvar</button>
          </p>
        </div>
      </modal>
    </p>
    <fieldset id="ticket-history">
      <legend>Histórico de Tickets</legend>
      <div class="fieldset-content">
        <TicketFilter :categories="allCategories" :products="allProducts" />

        <data-table :data="filteredTickets" bordered :striped="true">
          <column label="Código do Ticket" field="cod">
            <template scope="row">
              <router-link :to="'/details/'+row._id+'/'+row.cod">
                {{ row.cod }}
              </router-link>
            </template>
          </column>
          <column label="Categoria" field="cat"></column>
          <column label="Produto" field="prod"></column>
          <column label="Criado em" field="createdAt" sorter="custom"></column>
          <column label="Última Atualização" field="updatedAt" sorter="custom"></column>
          <column label="Atendido por" field="associated"></column>
          <column label="Status" field="status">
            <template scope="row">
              <div v-if="createLinkResponder(row.status)">
                <router-link :to="'/details/'+row._id+'/'+row.cod+'?responder=true'" :title="row.status">
                  Responder
                </router-link>
              </div>
              <div v-if="!createLinkResponder(row.status)">
                {{ row.status }}
              </div>
            </template>
          </column>
        </data-table>

        <pager  class="has-text-centered" />
      </div>
    </fieldset>
  </div>
</template>

<script>
import UserMenu from '../user-menu-component.vue'
import pager from '../pager-component.vue'
import TicketFilter from '../ticket-filter-component.vue'
import dateFormat from 'dateformat'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import axios from 'axios'

import {bus} from '../../config/event-bus'

export default {
  name: 'index',
  data () {
    return {
      showAlert: false,
      alertMsg: '',
      showAddTicketModal: false,
      alertType: 'info',
      filteredTickets: [],
      newTicket: {
        prod: '',
        cat: '',
        updatedAt: '',
        createdAt: '',
        status: 'aberto',
        associated: 'Marcus',
        description: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'doAddTickets'
    ]),
    createLinkResponder: function(string) {
      if (string == "Aguardando") {
        return true;
      }
    },
    toggleModal: function() {
      this.showAddTicketModal = !this.showAddTicketModal;
    },
    filterTickets: function(items, filters) {
      let filtered = [];
      let cat = filters.cat;
      let prod = filters.prod;

      if (!cat && !prod) {
        return items;
      }
      items.filter(function(item) {
        if (cat && prod) {
          if (item.cat == cat && item.prod == prod) {
            filtered.push(item);
          }
        } else {
          if (cat && item.cat == cat) {
            filtered.push(item);
          }
          if (prod && item.prod == prod) {
            filtered.push(item);
          }
        }
      });
      return filtered;
    },
    saveNewTicket: function() {
      this.alertMsg = "Ticket salvo com sucesso!";
      this.showAlert = true;
      this.alertType = "success";

      let newT = JSON.parse(JSON.stringify(this.newTicket));

      newT.cod = Math.random().toString().replace(/[^0-9]+/g, '').substr(0, 6);
      newT.createdAt = dateFormat(new Date(), 'dd/mm/yyyy');

      axios.post('http://localhost:3000/tickets', newT).then((success) => {
        this.doAddTickets(success.data).then(
          () =>{
            this.newTicket.cat = "";
            this.newTicket.prod = "";
            this.newTicket.description = "";

            this.showAddTicketModal = false;
          }
        );
      },
      (err) => {
        console.log("Erro ao postar novo ticker", err);
      })

    },
    resetAlert: function() {
      this.showAlert = false;
    }
  },
  computed: {
    disableSaveBtnModal: function() {
      if (!this.newTicket.prod || !this.newTicket.cat || !this.newTicket.description) {
        return true;
      }
    },
    ...mapGetters([
      'allCategories',
      'allProducts',
      'allTickets'
    ]),
  },
  created: function() {
    if (this.allTickets.length == 0) {
      axios.get('http://localhost:3000/tickets').then(
        (res) => {
          res.data.map((item) => {
            this.doAddTickets(item.doc);
          })
        }, (err) => {
          console.log("Erro ao obter os tickets do servidor", err);
        })
    }
  },
  mounted: function() {
    this.filteredTickets = this.allTickets;
    bus.$on('filtertickets', data => {
      this.filteredTickets = this.filterTickets(this.allTickets, data);
    })
  },
  components: { UserMenu, pager, TicketFilter }
}
</script>

<style lang="scss">
  .container {
    padding-top: 40px;
    h1 {
      font-size: 36px;
      margin: 0 0 40px 0;
      font-weight: bold;
    }
    p {
      margin: 0 0 15px 0;
    }
    fieldset {
      border: 1px solid #ccc;
      legend {
        padding: 10px 10px;
        margin-left: 10px;
      }
      .fieldset-content {
        padding: 20px;
      }
    }
  }
</style>
