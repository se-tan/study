const app = new Vue({
    el: '#app',
    data() {
        return {
            text: 'hello Vue.js',
            count: 0,
            name: '',
            email: '',
            tel: '',
            fruits: [
                'apple', 'grape', 'pineapple', 'strawberry'
            ],
            items: [
                { id: 1, label: "子" },
                { id: 2, label: "丑" },
                { id: 3, label: "寅" },
            ],
            menus: [
                { title: 'TOP', path: './index.html',},
                { title: 'ABOUT', path: './about.html',},
                { title: 'SCHEDULE', path: './schedule.html',},
                { title: 'CONTACT', path: './contact.html',}
            ],
        };
    },

    computed: {
        isPass: function() {
            return this.count >= 60;
        },

        isInvalidName: function() {
            return this.name.length < 4;
        },

        isInvalidEmail: function() {
            const regex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/) 
            return !regex.test(this.email);
        },

        isInvalidTel: function() {
            const tel = this.tel;
            const isErr = tel.length < 8 || isNaN(Number(tel));
            return isErr;
        }
    },

    methods: {
        handleClick: function() {
            this.text = 'button pushed';
        },

        increment: function() {
            this.count++;
        },

        decrement: function() {
            this.count--;
        }
    }
});
