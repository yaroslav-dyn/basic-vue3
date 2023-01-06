<template>
  <el-row :gutter="20">
    <el-col
      span="3"
      v-for="file in filesArray"
      :key="file.name"
      @click="selectFile(file)"
    >
      <el-avatar
        :icon="documentIcon"
        shape="square"
        :size="50"
        src="/"
      />
      <div class="text--center">{{ file.name }}</div>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import { FileTypesInterface } from '@/models/file.model';
import { Options, Vue } from 'vue-class-component';
import { mapActions } from 'vuex';
import { Document } from '@element-plus/icons-vue'


@Options({
  methods: {
    ...mapActions({
      setCurrentFileAction: 'setCurrentFileAction'
    })
  }
})
export default class FileListingComponent extends Vue {
  setCurrentFileAction!: (data: FileTypesInterface) => void;

  public documentIcon = Document;
  public filesArray = [] as FileTypesInterface[];



  getFilsArray() {
    const tempArray = localStorage.getItem('filesArray');
    tempArray && (this.filesArray = JSON.parse(tempArray));
  }

  selectFile(file: FileTypesInterface) {
    this.setCurrentFileAction(file);
    this.$emit('onFileSelect')
  }

  mounted() {
    this.getFilsArray();
  }

}

</script>

<style scoped>

</style>