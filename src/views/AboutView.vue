<template>
  <div class="content__page--container about-view">
    <h1>About</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {

  mounted() {
    console.log('mount');
    
  }

}

</script>
