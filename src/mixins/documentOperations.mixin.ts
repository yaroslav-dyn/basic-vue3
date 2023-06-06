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

  } as FileTypesInterface;



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