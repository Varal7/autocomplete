var app = new Vue({
    el: '#app',
    components: {
        modal: VueStrap.modal
    },
    data: {
        modal : {
            fields: false,
            search: false,
            results: false,
            add: false,
            comment: false
        }
    }
});