<template>
  <div class="content__page--container help-view">
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
