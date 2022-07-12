var app = new Vue({
    el: '#app',
    data() {
        return {
            width: 25,
            height: 50,
            color: '#333',
            bgColor: '#fcfcfa',
            range: 10,
            red: 0,
            blue: 0,
            green: 0,
            isActive: false,
            classObj: {
                // trueになっているものがクラス名に反映される
                error: true,
                'is-active': false,
            },
        };
    },

    computed: {
        bindStyle: function() {
            return `width: ${this.width}px; height: ${this.height}px; color: ${this.color};`;
        },

        bindColor: function() {
            return `width: ${this.range}px; height: ${this.range}px; background: rgb(${this.red}, ${this.green}, ${this.blue})`;
        },
    },

    methods: {
        toggleButton: function() {
            this.isActive = !this.isActive;
        }
    }
})