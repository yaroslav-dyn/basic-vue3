<template>
  <button @click="changeEditorState">Edit</button>
  <div class="editor--area" ref="mainEditor" :contenteditable="isEditable" @input="updateValue($event)">
      {{ currentDoc }}
  </div>
</template>

<script lang="ts">
import { Options, mixins } from "vue-class-component";
import General from "@/mixins/General";

@Options({
  components: {},
})
export default class Home extends mixins(General) {

   #refs!: {
     mainEditor: HTMLElement
  }
  
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
    this.logger(this, contentEvent.srcElement!.innerText);
  }


  mounted(): void {
    //!SECTION
  }
}
</script>
