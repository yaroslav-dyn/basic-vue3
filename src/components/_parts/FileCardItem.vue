<template>
  <div class="d-flex grow" align="--center">
    <!-- SECTION: File Card component  -->
    <div class="d-flex grow" align="--center" justify="--space-around">
      <el-button
        class="gaps"
        size="large"
        rouned
        :type="getFileDesignProperties(file.docType).color"
      >
        <template #icon>
          <el-icon
            :color="getFileDesignProperties(file.docType).color"
            :size="30"
          >
            <component :is="getFileDesignProperties(file.docType).icon" />
          </el-icon>
        </template>
      </el-button>

      <div class="d-flex grow" justify="--space-between" align="--baseline">
        <h4 class="info" color="info">
          {{ file.name }}
        </h4>

        <div>
          <el-button
            @click="editFile(file)"
            type="warning"
            :icon="EditPenIcon"
            size="small"
            circle
          />

          <el-button
            @click="onDeleteFile(file)"
            type="danger"
            :icon="DeleteIcon"
            size="small"
            circle
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, mixins } from "vue-class-component";
import { FileTypesInterface } from "@/models/file.model";
import FileCommandMixin from '@/mixins/fileCommand.mixin';
import {
  Delete,
  EditPen
} from '@element-plus/icons-vue';
import DocumentOpeartionsMixin from "@/mixins/documentOperations.mixin";

@Options({
  props: {
    file: {
      type: Object,
      required: true
    },
    controls: {
      type: Boolean
    }
  }
})
export default class FileCardItem extends mixins(
  FileCommandMixin,
  DocumentOpeartionsMixin
) {

  public file!: FileTypesInterface;
  public controls?: boolean;

  public DeleteIcon = Delete;
  public EditPenIcon = EditPen;


  selectFile(file: FileTypesInterface) {
    this.setCurrentFileAction(file);
    this.openFilePanelAction(false);
    this.redirectToEditor('FILE_OPEN');
  }

}//

</script>
