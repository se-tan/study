const imageThumbnail = Vue.component('image-thumbnail', {
    props: {
        path: {
            type: String,
            default: '',
        }
    },

    template: `
        <div
            class="img-box"
            :style="{ backgroundImage: 'url(' + path + ')' }"
            @click="$emit('clickimage')"
        ></div>`
});

const modal = Vue.component('modal', {
    props: {
        isShown: {
            type: Boolean,
            default: false,
        },

        imagePath: {
            type: String,
            default: '',
        },
    },

    template: `
        <div
            v-if="isShown"
            class="modal"
            @click="$emit('close')"
        >
        <img
            class="modal-img"
            :src="imagePath"
            alt="selectedImage"
        /></div>`
});

const app = new Vue({
    el: '#app',
    components: {
        'image-thumbnail': imageThumbnail,
        modal
    },
    data() {
        return {
            isShown: false,
            selectedImage: '',
            images: [
                { path: '../img/img1.jpg', },
                { path: '../img/img2.jpg', },
                { path: '../img/img3.jpg', },
                { path: '../img/img4.jpg', },
                { path: '../img/img5.jpg', },
                { path: '../img/img6.jpg', },
                { path: '../img/img7.jpg', },
                { path: '../img/img8.jpg', },
                { path: '../img/img9.jpg', },
            ],
        };
    },
    methods: {
        onSelectImage: function (path) {
            this.setImage(path);
            this.openModal();
        },
        openModal: function () {
            this.isShown = true;
        },
        closeModal: function () {
            this.isShown = false;
        },
        setImage: function (path) {
            this.selectedImage = path;
        },
    },
})