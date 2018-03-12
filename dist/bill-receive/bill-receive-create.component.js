'use strict';

var names = ['Conta de Luz', 'Conta de água', 'Conta de telefone', 'Internet', 'Gasolina'];

window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <div class="container">\n            <div class="row">\n                <h4>{{titleForm}}</h4>\n                <form name="form" @submit.prevent="submit" class="black-text">\n                    <div class="row">\n                        <div class="col s10">\n                            <label class="deep-purple-text darken-1s">Vencimento:</label>\n                            <input type="date" v-model="bille.date_due | dateFormat" class="validate"/>\n                        </div>\n                    </div>\n                    \n                    <div class="row">\n                        <div class="col s10">\n                            <label class="deep-purple-text darken-1s active">Nome:</label>\n                            <select v-model="bille.name | stringToUpperCase" id="name" class="browser-default deep-purple lighten-5">\n                                <option value="" disabled selected>Escolha uma Conta</option>\n                                <option v-for="o in names" v-model="o">{{ o | stringToUpperCase}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    \n                    <div class="row">\n                        <div class="col s10">\n                            <label class="deep-purple-text darken-1s">Valor:</label>\n                            <input type="text" v-model="bille.value | numberFormat" class="form-control"/>    \n                        </div>\n                    </div>\n                                        \n                    <div class="row">\n                        <div class="col s10">                            \n                            <input type="checkbox" class="filled-in" v-model="bille.done" id="recebido"/>\n                            <label class="deep-purple-text darken-1s" for="recebido">Conta recebida?</label>\n                        </div>\n                    </div>\n                                                                                                  \n                    <div class="row">\n                        <div class="col s6">\n                            <a href="#" @click="submit" class="waves-effect waves-light btn-large green darken-3 white-text">\n                                <i class="material-icons right">save</i>Salvar\n                            </a> \n                        </div>   \n                        <div class="col s6">\n                            <a v-link="{name: \'bill-receive.list\'}" class="waves-effect waves-light btn-large red white-text">\n                                <i class="material-icons right">cancel</i>Cancelar\n                            </a>\n                        </div>    \n                    </div>\n                </form>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bille: new BillPay(),
            titleForm: ''
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.titleForm = 'Editando Conta';
            this.getBill(this.$route.params.id);
        } else {
            this.titleForm = 'Nova Conta';
        }
    },

    methods: {
        submit: function submit() {
            var data = JSON.stringify(this.bille); //this.bille.toJSON();
            var self = this;
            if (this.formType == 'insert') {
                Receives.created({}, data).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                Receives.updated({ id: this.bille.id }, data).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this = this;

            Receives.edit({ id: id }).then(function (response) {
                _this.bille = response.data;
            });
        }
    }
});