<!--SECTION: File listing template:: drawer -->
<template>
  <el-row :gutter="20">
    <el-col :span="12" v-for="file in filesArray" :key="file.name">
      <div class="files_item d-flex">
        <el-avatar
          @click="selectFile(file)"
          class="files_item--icon action__pointer"
          :icon="documentIcon"
          shape="square"
          :size="50"
          src="/"
        />
        <div class="d-flex column" align="--center" justify="--space-between">
          <div>
            <el-button
              @click="editFile(file)"
              type="warning"
              :icon="EditPenIcon"
              size="small"
              circle
            />
          </div>

          <el-button
            @click="onDeleteFile(file)"
            type="danger"
            :icon="DeleteIcon"
            size="small"
            circle
          />
        </div>
      </div>
      <div>
        <strong @click="selectFile(file)" class="action__pointer">
          {{ file.name }}
          </strong>
      </div>
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

@Options({})
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