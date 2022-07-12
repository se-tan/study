import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [
      {
        id: 1,
        name: 'AWSの学習',
        labelIds: [1, 3],
        done: false,
      },
      {
        id: 2,
        name: 'Vue.jsの学習',
        labelIds: [1, 2],
        done:true,
      },
      {
        id: 3,
        name: 'Spring Bootの学習',
        labelIds: [1, 2],
        done: true,
      },
      {
        id: 4,
        name: 'CCNAの学習',
        labelIds: [1, 4],
        done: false,
      },
    ],
    
    labels: [
      {
        id: 1,
        text: '学習',
      },
      {
        id: 2,
        text: 'フレームワーク',
      },
      {
        id: 3,
        text: 'クラウド',
      },
      {
        id: 4,
        text: 'ネットワーク',
      },
    ],
    nextTaskId: 5,
    nextLabelId: 5,

    filter: null,
  },
  getters: {
    filteredTasks(state) {
      if(!state.filter) {
        return state.tasks;
      }
      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      });
    },
  },
  mutations: {
    addTask(state, { name, labelIds }){
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false,
      });
      state.nextTaskId++;
    },

    toggleTaskStatus(state, { id }){
      const filtered = state.tasks.filter(task => {
        return task.id === id;
      });
      filtered.forEach(task => {
        task.done = !task.done;
      })
    },
    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      });
      state.nextLabelId++;
    },
    changeFilter(state, { filter }) {
      state.filter = filter;
    },
    restore(state, { tasks, labels, nextTaskId, nextLabelId }) {
      state.tasks = tasks;
      state.labels = labels;
      state.nextTaskId = nextTaskId;
      state.nextLabelId = nextLabelId;
    }
  },
  actions: {
    save({ state }) {
      const data = {
        tasks: state.tasks,
        labels: state.labels,
        nextTaskId: state.nextTaskId,
        nextLabelId: state.nextLabelId,
      };
      localStorage.setItem('task-app-data', JSON.stringify(data));
    },
    restore({ commit }) {
      const data = localStorage.getItem('task-app-data');
      if (data) {
        commit('restore', JSON.parse(data));
      }
    },
  },
  modules: {
  }
})
