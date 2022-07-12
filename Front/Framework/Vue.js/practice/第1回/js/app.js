var items = [
    {
        name: '鉛筆',
        price: 300,
        quantity: 0
    },
    {
        name: 'ノート',
        price: 400,
        quantity: 0
    },
    {
        name: '消しゴム',
        price: 500,
        quantity: 0
    }
]

var vm = new Vue({
    // マウント定義
    el: '#app',
    data: {
        items: items,
    },
    
    // フィルタ定義
    filters: {
        numberWithDelimiter: function (value) {
            if (!value) {
                return '0'
            }
            return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        }
    },

    // メソッドの定義
    // メソッドは呼び出されるたびに再計算される
    methods: {
        doBuy: function() {
            alert(this.totalPriceWithTax + '円のお買い上げ')
            this.items.forEach(function(item) {
                item.quantity = 0
            })
        }
    },

    // 算出プロパティ
    // 関数として実装、参照時はプロパティとして機能
    // DOM要素に変更がなければ再計算を実行しない
    computed: {
        totalPrice: function() {
            return this.items.reduce(function(sum, item) {
                return sum + (item.price * item.quantity)
            }, 0)
        },

        totalPriceWithTax: function() {
            return Math.floor(this.totalPrice * 1.08)
        },

        canBuy: function() {
            return this.totalPrice >= 1000
        },

        errorMessageStyle: function() {
            return {
                border: this.canBuy ? '' : '1px solid red',
                color:  this.canBuy ? '' : 'red'
            }
        }
    }
})
window.vm = vm