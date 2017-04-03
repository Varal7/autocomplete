var app = new Vue({
    el: '#app',
    components: {
        typeahead: VueStrap.typeahead
    },
    data: function() {
        return {
            ldapTemplate: '<img width="18px" height="18px" :src="item.photo"> <span>{{item.mail}} - {{item.firstname}} {{item.lastname}} ({{item.promo}})</span> ',
        }
    },
    methods: {
        ldapCallback: function(items, targetVM) {
            const that = targetVM;
            that.reset();
            that.value = items.mail;
        }
    }
});