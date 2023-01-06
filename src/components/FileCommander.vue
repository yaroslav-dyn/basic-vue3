<template>
  <div>

  </div>
</template>

<script lang="ts">
import FileCommandMixin from "@/mixins/fileCommand.mixin";
import { mixins, Options  } from "vue-class-component";

  @Options({})
  export default class FileCommanderPage extends mixins(
    FileCommandMixin
  ) {

    
  }
</script>

<style scoped>

</style>