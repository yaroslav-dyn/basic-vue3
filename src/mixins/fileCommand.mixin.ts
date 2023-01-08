import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";

@Options({

  methods: {
    ...mapActions({
      setCurrentOperation: 'setCurrentOperation',
      setCurrentFileAction: 'setCurrentFileAction',
      openFilePanelAction: 'openFileAction'
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
      console.log('open', val);
      
    }
  }
})
export default class FileCommandMixin extends Vue {
  setCurrentOperation!: (data: { name: string, data: any }) => void;
  setActionMenuState!: (data: boolean) => void;
  setCurrentFileAction!: (data: any) => void;
  openFilePanelAction!: (data: boolean) => void;

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
    }
  }

  createFile() {
    // this.actionDialogVisible = true;
    this.setActionMenuState(true);
  }

  openFile() {
    this.openFilePanelAction(true);
  }

  addAndOpenFile(data: { fileName: string }) {
    const presentFile = localStorage.getItem('filesArray');
    const filesArray = presentFile ? JSON.parse(presentFile) : [];
    filesArray.push({ name: data.fileName, data: '' });
    this.setCurrentFileAction({ name: data.fileName, data: '' })
    localStorage.setItem('filesArray', JSON.stringify(filesArray));
  }

  onConfirmAction(data: { fileName: string }) {
    this.setCurrentOperation({ name: 'CREATE_FILE', data: "" });
    console.log('cf', data);

    this.addAndOpenFile(data);
    this.actionDialogVisible = false;
  }

  onCloseFilePanel() {
    this.openFilePanelAction(false);
  }


}//