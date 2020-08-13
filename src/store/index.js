import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playingId: 0,
        keyWord: '',
    },
    mutations: {
        changePlayId(state, newId) {
            state.playingId = newId;
        },

        changeKeyWord(state, newKeyWord) {
            state.keyWord = newKeyWord;
        }
    },
    actions: {},
    modules: {}
})