<template>
  <div
    class="d-flex editor--wrapper"
    align="--center"
    justify="--space-between"
    @dblclick="isEditable = false"
  >
    <div
      class="d-flex"
      align="--center"
    >
      <el-switch
        class="w100 gutter_element"
        inline-prompt
        :active-icon="editIcon"
        :inactive-icon="LockIcon"
        active-color="#ffd04b"
        inactive-color="green"
        size="large"
        @change="changeEditorState"
        :value="isEditable"
      />

      <el-input-number
        :min="8"
        :max="100"
        size="small"
        v-model="areaFontSize"
        @input="onChangeFontSize"
      />
    </div>

    <CommandPallet />

    <div></div>
  </div>

  <br />

  <div
    @dblclick="changeEditorState"
    ref="mainEditor"
    :class="isDarkThemeState ? 'no--invert' : ''"
  >
    <v-md-editor
      :height="editorHeight"
      v-model="currentDoc.data"
      :mode="isEditable ? 'edit' : 'preview'"
      @click="updateValue($event)"
    />
  </div>

</template>

<script lang="ts">
import { Options, mixins } from "vue-class-component";
import General from "@/mixins/General";
import { Edit, Lock, Watch } from "@element-plus/icons-vue";
import CommandPallet from "@/components/_parts/CommandPallet.vue";
import { mapActions, mapState } from "vuex";
import { FileTypesInterface } from "@/models/file.model";
import { FileDataDefault, Constants } from "@/services/Constants";
import { StateInterface } from "@/store";

@Options({
  components: {
    CommandPallet
  },
  methods: {
    ...mapActions({
      setFontSizeAction: 'setFontSize',
      setFilesArrayAction: 'setFilesArrayAction',
      setCurrentFileAction: 'setCurrentFileAction'
    })
  },
  computed: {
    ...mapState({
      fontSizeState: (state: any) => state.CurrentfontSize,
      currentDocSate: (state: any) => state.currentDocSate,
      filesArrayState: (state: any) => state.filesArrayState,
      isDarkThemeState: (state: any) => state.isDarkTheme
    })
  },
  watch: {
    fontSizeState(val) {
      this.areaFontSize = val;
    },
    currentDocSate: {
      handler(newValue) {
        this.currentDoc = newValue;
      },
      deep: true
    }
  }
})
export default class Home extends mixins(General) {
  fontSizeState!: number;
  filesArrayState!: FileTypesInterface[];
  currentDocSate?: FileTypesInterface;
  setFontSizeAction!: (value: number) => void;
  setCurrentFileAction!: (data: any) => void;
  setFilesArrayAction!: (data: FileTypesInterface) => void;


  public isDarkThemeState!: boolean;
  public editIcon = Edit;
  public LockIcon = Lock;
  public areaFontSize = 16;
  public editorHeight = 'auto'
  private demoDoc = FileDataDefault;

  #refs!: {
    mainEditor: HTMLElement
  };

  public currentDocName = "File_1";
  public isEditable = false;
  public currentDoc = {} as FileTypesInterface;


  changeEditorState() {
    this.isEditable = !this.isEditable;
  }

  onChangeFontSize(currentValue: number) {
    this.setFontSizeAction(currentValue);
  }


  updateValue(contentEvent: any): void {
    console.log('update', 'ev:', contentEvent, this.currentDoc.data);
    // this.currentDoc.data = contentEvent.srcElement.value;
    // contentEvent.srcElement!.innerText
    // localStorage.setItem(this.currentDocName, contentEvent.srcElement!.innerText);
    //this.currentDoc = contentEvent.srcElement!.innerText;
    //@ts-ignore warn
    this.setCurrentFileAction(this.currentDoc);
    /** TODO: Demo but user needs firred save action 
      and than files array in local storage will be update:
      - live per now or add updating for files array
     **/
  }

  setDemoDoc() {
    this.demoDoc.data = Constants.welcomeDocument
    this.currentDoc = this.currentDocSate ?? this.demoDoc;
    this.setCurrentFileAction(this.currentDoc)
  }

  setFileArray(currentDocStorage: FileTypesInterface[]) {
    this.setCurrentFileAction(currentDocStorage);
  }

  public setInitialDocument() {
    const currentDocs = localStorage.getItem('filesArray');
    const currentFontSize = localStorage.getItem('currentFontSize');
    currentFontSize && this.setFontSizeAction(parseInt(currentFontSize));
    currentDocs && this.setFilesArrayAction(JSON.parse(currentDocs));

    const currentDocStorage = localStorage.getItem('currentDoc');
    if (currentDocStorage) {
      this.setFileArray(JSON.parse(currentDocStorage));

    }
    else if (currentDocs) {
      currentDocs && (this.currentDocSate?.name?.length == 0) &&
        (this.setCurrentFileAction(JSON.parse(currentDocs).slice(-1).shift()));
    } else {
      this.setDemoDoc();
    }
  }//

  getEditorHeight() {
    this.$nextTick(()=> {
      let areaElement = this.$refs.mainEditor as HTMLAreaElement;
      if (!areaElement) return
      const editorHeight = window.innerHeight - areaElement.offsetTop - 100;

      this.editorHeight = (editorHeight + 'px') ?? 'auto';
      console.log("🚀 ~ Home ~ getEditorHeight ~ editorHeight:", this.editorHeight)
    })
    
  }

  mounted(): void {
    //TODO: Demo demonstratn mode
    this.setInitialDocument();
    this.getEditorHeight();
  }

  unmounted() {
    // this.setCurrentFileAction(null);
  }

}
</script>
<style scoped>
.gutter_element {
  margin-right: 1.4rem;
}
</style>