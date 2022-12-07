<template>
  <div class="home">
    <EditorIndex/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EditorIndex from "@/components/EditorView.vue";

@Options({
  components: {
    EditorIndex,
  },
})
export default class Home extends Vue {}
</script>
