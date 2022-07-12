var headerTemplate = `
    <div>
        <slot name="header">No Title</slot>
    </div>
`

var contentTemplate = `
    <div>
        <slot name="content">No Content</slot>
    </div>
`
var auth = {
    login: function(id, pass){
        window.alert("userId:" + id + "\n" + "password:" + pass)
    }
}

Vue.component('user-login', {
    template: '#login-template',
    dsta: function() {
        return {
            userId: '',
            password: ''
        }
    },

    methods: {
        login: function() {
            auth.login(this.userId, this.password);
        }
    }
})

Vue.component('page-header', {
    template: headerTemplate
})

Vue.component('page-content', {
    template: contentTemplate
})

new Vue({
    el: "#fruits-list"
})