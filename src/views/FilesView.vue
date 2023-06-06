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
          <div class="d-flex" align="--baseline">
            <el-button
              class="gaps"
              size="large"
              circle
              :type="getFileDesignProperties(file.docType).color"
              :icon="getFileDesignProperties(file.docType).icon"
            >
            </el-button>
            <h4 class="info" color="info">
              {{ file.name }}
            </h4>
          </div>
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
import { Document, Tickets, Notebook, Collection, Memo } from "@element-plus/icons-vue";
import { DocumentTypeEnum } from "@/models/enums.model";

@Options({})
export default class extends mixins(
  FileCommandMixin
) {
  public filesArray = [] as FileTypesInterface[];
  public cardsScale = 6;
  public typeFilter = '';

  getFileDesignProperties(type: string) {
    let currentIcon;
    let color;
    switch (type) {
      case "TEXT":
        currentIcon = Document;
        color = "info"
        break;
      case "TASK":
        currentIcon = Tickets;
        color = "primary"
        break;
      case "PACT":
        currentIcon = Notebook;
        color = "warning"
        break;
      case "MANIFEST":
        currentIcon = Collection;
        color = "danger"
        break;
      case "STORY":
        currentIcon = Memo;
        color = "warning"
        break;
      default:
        currentIcon = Document;
        color = "plain"
    }
    return { icon: currentIcon, color: color };
  }

  get getCardScale(): number {
    if (this.cardsScale === Number(0))
      return 1
    return this.cardsScale;
  }

  get getFilestypes() {
    return Object.values(DocumentTypeEnum).map(opt => ({value: opt, label: opt}));
  }

  get getFilesArrayFiltered() {
    return this.filesArray.filter(f => {
      if(this.typeFilter && this.typeFilter.length > 0) {
        return f && f.docType === this.typeFilter;
      }
      return f;
    })
  }

  mounted() {
    this.filesArray = this.getFilesArray();
  }

}//
</script>

<style scoped>
.card__item {
  margin: 1rem;
}
</style>