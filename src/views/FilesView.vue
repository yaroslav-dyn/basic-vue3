<!--SECTION: File listing page -->
<template>
  <div class="content__page--container">
    <div class="card__controls">
      <el-row gutter="20">
        <el-col :span="4">
          <el-slider
            v-model="cardScale"
            :step="3"
            show-stops
            :show-tooltip="false"
            :min="3"
            :max="12"
            @input="changeFilters('cardScale', $event)"
          />
        </el-col>
        <el-col :span="8">
          <el-select
            class="w100 gaps"
            name="typeSelect"
            v-model="typeFilter"
            placeholder="Select type"
            clearable
            @change="changeFilters('typeFilter', $event)"
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

    <div class="d-flex wrapped card__module">
      <el-card
        class="box-sizing card__item gaps"
        :col="getCardScale"
        v-for="(file, index) in getFilesArrayFiltered"
        :key="index"
        shadow="hover"
        :body-style="{ 'max-height': '80px', 'min-height': '80px' }"
      >
        <template #header>
          <FileCardItem
           @click.stop="openDoc(file.number)"
            :class="[
              'action__cursor',
              { item__short_description: cardScale < 9 },
            ]"
            :cardScale="cardScale"
            @onFileDelete="getFiles"
            :file="file"
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

import { Options, mixins, Vue } from "vue-class-component";
import { FileTypesInterface } from "@/models/file.model";
import FileCommandMixin from '@/mixins/fileCommand.mixin';
import { DocumentTypeEnum } from "@/models/enums.model";
import FileCardItem from "@/components/_parts/FileCardItem.vue";

@Options({
  components: {
    FileCardItem
  },
  watch: {
    showActionMenuState(val) {
      this.getFiles();
    }
  }
})
export default class extends mixins(
  FileCommandMixin
) {
  public filesArray = [] as FileTypesInterface[];
  public cardScale = 6;
  public typeFilter = '';


  get getCardScale(): number {
    if (this.cardScale === Number(0))
      return 1
    return this.cardScale;
  }

  get getFilestypes() {
    return Object.values(DocumentTypeEnum).map(opt => ({ value: opt, label: opt }));
  }

  get getFilesArrayFiltered():FileTypesInterface[] {
    return this.filesArray.filter(f => {
      if (this.typeFilter && this.typeFilter.length > 0) {
        return f && f.docType === this.typeFilter;
      }
      return f;
    })
  }


  openDoc(docNumber: string) {
    this.$router.push({
      name: 'OneFile',
      params: { fileNumber: docNumber },
    })
  }

  changeFilters(type: string, value: any) {
    const currentStorage = localStorage.getItem('filesFilters');
    let previousFilters = currentStorage && JSON.parse(currentStorage) || {};
    let fullsettings = Object.assign(previousFilters, { [type]: value })
    localStorage.setItem('filesFilters', JSON.stringify(fullsettings));
  }

  getPreviousFiltersValue() {
    const currentStorage = localStorage.getItem('filesFilters');
    const filesFilters = currentStorage && JSON.parse(currentStorage);

    if (filesFilters && Object.keys(filesFilters).length > 0) {

      for (const [key, value] of Object.entries(filesFilters)) {
        //@ts-ignore add keyof
        this[key] = value;
      }

    }

  }

  getFiles() {
    this.filesArray = this.getFilesArray();
  }

  mounted() {
    this.getFiles();
    this.getPreviousFiltersValue();
  }

}//
</script>

<style lang="scss" scoped>
@use "@/assets/sass/_helpers" as *;

.card__controls {
  position: sticky;
  top: 70px;
  z-index: 10;
  padding: 0 calc(var(--default-column-gaps) * 2);
}

.card__item {
  margin: 1rem;
}

</style>