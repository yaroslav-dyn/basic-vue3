<template>
  <div class="home">
    <MemoIndex/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MemoIndex from "@/components/Memo/MemoIndex.vue";

@Options({
  components: {
    MemoIndex,
  },
})
export default class Home extends Vue {}
</script>
