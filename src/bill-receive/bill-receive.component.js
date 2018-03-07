window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component':billReceiveMenuComponent
    },
    template:`      
        <style type="text/css">         
            .green{
                color: red;
            }
            .gray{
                color: gray;
            }
            .red{
                color: green;
            }
            .minha-classe{
                background-color: cornsilk;
            }
        </style>
        <h3>{{ title }}</h3>
        <h5 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
            {{ status | statusGeneral1}}
        </h5>        
        <h5>{{ total | currency 'Total de R$ ' 2 }}</h5>
        <menu-component></menu-component>        
        <router-view></router-view>
    `,
    data(){
        return {
            title: "Contas a Receber",
            status: false,
            total: 0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods:{
        calculateStatus(receives) {
            if (!receives.length){
                this.status =  false;
            }
            var count = 0;
            for (var i in receives){
                if (!receives[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            Receive.query().then((response) => {this.calculateStatus(response.data);});
        },
        updateTotal() {
            Receive.totals().then((response) => {this.total = response.data;});
        }
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});