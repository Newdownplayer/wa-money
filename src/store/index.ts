import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from '@/lib/idCreator';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]") as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date().toISOString();
      state.recordList?.push(record2);
      store.commit('saveRecord')
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || "[]");
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      const id = createId().toString();
      if (names.indexOf(name) >= 0) { window.alert("标签名重复吖"); }
      state.tagList.push({ id, name });
      store.commit('saveTags');
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1)
      store.commit('saveTags');
    },
    updateTag(state, payload: { id: string, name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复吖');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      } else {
        return 'not found'
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }

  },
})

export default store
