<template lang="html">
  <div class="container">
    <UserMenu />

    <h1>Ticket {{ticket.cod}}</h1>

    <p>
      <b>Categoria</b>: {{ticket.cat}}
    </p>

    <p>
      <b>Produto</b>: {{ticket.prod}}
    </p>

    <p>
      <b>Data</b>: {{ticket.createdAt}}
    </p>
    <p>
      <b>Status</b>: {{ticket.status}}
    </p>
    <p>
      <b>Descrição</b>:<br>
      {{ticket.description}}
    </p>
    <hr>
    <p class="has-text-right">
      <button class="button is-primary is-large" @click="toggleAnswerModal()">Responder</button>
      <button class="button is-danger is-large" @click="closeTicket()" v-if="isOpened">Fechar ticket</button>
    </p>

    <modal
          title="Responder ao ticket"
          :width="700"
          :is-show="showAnswerModal"
          transition="fadeDown"
          @close="showAnswerModal=false"
          :show-ok="false"
          :show-cancel="false">

      <div class="control">
        <p class="control">
          <label class="label">Autor do comentário</label>
          <input type="text" class="input" value="Marcus" disabled>
        </p>
        <p class="control">
          <textarea class="textarea" placeholder="Faça seu comentário" v-model="newAnswerMsg"></textarea>
        </p>
        <p class="has-text-right">
          <button class="button" @click="showAnswerModal=false">Cancelar</button>
          <button class="button is-primary" :disabled="!newAnswerMsg" @click="saveAnswer()">Salvar</button>
        </p>
      </div>
    </modal>
    <h2 v-if="hasComment">Histórico de Atendimento</h2>
    <div class="comments">
      <div class="comment" v-for="item in ticket.comments">
        <p>
          <b>Data</b>: {{item.date}} - <b>Autor</b>: {{item.author}}
        </p>
        <div class="content">
          {{item.text}}
        </div>
        <hr>
      </div>
      <p class="has-text-right" v-if="hasComment">
        <button class="button is-primary is-large" @click="toggleAnswerModal()">Responder</button>
        <button class="button is-danger is-large" @click="closeTicket()" v-if="isOpened">Fechar ticket</button>
      </p>
    </div>
  </div>
</template>

<script>
import UserMenu from '../user-menu-component.vue'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import dateFormat from 'dateformat'
import axios from 'axios'

export default {
  name: "detailpage",
  computed: {
    ...mapGetters({
      getTicket: 'Ticket'
    }),
    hasComment: function() {
      if (this.ticket.comments && this.ticket.comments.length > 0) {
        return true;
      }
    },
    isOpened: function() {
      if (this.ticket.status != "Fechado") {
        return true;
      }
    }
  },
  methods: {
    ...mapActions([
      'doUpdateTicket',
      'doAddTickets'
    ]),
    toggleAnswerModal: function() {
      this.showAnswerModal = !this.showAnswerModal;
    },
    saveAnswer: function() {
      let dt = dateFormat(new Date(), 'dd/mm/yyyy H:M:ss');
      let comment = {
        author: 'Marcus',
        date: dt,
        text: this.newAnswerMsg
      };
      this.ticket.comments.push(comment);
      axios.put('http://localhost:3000/tickets', this.ticket).then(
        (success) => {
          this.ticket = success.data;
        },
        (error) => {
          console.log("Erro ao atualizar ticket", error);
        }
      );
      this.showAnswerModal = false;
      this.newAnswerMsg = "";
    },
    closeTicket: function() {
      this.ticket.status = "Fechado";
      axios.put('http://localhost:3000/tickets', this.ticket).then(
        (success) => {
          this.$router.push({path: '/' });
        },
        (error) => {
          console.log("Erro ao atualizar ticket", error);
        }
      );
    }
  },
  data() {
    return {
      ticket: {},
      showAnswerModal: false,
      newAnswerMsg: ''
    }
  },
  created: function() {
    this.ticket = this.getTicket(this.$route.params.ticket);
    if (!this.ticket) {
      axios.get('http://localhost:3000/tickets').then(
        (success) => {
          success.data.map((item) => {
            this.doAddTickets(item.doc).then(() => {
              if (item.doc._id === this.$route.params.id) {
                this.ticket = this.getTicket(this.$route.params.ticket);
              }
            });
          })
        }, (error) => {
          console.log("Erro ao obter os tickets do servidor", error);
        })
    }
  },
  mounted() {
    if (this.$route.query.responder === "true") {
      this.showAnswerModal = true;
    }
  },
  components: { UserMenu }
}
</script>

<style lang="scss">
.container {
  h2 {
    margin: 30px 0;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
