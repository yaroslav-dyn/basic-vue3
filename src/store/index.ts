import { FileTypesInterface } from "@/models/file.model";
import { createStore } from "vuex";

export interface StateInterface {
  defaultFontSize: number;
  isDarkTheme: boolean;
  CurrentfontSize: number;
  showActionMenuState: boolean | object;
  currentOperation: {
    name: string,
    data: any
  } | null;
  filesArrayState: FileTypesInterface[],
  currentDocSate: FileTypesInterface,
  filePanelIsOpenState: boolean
}

export default createStore({
  state():any {
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

    setActionMenuState(state: StateInterface, value: boolean | object) {
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

    setCurrentOperation({ state, commit }, data: {data: FileTypesInterface}) {
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

    saveFileAction({ state, dispatch }, data: FileTypesInterface | null) {
      let currentDoc: FileTypesInterface | null = null;
      if(!data)
        currentDoc = state.currentDocSate;
      else 
        currentDoc = data;
      dispatch('setCurrentFileAction', currentDoc); 
      const currentDocArray = [...state.filesArrayState];
      const currentDocIndex = currentDocArray?.findIndex((f: FileTypesInterface) => f.id === currentDoc?.id);
      if (currentDocIndex >= 0) {
          currentDocArray[currentDocIndex] = currentDoc;
          dispatch('setFilesArrayAction', currentDocArray);
      } 
    },

    deleteFileAction({ state, dispatch }, file: FileTypesInterface) {
      console.log('deleteFileAction', file);
      const currentDocArray = [...state.filesArrayState];
      const currentDocnewArray = currentDocArray?.filter((f: FileTypesInterface) => f.id != file?.id);
      dispatch('setFilesArrayAction', currentDocnewArray);
    }

  }
  //modules: {}
});
