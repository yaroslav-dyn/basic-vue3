<template>
<footer class="app__footer">

  <el-descriptions
    v-if="getDocLength"
    class="margin-top"
    title=""
    :border="true"
    :column="3"
    size="small"
  >
    <template #extra>
    </template>

    <el-descriptions-item label="Name">{{ currentDoc && currentDoc.name }}</el-descriptions-item>

    <el-descriptions-item label="Due date">{{Date()}}</el-descriptions-item>

    <el-descriptions-item label="Created">
      {{Date()}}
    </el-descriptions-item>
    
    <el-descriptions-item label="Length">{{ getDocLength }}</el-descriptions-item>

    <el-descriptions-item label="Status">{{ currentDoc && currentDoc.status || 'TODO' }}</el-descriptions-item>

    <el-descriptions-item label="Updated">
      {{Date()}}
    </el-descriptions-item>



  </el-descriptions>
</footer>

</template>

<script lang="ts">
import { FileTypesInterface } from "@/models/file.model";
import { Options, Vue } from "vue-class-component";


@Options({
   props: {
      currentDoc: {
        type: Object
      }
   }
})
export default class extends Vue {
  
  private currentDoc?: FileTypesInterface;

get getDocLength() {
  return this.currentDoc && this.currentDoc.data.length
}

}
</script>

<style scoped>
</style>