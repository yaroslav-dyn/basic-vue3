import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";
import { FileTypesInterface } from "@/models/file.model";
import { DocumentTypeEnum } from "@/models/enums.model";

@Options({})
export default class DocumentOpeartionsMixin extends Vue {

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

  }  as FileTypesInterface;



}//