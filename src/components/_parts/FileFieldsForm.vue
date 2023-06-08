<template>
  <el-form :model="actionsForm" class="doc__form">
    <div
      class="d-flex wrapped"
      align="--baseline"
      v-for="el in fileFormScemaArray"
      :key="el.name"
    >
      <!-- <span>{{el.name}}</span> -->

      <el-form-item v-for="g in el.data" :key="g.elIndex" :style="g.style">
        <div
          class="doc__form--label"
          v-if="
            el.name === 'TEXT' ||
            (el.name === 'TASK' && currentFileData.docType === 'TASK')
          "
        >
          <!-- NOTE: Label -->
          <label :for="g.key">
            <strong>{{ g.title }}</strong>
          </label>
        </div>

        <template
          v-if="
            el.name === 'TEXT' ||
            (el.name === 'TASK' && currentFileData.docType === 'TASK')
          "
        >
          <!-- NOTE: Text -->
          <el-input
            :name="g.key"
            class="gaps"
            v-if="g.type === 'text'"
            :id="g.key"
            v-model="g.value"
            placeholder="File name"
            :label="g.title"
            @change="setFileObject($event, g.key)"
          />

          <!-- NOTE: Select -->
          <el-select
            class="w100 gaps"
            v-if="g.type === 'select'"
            :name="g.key"
            v-model="g.value"
            :id="g.key"
            placeholder="Select"
            @change="setFileObject($event, g.key)"
          >
            <el-option
              v-for="opt in g.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>

          <!-- NOTE: Datetime -->
          <el-date-picker
            class="w100"
            v-if="g.type === 'datetime'"
            :name="g.key"
            v-model="g.value"
            type="date"
            placeholder="DueDate"
            @change="setFileObject($event, g.key)"
          />
        </template>
      </el-form-item>
    </div>
    <hr />
    <br />
    <div>
      <!-- NOTE: Textarea -->
      <el-input
        name="Filedata"
        class="doc__form--textarea"
        v-model="currentFileData.data"
        :rows="8"
        type="textarea"
        placeholder="Please input"
        @change="setFileObject($event, 'data')"
      />
    </div>
  </el-form>
</template>

<script lang="ts">

import DocumentOpeartionsMixin from "@/mixins/documentOperations.mixin";
import { FileTypesInterface } from "@/models/file.model";
import { Options, mixins } from "vue-class-component";

@Options({
  props: {
    fileDataProp: {
      type: Object
    }
  }
})
export default class FileFieldsForm extends mixins(
  DocumentOpeartionsMixin
) {

  public fileDataProp?: FileTypesInterface;

  mounted() {
    this.currentFileData = this.fileDataProp ? this.fileDataProp : this.FileData;
  }
}//LINK: src/mixins/documentOperations.mixin.ts
</script>

<style scoped>
</style>