import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";

@Options({

  methods: {
    ...mapActions({
      setCurrentOperation: 'setCurrentOperation',
      setCurrentFileAction: 'setCurrentFileAction'
    }),
    ...mapMutations({
      setActionMenuState: 'setActionMenuState'
    }),
  },
  computed: {
    ...mapState({
      showActionMenuState: (state: any) => state.showActionMenuState
    })
  },
  watch: {
    showActionMenuState(val) {
      this.actionDialogVisible = val;      
    }
  }
})
export default class FileCommandMixin extends Vue {
  setCurrentOperation!: (data: { name: string, data: any }) => void;
  setActionMenuState!: (data: boolean) => void;
  setCurrentFileAction!: (data: any) => void;

  public actionDialogVisible = false;
  public showFilesPage = false;

  onCloseDialog(val: boolean) {
    this.setActionMenuState(false);
  }

  menuAction(command: string) {
    switch (command) {
      case "OPEN_FILE":
        this.runOpenFile();
        break;
      case "CREATE_FILE":
        this.createFile();
        break;
    }
  }

  runOpenFile() {
    this.showFilesPage = true;
  }

  createFile() {
   // this.actionDialogVisible = true;
    this.setActionMenuState(true);
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


}//