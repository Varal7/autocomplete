var app = new Vue({
    el: '#app',
    components: {
        typeahead: VueStrap.typeahead
    },
    data: function() {
        return {
            ldapTemplate: '{{ item.mail }}',
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