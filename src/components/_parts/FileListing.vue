<!--SECTION: File listing template:: drawer -->
<template>
  <el-row :gutter="20" align="center">
    <el-col :span="24" v-for="file in filesArray" :key="file.name">
      <FileCardItem class="action__cursor" @onFileDelete="getFiles" :file="file" @click="selectFile(file)" />
    </el-col>
  </el-row>
</template>

<script lang="ts">

import { FileTypesInterface } from '@/models/file.model';
import { mixins, Options } from 'vue-class-component';
import { Document } from '@element-plus/icons-vue'
import FileCommandMixin from '@/mixins/fileCommand.mixin';
import {
  Delete,
  EditPen
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import FileCardItem from "@/components/_parts/FileCardItem.vue";

@Options({
  components: {
    FileCardItem
  }
})
export default class FileListingComponent extends mixins(
  FileCommandMixin
) {

  public documentIcon = Document;
  public filesArray = [] as FileTypesInterface[];
  public DeleteIcon = Delete;
  public EditPenIcon = EditPen;

  selectFile(file: FileTypesInterface) {
    this.setCurrentFileAction(file);
    this.openFilePanelAction(false);
    this.redirectToEditor('FILE_OPEN');
  }

  async onDeleteFile(file: FileTypesInterface) {
    // TODO: re-write to mixin

    try {
      const response = await ElMessageBox.confirm(
        `You want to delete file: ${file.name}?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
      if (response) {
        this.deleteFileAction(file);
        this.getFiles();
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      }
    } catch (error) {
      return
    }
  }//

  getFiles() {
    this.filesArray = this.getFilesArray();
  }

  mounted() {
    this.getFiles();
  }

}//

</script>

<style lang="scss" scoped>
.files_item {
  margin: 10px 0;
  &--icon {
    margin-right: 8px;
  }
}
</style>