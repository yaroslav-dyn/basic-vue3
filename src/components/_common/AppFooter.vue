<template>
<footer class="app__footer">

  <el-descriptions
    v-if="getDocLength"
    class="margin-top"
    title=""
    :border="true"
    :column="4"
    size="small"
  >
    <template #extra>
    </template>

    <el-descriptions-item label="Number">{{ currentDoc && currentDoc.number }}</el-descriptions-item>

    <el-descriptions-item label="Type">{{currentDoc && currentDoc.docType}}</el-descriptions-item>

    <el-descriptions-item label="Due date">{{currentDoc && currentDoc.dueDate}}</el-descriptions-item>


    <el-descriptions-item label="Created">
      {{currentDoc && currentDoc.createdAt}}
    </el-descriptions-item>

    <el-descriptions-item label="Name">{{ currentDoc && currentDoc.name }}</el-descriptions-item>
    
    <el-descriptions-item label="Status">{{ currentDoc && currentDoc.status || 'TODO' }}</el-descriptions-item>
    
    <el-descriptions-item label="Length">{{ getDocLength }}</el-descriptions-item>


    <el-descriptions-item label="Updated">
      {{currentDoc && currentDoc.changedAt}}
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
  return this.currentDoc && this.currentDoc?.data?.length;
}

}
</script>

<style scoped>
</style>