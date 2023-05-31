<template>
  <el-row :gutter="20">
    <el-col :span="12" v-for="file in filesArray" :key="file.name">
      <div class="files_item d-flex" align="--end">
        <el-avatar
          @click="selectFile(file)"
          class="files_item--icon"
          :icon="documentIcon"
          shape="square"
          :size="50"
          src="/"
        />
        <el-button
          @click="onDeleteFile(file)"
          type="danger"
          :icon="DeleteIcon"
          size="small"
          circle
        />
      </div>
      <span>{{ file.name }}</span>
    </el-col>
  </el-row>
</template>

<script lang="ts">

import { FileTypesInterface } from '@/models/file.model';
import { mixins, Options } from 'vue-class-component';
import { Document } from '@element-plus/icons-vue'
import FileCommandMixin from '@/mixins/fileCommand.mixin';
import {
  Delete
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';

@Options({})
export default class FileListingComponent extends mixins(
  FileCommandMixin
) {

  public documentIcon = Document;
  public filesArray = [] as FileTypesInterface[];
  public DeleteIcon = Delete;

  selectFile(file: FileTypesInterface) {
    this.setCurrentFileAction(file);
    this.openFilePanelAction(false);
    this.redirectToEditor('FILE_OPEN');
  }

  onDeleteFile(file: FileTypesInterface) {
    // TODO: re-write to mixin
    ElMessageBox.confirm(
      `You want to delete file: ${file.name}?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
      .then(() => {

       this.deleteFileAction(file); 
      this.getFiles();
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
  }

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
  &--icon {
    margin-right: 8px;
  }
}
</style>