Vue.component('person', {
    template: '#person',
    props: ['person']
});


Vue.component('results-table', {
    template: '#results-table',
    props: ['people', 'choices'],
    data: function() {
        var blank_person =  {
               uid: "",
               firstname: "",
               lastname: "",
               mail: "",
               promo: "",
               phone: "",
               room: "",
               comment: ""
        };
       return {
           blank_person: blank_person,
           new_person: JSON.parse(JSON.stringify(blank_person))
       };
    },
    methods: {
        delete_item: function(i) {
            console.log(i);
            this.$emit('delete_item', i)
        },
        clear: function() {
            this.$emit('clear')
        },
        add_item: function() {
            var new_person = JSON.parse(JSON.stringify(this.new_person));
            this.new_person = JSON.parse(JSON.stringify(this.blank_person));
            this.$emit('add_item', new_person)
        }
    }
});

Vue.component('results', {
    template: '#results',
    props: ['people', 'choices'],
    computed: {
        output: function() {
            vm = this;
            if (vm.people.length == 0) {
                return "";
            } else {
                return vm.people.map(function(item) {
                        var fields = [];
                        var c = vm.choices;
                        if (c.firstname) { fields.push(item.firstname) }
                        if (c.lastname) { fields.push(item.lastname) }
                        if (c.mail) { fields.push(item.mail) }
                        if (c.promo) { fields.push(item.promo) }
                        if (c.phone) { fields.push(item.phone) }
                        if (c.room) { fields.push(item.room) }
                        if (c.comment) { fields.push(item.comment) }
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
            people: [],
            choices: {
                mail : true,
                phone: false,
                firstname: false,
                lastname: false,
                room: false,
                promo: false,
                comment: false
            }
        }
    },
    methods: {
        ldapCallback: function(item) {
            if (item) {
                this.current = item;
                this.current["comment"] = ""
                this.people.unshift(this.current);
            }
        },
        clear: function() {
            this.people = [];
        },
        delete_item: function(i) {
            this.people.splice(i, 1);
        },
        add_item: function(item) {
            this.people.unshift(item);
        }
    },
    watch: {
        people: function(val) {
            localStorage.people = JSON.stringify(this.people);
        }
    },
    created: function() {
        var r = localStorage.people;
        if (r) {
            var res = JSON.parse(r);
            this.people = res;
            var newest = res[0];
            if (newest && newest.uid != "") {
                this.current = newest;
            }
        }
    }
});
