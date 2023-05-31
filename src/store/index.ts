import { FileTypesInterface } from "@/models/file.model";
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
  filesArrayState: FileTypesInterface[],
  currentDocSate: FileTypesInterface,
  filePanelIsOpenState: boolean
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
      currentDocSate: {name: '', data: ''},
      filePanelIsOpenState: false
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
      localStorage.setItem('currentDoc', JSON.stringify(value))
    },

    setFillesArrayMutation(state: StateInterface, data) {
      state.filesArrayState = data;
      localStorage.setItem("filesArray", JSON.stringify(data));
    },

    openFileMutation(state: StateInterface, data) {
      state.filePanelIsOpenState = data;
    },

    renameFileMutation(state: StateInterface) {
      console.log('fired rename');   
      state.showActionMenuState = true;
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
          break;
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

    setCurrentOperation({ state, commit }, data: FileTypesInterface) {
      commit('setCurrentOperationMutation', data)
    },

    setCurrentFileAction({ state, commit }, data) {
      commit('setCurrentFileMutation', data);
    },

    setFilesArrayAction({ state, commit }, data) {
      commit('setFillesArrayMutation', data);
    },

    openFileAction({ state, commit }, data) {
      commit('openFileMutation', data)
    },

    renameCurrentFile({commit}) {
      commit('renameFileMutation');
    },

    saveFileAction({ state, dispatch }) {
      const currentDoc = state.currentDocSate;
      const currentDocArray = [...state.filesArrayState];
      const currentDocIndex = currentDocArray?.findIndex((f: { name: string, data: string }) => f.name === currentDoc?.name);
      if (currentDocIndex >= 0) {
          currentDocArray[currentDocIndex] = currentDoc;
          dispatch('setFilesArrayAction', currentDocArray);
      } 
    },

    deleteFileAction({ state, dispatch }, file: FileTypesInterface) {
      console.log('deleteFileAction', file);
      const currentDocArray = [...state.filesArrayState];
      const currentDocnewArray = currentDocArray?.filter((f: { name: string, data: string }) => f.name != file?.name);
      dispatch('setFilesArrayAction', currentDocnewArray);
    }

  }
  //modules: {}
});
