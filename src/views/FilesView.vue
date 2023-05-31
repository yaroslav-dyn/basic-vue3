<template>
  <div class="content__page--container">
    <div class="card__controls">
      <el-row>
        <el-col :span="4">
          <el-slider
            v-model="cardsScale"
            :step="3"
            show-stops
            :min="0"
            :max="12"
          />
        </el-col>
      </el-row>
    </div>

    <div class="d-flex wrapped">
      <el-card
        class="box-sizing card__item gaps"
        :col="cardsScale"
        v-for="(file, index) in filesArray"
        :key="index"
        shadow="hover"
      >
        <template #header>
          <h4 class="info" color="info">
            {{ file.name }}
          </h4>
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

@Options({})
export default class extends mixins(
  FileCommandMixin
) {
  public filesArray = [] as FileTypesInterface[];
  public cardsScale = 6;

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