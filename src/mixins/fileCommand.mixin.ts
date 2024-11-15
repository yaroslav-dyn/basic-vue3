import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";
import { FileTypesInterface } from "../models/file.model";

@Options({
  methods: {
    ...mapActions({
      setCurrentOperation: 'setCurrentOperation',
      setCurrentFileAction: 'setCurrentFileAction',
      setFilesArrayAction: 'setFilesArrayAction',
      openFilePanelAction: 'openFileAction',
      saveFileAction: 'saveFileAction',
      deleteFileAction: 'deleteFileAction',
    }),
    ...mapMutations({
      setActionMenuState: 'setActionMenuState'
    }),
  },
  computed: {
    ...mapState({
      showActionMenuState: (state: any) => state.showActionMenuState,
      filePanelIsOpenState: (state: any) => state.filePanelIsOpenState,
    })
  },
  watch: {
    showActionMenuState(val) {
      this.actionDialogVisible = val;
    },
    filePanelIsOpenState(val) {
      this.showFilesPage = val;
    }
  }
})
export default class FileCommandMixin extends Vue {
  setCurrentOperation!: (data: {name: string, data:FileTypesInterface}) => void;
  setActionMenuState!: (data: boolean | object) => void;
  setCurrentFileAction!: (data: any) => void;
  setFilesArrayAction!: (data: any) => void;
  openFilePanelAction!: (data: boolean) => void;
  deleteFileAction!: (data: FileTypesInterface) => void;
  saveFileAction!: (data: FileTypesInterface | null) => void;

  public actionDialogVisible = false;
  public showFilesPage = false;
  public modalInfullScreen = false;
  public loading = false;

  onCloseDialog(val: boolean) {
    this.setActionMenuState(false);
  }


  setFullScreen(state: boolean) {
    this.modalInfullScreen = state;
  }

  redirectToEditor(command: string) {
    const fileTypeCmd = command.includes('FILE');
    const currentRoute = this.$route.name;
    if (fileTypeCmd && currentRoute !== 'Home')
      this.$router.push({ name: 'Home' });
  }

  menuAction(command: string) {
    this.redirectToEditor(command);
    switch (command) {
      case "OPEN_FILE":
        this.openFile();
        break;
      case "CREATE_FILE":
        this.createFile();
        break;
      case "SAVE_DOCUMENT":
        this.saveFile();
        break;
    }
  }

  createFile() {
    this.setActionMenuState(true);
  }

  openFile() {
    this.openFilePanelAction(true);
  }

  saveFile() {
    this.saveFileAction(null)
  }

  editFile(file: FileTypesInterface) {
    const actionObject = {
      file: file,
      operation: 'EDIT_DOCUMENT'
    }
    this.setActionMenuState(actionObject)
  }

  addAndOpenFile(data: FileTypesInterface) {
    const presentFile = localStorage.getItem('filesArray');
    const filesArray = presentFile ? JSON.parse(presentFile) : [];
    filesArray.push(data);
    this.setCurrentFileAction(data)
    this.setFilesArrayAction(filesArray);
    localStorage.setItem('filesArray', JSON.stringify(filesArray));
  }

  onConfirmAction(postData: { data: FileTypesInterface, type: string }) {
    this.loading = true;
    console.log('debug saving is new', postData);
    if (postData.type === 'CREATE_FILE') {
      this.setCurrentOperation({ name: 'CREATE_FILE', data: postData.data });
      this.addAndOpenFile(postData.data);
    } else if (postData.type === 'EDIT_FILE') {
      this.saveFileAction(postData.data)
    }
    this.setActionMenuState(false);
    this.loading = false;
  }

  onCloseFilePanel() {
    this.openFilePanelAction(false);
  }

  /**
   *  NOTE get Files array (dev: local)
   */
  getFilesArray() {
    const tempArray = localStorage.getItem('filesArray');
    return tempArray ? JSON.parse(tempArray) : [];
  }

}//