<template>
  <div
    class="d-flex editor--wrapper"
    align="--center"
    justify="--space-between"
    @dblclick="isEditable = false"
  >
    <div class="d-flex"  align="--center">
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

  <pre
    :class="['editor--area', { isEditable }]"
    ref="mainEditor"
    :contenteditable="isEditable"
    :style="{ fontSize: fontSizeState + 'px' }"
    @dblclick="changeEditorState"
    @blur="updateValue($event)"
  >
  {{currentDoc}}
  </pre>
</template>

<script lang="ts">
import { Options, mixins } from "vue-class-component";
import General from "@/mixins/General";
import { Edit, Lock, Watch } from "@element-plus/icons-vue";
import CommandPallet from "@/components/_parts/CommandPallet.vue";
import { mapActions, mapState } from "vuex";
import { FileTypesInterface } from "@/models/file.model";

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
  filesArrayState!: { name: string, data: string }[];
  currentDocSate?: { name: string, data: string };
  setFontSizeAction!: (value: number) => void;
  setCurrentFileAction!: (data: any) => void;
  setFilesArrayAction!: (data: FileTypesInterface) => void;

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
  }

  mounted(): void {
    const currentDocs = localStorage.getItem('filesArray');
    const currentFontSize = localStorage.getItem('currentFontSize');
    currentFontSize && this.setFontSizeAction(parseInt(currentFontSize));
    currentDocs && this.setFilesArrayAction(JSON.parse(currentDocs));
    const currentDocStorage = localStorage.getItem('currentDoc');
    if (currentDocStorage) this.setCurrentFileAction(JSON.parse(currentDocStorage));
    else
      currentDocs && (this.currentDocSate?.name.length == 0) && (this.setCurrentFileAction(JSON.parse(currentDocs).slice(-1).shift()));
    this.currentDocSate && (this.currentDoc = this.currentDocSate.data);
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