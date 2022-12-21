import { createStore } from "vuex";

interface StateInterface {
  defaultFontSize: number;
  isDarkTheme: boolean;
  CurrentfontSize: number;
}


export default createStore({
  state() {
    return {
      defaultFontSize: 16,
      isDarkTheme: false,
      CurrentfontSize: 16
    };
  },
  mutations: {

    changeFontSizeMutation(state: StateInterface, value: number) {
      state.CurrentfontSize = value;
    }

  },
  getters: {
    getCurrentFontSize(state: StateInterface) {
      return state.CurrentfontSize;
    }
  },
  actions: {

    changeFontSize({ state, commit }, operation: string) {
      let currentfontSize = state.CurrentfontSize;
      switch (operation) {
        case "INCREASE_FONT_SIZE" :
          currentfontSize++;
          break;
        case "DECREASE_FONT_SIZE":
          currentfontSize--;
          break;
        case "RESET_FONT_SIZE":
          currentfontSize = state.defaultFontSize;
          break
        default:
          return false;
      }
      commit("changeFontSizeMutation", currentfontSize);
    },

    setFontSize({ state, commit }, value: number) {
      commit("changeFontSizeMutation", value);
    }

  },
  modules: {}
});
