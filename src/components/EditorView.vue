<template>
  <div class="d-flex" align="--center" justify="--space-between">
    <div>
      <input type="text" v-model="currentDocName" disabled />
    </div>
    <div>
      <el-switch 
        inline-prompt 
        :active-icon="LockIcon" 
        :inactive-icon="editIcon" 
        @change="changeEditorState" 
        :value="isEditable" />
    </div>
  </div>
 
  <br />
  <div class="editor--area" ref="mainEditor" :contenteditable="isEditable" @blur="updateValue($event)">
      {{ currentDoc }}
  </div>
</template>

<script lang="ts">
import { Options, mixins } from "vue-class-component";
import General from "@/mixins/General";
import {Edit, Lock} from '@element-plus/icons-vue';

@Options({
  components: {},
})
export default class Home extends mixins(General) {

  public editIcon = Edit;
  public LockIcon = Lock;

   #refs!: {
     mainEditor: HTMLElement
  }

  public currentDocName = 'File_1';
  
  public isEditable  = false;
  currentDoc = "Hello!"


  changeEditorState() {
    this.isEditable = !this.isEditable;
    let areaElement = this.$refs.mainEditor as HTMLAreaElement;
    this.$nextTick(()=> {
      this.isEditable && areaElement.focus();
      document.execCommand('selectAll', false, undefined);
      document?.getSelection()?.collapseToEnd();
    })
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
