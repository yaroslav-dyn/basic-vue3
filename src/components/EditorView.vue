<template>
  <div
    class="d-flex editor--wrapper"
    align="--center"
    justify="--space-between"
  >
    <el-input-number
      :min="8"
      :max="100"
      size="small"
      v-model="areaFontSize"
      @input="onChangeFontSize"
    />

    <CommandPallet />

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
    class="editor--area"
    ref="mainEditor"
    :contenteditable="isEditable"
    :style="{ fontSize: fontSizeState + 'px' }"
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
      setFontSizeAction: 'setFontSize'
    })
  },
  computed: {
    ...mapState({
      fontSizeState: (state: any) => state.CurrentfontSize,
    })
  },
  watch: {
    fontSizeState(val) {
      this.areaFontSize = val;
    }
  }
})
export default class Home extends mixins(General) {
  fontSizeState!: number;
  setFontSizeAction!: (value: number) => void;


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
    localStorage.setItem(this.currentDocName, contentEvent.srcElement!.innerText);
  }

  mounted(): void {
    const currentDoc = localStorage.getItem(this.currentDocName);
    currentDoc && (this.currentDoc = currentDoc);
  }
}
</script>
