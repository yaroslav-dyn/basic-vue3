<template>
  <div
    class="d-flex editor--wrapper"
    align="--center"
    justify="--space-between"
    @dblclick="isEditable = false" 
  >
    <el-input-number
      :min="8"
      :max="100"
      size="small"
      v-model="areaFontSize"
      @input="onChangeFontSize"
    />

    <CommandPallet/>

    <el-switch
      class="w100"
      inline-prompt
      :active-icon="editIcon"
      :inactive-icon="LockIcon"
      active-color="#ffd04b"
      inactive-color="green"
      size="large"
      @change="changeEditorState"
      :value="isEditable"
    />
  </div>

  <br />

  <div
    :class="['editor--area', { isEditable }]"
    ref="mainEditor"
    :contenteditable="isEditable"
    :style="{ fontSize: fontSizeState + 'px' }"
    @dblclick="changeEditorState"
    @blur="updateValue($event)"
  >
    {{ currentDoc }}
  </div>
</template>

<script lang="ts">
import { Options, mixins } from "vue-class-component";
import General from "@/mixins/General";
import { Edit, Lock, Watch } from "@element-plus/icons-vue";
import CommandPallet from "@/components/_parts/CommandPallet.vue";
import { mapActions, mapGetters, mapState } from "vuex";

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
      filesArrayState: (state: any) => state.filesArrayState
    })
  },
  watch: {
    fontSizeState(val) {
      this.areaFontSize = val;
    },
    'currentDocSate.name'(val) {
      this.currentDoc = this.currentDocSate.data;
    }
  }
})
export default class Home extends mixins(General) {
  fontSizeState!: number;
  filesArrayState!: {name: string, data: string}[];
  currentDocSate?: { name: string, data: string };
  setFontSizeAction!: (value: number) => void;
  setCurrentFileAction!: (data: any) => void;
  setFilesArrayAction!: (data: any) => void;

  public editIcon = Edit;
  public LockIcon = Lock;
  public areaFontSize = 16;

  #refs!: {
    mainEditor: HTMLElement
  };

  public currentDocName = "File_1";
  public isEditable = false;
  currentDoc = "Hello!";


  changeEditorState() {
    this.isEditable = !this.isEditable;
    let areaElement = this.$refs.mainEditor as HTMLAreaElement;
    this.$nextTick(() => {
      this.isEditable && areaElement.focus();
      document.execCommand("selectAll", false, undefined);
      document?.getSelection()?.collapseToEnd();
    });
  }

  onChangeFontSize(currentValue: number) {
    this.setFontSizeAction(currentValue);
  }

  
  updateValue(contentEvent: any): void {
    // localStorage.setItem(this.currentDocName, contentEvent.srcElement!.innerText);
    this.currentDoc = contentEvent.srcElement!.innerText;
    //@ts-ignore warn
    this.setCurrentFileAction({ name: this.currentDocSate?.name, data: contentEvent.srcElement!.innerText });
    const updatedFileIndex: number = this.filesArrayState?.findIndex((f: {name: string, data: string}) => f.name === this.currentDocSate?.name);
    
    const modifiedFiles: { name: string, data: string }[] = this.filesArrayState;
    if (updatedFileIndex && updatedFileIndex >= 0)
     // this.setCurrentFileAction({ name: this.currentDocSate?.name, data: contentEvent.srcElement!.innerText });
    modifiedFiles[updatedFileIndex] = { name: this.currentDocSate!.name, data: this.currentDocSate!.data};
    //@ts-ignore  next
    (modifiedFiles) && this.setFilesArrayAction(modifiedFiles);
    localStorage.setItem('filesArray', JSON.stringify(modifiedFiles) );
  }

  mounted(): void {
    const currentDocs = localStorage.getItem('filesArray');
    const currentFontSize = localStorage.getItem('currentFontSize');
    currentFontSize && this.setFontSizeAction(parseInt(currentFontSize));
       //@ts-ignore  next
    (currentDocs) &&  this.setFilesArrayAction(JSON.parse(currentDocs));
    currentDocs && !(this.currentDocSate?.name.length == 0) && (this.setCurrentFileAction( JSON.parse(currentDocs).slice(-1).shift()) );
    this.currentDocSate && (this.currentDoc = this.currentDocSate.data);
  }
}
</script>
