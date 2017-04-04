Vue.component('person', {
    template: '#person',
    props: ['person']
});

var app = new Vue({
    el: '#app',
    components: {
        typeahead: VueStrap.typeahead
    },
    data: function() {
        return {
            ldapTemplate: '<div class="ldap-item"><div class="img-container"><img height="36px" :src="item.photo"></div><p><strong>{{item.firstname}} {{item.lastname}} ({{item.promo}})</strong> <br/> {{item.mail}}</p> </div>',
            current: null
        }
    },
    methods: {
        ldapCallback: function(item, targetVM) {
            const that = targetVM;
            that.reset();
            that.value = item.mail;
            this.current = item;
        }
    }
});