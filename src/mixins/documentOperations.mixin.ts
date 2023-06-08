import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import { FileTypesInterface } from "@/models/file.model";
import { DocumentTypeEnum } from "@/models/enums.model";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Document, Tickets, Notebook, Collection, Memo } from "@element-plus/icons-vue";
import FileFormScema from '@/models/fileFormSchema';

@Options({
  methods: {
    ...mapActions({
      deleteFileAction: 'deleteFileAction' })
  }
})
export default class DocumentOpeartionsMixin extends Vue {

  deleteFileAction!: (data: FileTypesInterface) => void;

  public fileFormScema = FileFormScema;

  public actionsForm = {

  }

  public FileData = {
    id: 0,
    docType: DocumentTypeEnum.TEXT,
    number: '1',
    name: '',
    data: null,
    createdAt: '2023-01-01',
    changedAt: null,

    // TASK
    priority: null,
    dueDate: null,
    status: 'TODO',
    labels: [],

    //pact
    childManifests: [],

    //MANIFEST
    pactId: null,

    //STORY
    manifestId: null

  } as FileTypesInterface;

  public currentFileData = this.FileData as FileTypesInterface;
/**
 * Get file releted icon & color
 * @param type string
 * @returns 
 */
  getFileDesignProperties(type: string) {
    let currentIcon;
    let color;
    switch (type) {
      case "TEXT":
        currentIcon = Document;
        color = "default"
        break;
      case "TASK":
        currentIcon = Tickets;
        color = "primary"
        break;
      case "PACT":
        currentIcon = Notebook;
        color = "warning"
        break;
      case "MANIFEST":
        currentIcon = Collection;
        color = "danger"
        break;
      case "STORY":
        currentIcon = Memo;
        color = "info"
        break;
      default:
        currentIcon = Document;
        color = "plain"
    }
    return { icon: currentIcon, color: color };
  }

  async onDeleteFile(file: FileTypesInterface) {
    // TODO: re-write to mixin
    try {
      const response = await ElMessageBox.confirm(
        `You want to delete file: ${file.name}?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
      if (response) {
        this.deleteFileAction(file);
        this.$emit('onFileDelete');
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      }
    } catch (error) {
      return
    }
  }


  /** 
   * NOTE: Form operations 
   */

  setFileObject<T extends keyof FileTypesInterface>(value: any, key: T) {
    this.currentFileData[key] = value
  }

  get getCurrentFile() {
    return this.currentFileData;
  }

  get fileFormScemaArray() {
    return this.fileFormScema.map(s => {
      //@ts-ignore ???
      s.data.map(sg => {
        //TODO: Get file!
        if (this.getCurrentFile && sg.key in this.getCurrentFile) {
          //@ts-ignore TODO: add types
          sg.value = this.getCurrentFile[sg.key];
        } else {
          //@ts-ignore TODO: add types
          sg.value = this.FileData[sg.key]
        }
        return sg
      })
      return s
    })
  }


  //TODO: DEBUG Generating hash for document number
  stringToHash(str: string) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

}//