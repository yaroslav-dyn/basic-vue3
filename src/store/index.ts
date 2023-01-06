import { createStore } from "vuex";

export interface StateInterface {
  defaultFontSize: number;
  isDarkTheme: boolean;
  CurrentfontSize: number;
  showActionMenuState: boolean;
  currentOperation: {
    name: string,
    data: any
  } | null;
  filesArrayState: {
    name: string,
    data: string
  }[],
  currentDocSate: {
    name: string,
    data: string
  }
}

export default createStore({
  state() {
    return {
      defaultFontSize: 16,
      isDarkTheme: false,
      CurrentfontSize: 16,
      showActionMenuState: false,
      currentOperation: {
        name: "",
        data: ""
      },
      filesArrayState: [{name: '', data: ''}],
      currentDocSate: {name: '', data: ''}
    };
  },
  mutations: {

    changeFontSizeMutation(state: StateInterface, value: number) {
      state.CurrentfontSize = value;
      localStorage.setItem('currentFontSize', value.toString())
    },

    changeColorThemeMutation(state:StateInterface, value: boolean ) {
      state.isDarkTheme = value;
    },

    setCurrentOperationMutation(state: StateInterface, value: {name: string, data: any}) {
      state.currentOperation = value;
    },

    setActionMenuState(state: StateInterface, value: boolean) {
      state.showActionMenuState = value;
    },

    setCurrentFileMutation(state: StateInterface, value) {
      state.currentDocSate = value;
    },

    setFillesArrayMutation(state: StateInterface, data) {
      state.filesArrayState = data;
    }


  },
  getters: {

  },
  actions: {

    // TODO: move this method to runCommand.mixin
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
    },

    setColorTheme({state, commit}, value: boolean) {
      commit('changeColorThemeMutation', value);
    },

    setCurrentOperation({ state, commit }, data: {name: string, data: any}) {
      commit('setCurrentOperationMutation', data)
    },

    setCurrentFileAction({ state, commit }, data) {
      commit('setCurrentFileMutation', data);
    },

    setFilesArrayAction({ state, commit }, data) {
      commit('setFillesArrayMutation', data);
    }

  },
  modules: {}
});
