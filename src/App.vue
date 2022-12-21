<template>
  <main class="main--element" :class="!isDarkTheme ? '--light-theme' : '--dark-theme '">
    <div id="nav">
      <AppNavigation @onChangeTheme="(theme: boolean) => { isDarkTheme = theme }" />
    </div>
    <router-view />
  </main>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppNavigation from "@/components/_common/AppNavigation.vue";

@Options({
  components: {
    AppNavigation
  },
})
export default class AppComponent extends Vue {

  public isDarkTheme = false;

}//
</script>

<style lang="scss">
</style>
