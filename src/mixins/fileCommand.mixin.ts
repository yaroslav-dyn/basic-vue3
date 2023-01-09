import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";

@Options({

  methods: {
    ...mapActions({
      setCurrentOperation: 'setCurrentOperation',
      setCurrentFileAction: 'setCurrentFileAction',
      setFilesArrayAction: 'setFilesArrayAction',
      openFilePanelAction: 'openFileAction',
      saveFileAction: 'saveFileAction'
    }),
    ...mapMutations({
      setActionMenuState: 'setActionMenuState'
    }),
  },
  computed: {
    ...mapState({
      showActionMenuState: (state: any) => state.showActionMenuState,
      filePanelIsOpenState: (state: any) => state.filePanelIsOpenState
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
  setCurrentOperation!: (data: { name: string, data: any }) => void;
  setActionMenuState!: (data: boolean) => void;
  setCurrentFileAction!: (data: any) => void;
  setFilesArrayAction!: (data: any) => void;
  openFilePanelAction!: (data: boolean) => void;
  saveFileAction!: () => void;

  public actionDialogVisible = false;
  public showFilesPage = false;

  onCloseDialog(val: boolean) {
    this.setActionMenuState(false);
  }

  menuAction(command: string) {
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
    this.saveFileAction()
  }

  addAndOpenFile(data: { fileName: string }) {
    const presentFile = localStorage.getItem('filesArray');
    const filesArray = presentFile ? JSON.parse(presentFile) : [];
    filesArray.push({ name: data.fileName, data: '' });
    this.setCurrentFileAction({ name: data.fileName, data: '' })
    this.setFilesArrayAction(filesArray);
    localStorage.setItem('filesArray', JSON.stringify(filesArray));
  }

  onConfirmAction(data: { fileName: string }) {
    this.setCurrentOperation({ name: 'CREATE_FILE', data: "" });
    this.addAndOpenFile(data);
    this.actionDialogVisible = false;
  }

  onCloseFilePanel() {
    this.openFilePanelAction(false);
  }


}//