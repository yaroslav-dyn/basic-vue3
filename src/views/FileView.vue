<template>
  <div class="content__page--container file-view">
    <aside class="file-view__controls">
      <div class="d-flex" justify="--space-between">
        <span></span>
        <el-icon class="action__pointer" :size="24" @click="backToFileList">
          <Close />
        </el-icon>
      </div>
    </aside>
    <FileFieldsForm v-if="getCurrentFileData" :fileDataProp="getCurrentFileData" />
  </div>
</template>

<script lang="ts">

import FileFieldsForm from '@/components/_parts/FileFieldsForm.vue';
import { FileTypesInterface } from '@/models/file.model';
import { mixins, Options } from 'vue-class-component';
import { mapState } from 'vuex';
import DocumentOpeartionsMixin from "@/mixins/documentOperations.mixin";
@Options({
  props: {
    fileNumber: {
      type: String
    }
  },
  components : {
    FileFieldsForm
  },
  computed: {
     ...mapState({
          filesArrayState: (state: any) => state.filesArrayState
     })
  }
})
export default class FileView extends mixins(
  DocumentOpeartionsMixin
  ) {

  fileNumber!: string;
  private filesArrayState!: FileTypesInterface[]


  public currentFileData = {} as FileTypesInterface;


  backToFileList() {
    this.$router.push({name: 'FilesList'})
  }

  get getCurrentFileData() {
    if(this.currentFileData && 'number' in this.currentFileData)
      return this.currentFileData;
    return undefined
  }

  mounted() {
    if (this.fileNumber) {
      //@ts-ignore ***    
      this.currentFileData = this.filesArrayState && this.filesArrayState.find( f => f && f.number === this.fileNumber);
    }
  }

}//
</script>


<style lang="scss" scoped>

// .file-view {
//   //padding: 1.4rem 1.8rem;
// }

</style>