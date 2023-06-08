<!--SECTION: File listing page -->
<template>
  <div class="content__page--container">
    <div class="card__controls">
      <el-row gutter="20">
        <el-col :span="4">
          <el-slider
            v-model="cardsScale"
            :step="3"
            show-stops
            :show-tooltip="false"
            :min="0"
            :max="12"
          />
        </el-col>
        <el-col :span="8">
          <el-select
            class="w100 gaps"
            name="typeSelect"
            v-model="typeFilter"
            placeholder="Select type"
            clearable
          >
            <el-option
              :key="opt"
              v-for="opt in getFilestypes"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="d-flex wrapped">
      <el-card
        class="box-sizing card__item gaps"
        :col="getCardScale"
        v-for="(file, index) in getFilesArrayFiltered"
        :key="index"
        shadow="hover"
      >
        <template #header>
          <FileCardItem
            @onFileDelete="getFiles"
            :file="file"
            @click="
              $router.push({
                name: 'OneFile',
                params: { fileNumber: file.number },
              })
            "
          />
        </template>

        <div class="card--body">
          {{ file.data }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, mixins } from "vue-class-component";
import { FileTypesInterface } from "@/models/file.model";
import FileCommandMixin from '@/mixins/fileCommand.mixin';
import { DocumentTypeEnum } from "@/models/enums.model";
import FileCardItem from "@/components/_parts/FileCardItem.vue";

@Options({
  components: {
    FileCardItem
  }
})
export default class extends mixins(
  FileCommandMixin
) {
  public filesArray = [] as FileTypesInterface[];
  public cardsScale = 6;
  public typeFilter = '';


  get getCardScale(): number {
    if (this.cardsScale === Number(0))
      return 1
    return this.cardsScale;
  }

  get getFilestypes() {
    return Object.values(DocumentTypeEnum).map(opt => ({ value: opt, label: opt }));
  }

  get getFilesArrayFiltered() {
    return this.filesArray.filter(f => {
      if (this.typeFilter && this.typeFilter.length > 0) {
        return f && f.docType === this.typeFilter;
      }
      return f;
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

<style scoped>
.card__item {
  margin: 1rem;
}
</style>