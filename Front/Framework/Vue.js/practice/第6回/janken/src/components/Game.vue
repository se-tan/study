<template>
  <div id="game">
      <div v-if="resultMessage" class="result">
          <h2>{{ resultMessage }}</h2>
          <div><button @click="start">もう一度</button></div>
      </div>

      <div class="imgArea"><img :key="src" alt="" /></div>
      <ul>
          <li>
              <button @click="onSelected" class="button" type="button" value="0">グー</button>          
          </li>
          <li>
              <button @click="onSelected" class="button" type="button" value="1">チョキ</button>          
          </li>          
          <li>
              <button @click="onSelected" class="button" type="button" value="2">パー</button>          
          </li>              
      </ul>
  </div>
</template>

<script>
import * as babel from 'babel-core';
import Storage from '../util/Storage.js';
let storage = new Storage();

export default {
    name: 'game',
    props: ['scores'],
    data() {
        return {
            src: 'dist/imgs/choki.png',
            imgList: [
                'dist/imgs/gu.png',
                'dist/imgs/choki.png',
                'dist/imgs/par.png',
            ],
            timer: null,
            resultMessage: '',
        };
    },
    created() {
        this.start();
    },
    methods: {
        changeImg(number) {
            if(number && Math.abs(number) <= this.imgList.length) {
                this.src = this.imgList[number];
            } else {
                let num = Math.floor(Math.random() * this.imgList.length);
                this.src = this.imgList[num];
            }
        },
        start() {
            this.reset();
            this.timer = setInterval(() => {
                this.changeImg();
            }, (1000 / 12));
        },
        onSelected(e) {
            clearInterval(this.timer);

            let button = e.target;
            let resultNum = perseInt(this.imgList.indexOf(this.src), 10);
            let selectNum = perseInt(button.value, 10);
            let decision = this.decisionJanken(selectNum, resultNum);

            let btns = document.querySelectorAll('.button');
            for(let btn of btns) {
                btn.setAttribute('disabled', true);
            }

            if(decision == 1) {
                this.resultMessage = 'かち';
            } else if(decision == 2) {
                this.resultMessage = '引き分け'
            } else {
                this.resultMessage = 'まけ';
            }
            this.$parent.$data.scores.push({ message: this.resultMessage });
            button.classList.add('is-selected');
        },
        reset() {
            let btns = document.querySelectorAll('.button');
            for(let btn of btns) {
                btn.removeAttribute('disabled');
                btn.classList.remove('is-selected');
            };
            this.resultMessage = '';
        },
        decisionJanken(myHand, youHand) {
            let result = 0;

            switch(myHand) {
                
            };
            return result;
        }
    }
}
</script>

<style>

</style>