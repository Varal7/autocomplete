Vue.component('person', {
    template: '#person',
    props: ['person']
});

Vue.component('results', {
    template: '#results',
    props: ['results', 'choices'],
    computed: {
        output: function() {
            vm = this;
            if (vm.results.length == 0) {
                return "";
            } else {
                return vm.results.map(function(item) {
                        var fields = [];
                        var c = vm.choices;
                        if (c.firstname) { fields.push(item.firstname) }
                        if (c.lastname) { fields.push(item.lastname) }
                        if (c.mail) { fields.push(item.mail) }
                        if (c.promo) { fields.push(item.promo) }
                        if (c.phone) { fields.push(item.phone) }
                        if (c.room) { fields.push(item.room) }
                        return fields.join(";") }
                    ).join("\n");
            }
        }
    },
    methods: {
        export_csv: function() {
            var csvContent = "data:text/csv;charset=utf-8,";
            csvContent += this.output;
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        }
    }

});

var app = new Vue({
    el: '#app',
    components: {
        typeahead: VueStrap.typeahead
    },
    data: function() {
        return {
            ldapTemplate: '<div class="ldap-item"><div class="img-container"><img height="36px" :src="item.photo"></div><p><strong>{{item.firstname}} {{item.lastname}} ({{item.promo}})</strong> <br/> {{item.mail}}</p> </div>',
            current: null,
            results: [],
            choices: {
                mail : true,
                phone: false,
                firstname: false,
                lastname: false,
                room: false,
                promo: false}
        }
    },
    methods: {
        ldapCallback: function(item) {
            this.current = item;
            this.results.push(item);
        },
        clear: function() {
            this.results = [];
        }
    },
    watch: {
        results: function(val) {
            sessionStorage.results = JSON.stringify(this.results);
        }
    },
    created: function() {
        var r = sessionStorage.results;
        if (r) {
            var res = JSON.parse(r);
            this.results = res;
            this.current = res[0];
        }
    }
});