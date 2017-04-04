Vue.component('person', {
    template: '#person',
    props: ['person']
});

Vue.component('results', {
    template: '#results',
    props: ['results'],
    computed: {
        output: function() {
            vm = this;
            if (vm.results.length == 0) {
                return "";
            } else {
                return vm.results.map(function(item) {
                        return item.mail
                    }).reduce(function(a,b) {
                        return b + ";\n" + a
                    });
            }
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
            results: []
        }
    },
    methods: {
        ldapCallback: function(item) {
            this.current = item;
            this.results.push(item);
        },
        clear: function(){
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
        }
    }
});