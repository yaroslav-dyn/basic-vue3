<template>
  <div class="" align="--center">
    <!-- SECTION: File Card component  -->
    <div
      class="item__box d-flex grow action__pointer"
      align="--center"
      justify="--space-around"
    >
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

      <div class="d-flex grow" justify="--stretch" align="--baseline">
        <h4 class="item__box--title info" col="4" color="info">
          <span> {{ file.name }} </span>
        </h4>

        <div class="d-flex" col="7">
          <el-tag class="ml-2" type="info">
            <b
              ><small>{{ file.number }}</small></b
            >
          </el-tag>

          <div
            v-if="
              getFileType('TASK', file.docType) && cardScale && cardScale > 3
            "
          >
            <span class="gaps">{{ file.status }} </span>
            <span class="gaps">{{ file.priority }} </span>
          </div>
        </div>

        <div
          class="item__box--controls title d-flex row--revers"
          flex-grow="1"
          col="1"
        >
          <el-button
            class="gaps"
            @click.stop="onDeleteFile(file)"
            type="danger"
            :icon="DeleteIcon"
            size="small"
            circle
          />

          <el-button
            class="gaps"
            @click.stop="editFile(file)"
            type="warning"
            :icon="EditPenIcon"
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
    cardScale: {
      type: Number,
      default: () => 6
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
  public cardScale?: number;

  public DeleteIcon = Delete;
  public EditPenIcon = EditPen;


  selectFile(file: FileTypesInterface) {
    this.setCurrentFileAction(file);
    this.openFilePanelAction(false);
    this.redirectToEditor('FILE_OPEN');
  }

}//

</script>

<style lang="scss" scoped>
.item__box {
  --default-column-gaps: 1rem;
}
</style> 
