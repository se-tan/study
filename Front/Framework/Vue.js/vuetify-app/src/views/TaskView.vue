<style scoped>
.wrap-text {
  word-break: break-all;
  white-space: normal;
}
.lists {
  align-items: unset;
}
</style>

<template>
  <v-list>
    <v-list-item class="lists">
      <div
        v-for="(list, index) in lists"
        :key="index"
        style="
          min-width: 260px;
          max-width: 400px;
          width: 100%;
          user-select: none;
        "
        class="ma-1 pa-3 grey lighten-3 rounded-lg"
      >
        <div class="text-h6 mb-2">{{ list.name }}</div>
        <v-list-item-content
          v-for="(task, index) in list.tasks"
          :key="index"
          @mousedown="mouseDown"
          draggable="true"
        >
          <v-card class="pa-2" style="pointer-events: none">
            <v-list-item-title class="text-subtitle-2 wrap-text">
              {{ task.name }}
            </v-list-item-title>
            <v-list-item-subtitle
              v-show="task.description"
              class="text-caption wrap-text mt-2"
            >
              {{ task.description }}
            </v-list-item-subtitle>
            <v-list-item-title class="text-subtitle-2 text-right mt-2">
              {{ task.user_name }}
            </v-list-item-title>
          </v-card>
        </v-list-item-content>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      element: "",
      dragging: false,
      pageX: 0,
      pageY: 0,
      top: 0,
      left: 0,
      lists: [
        {
          id: 1,
          name: "ToDo",
          tasks: [
            {
              id: 1,
              name: "レポートの作成",
              description: "コロナの影響による飲食店の倒産件数の調査",
              user_name: "鈴木",
            },
            {
              id: 2,
              name: "業界の調査",
              description: "",
              user_name: "佐藤",
            },
            {
              id: 3,
              name: "ウェビナーの開催",
              description: "",
              user_name: "鈴木",
            },
            {
              id: 7,
              name: "メルマガの送信(毎週)",
              description: "",
              user_name: "鈴木",
            },
            {
              id: 8,
              name: "社内セキュリティトレーニング再テスト",
              description: "",
              user_name: "鈴木",
            },
          ],
        },
        {
          id: 2,
          name: "作業中",
          tasks: [
            {
              id: 4,
              name: "見積の作成",
              description: "",
              user_name: "山田",
            },
          ],
        },
        {
          id: 3,
          name: "完了",
          tasks: [
            {
              id: 5,
              name: "B社への支払い",
              description: "経理への連絡を忘れないように",
              user_name: "鈴木",
            },
            {
              id: 6,
              name: "鈴木さんの休暇申請承認",
              description: "",
              user_name: "佐藤",
            },
          ],
        },
      ],
    };
  },
  methods: {
    mouseDown(e) {
      this.dragging = true;
      this.element = e.target;
      this.element.style.position = "absolute";
      this.pageX = e.pageX;
      this.pageY = e.pageY;
      this.top = this.element.getBoundingClientRect().top;
      this.left = this.element.getBoundingClientRect().left;
      console.log("Mouse down events activated.");
    },
    mouseMove(e) {
      if (this.dragging) {
        const moveX = e.pageX - this.pageX;
        const moveY = e.pageY - this.pageY;
        this.element.style.top = `${this.top + moveY}px`;
        this.element.style.left = `${this.left + moveX}px`;
      }
    },
    mouseUp() {
      this.dragging = false;
      console.log("Mouse up events activated.");
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("mouseup", this.mouseUp);
  },
  beforeunMount() {
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);
  },
};
</script>
