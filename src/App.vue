<template>
  <main class="main--element" :class="!isDarkThemeState ? '--light-theme' : '--dark-theme '">
    <div class="top__menu" id="nav">
      <AppNavigation />
    </div>
    <router-view />
  </main>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppNavigation from "@/components/_common/AppNavigation.vue";
import { mapState } from "vuex";

@Options({
  components: {
    AppNavigation
  },
  computed: {
    ...mapState({
      isDarkThemeState: (state: any) => state.isDarkTheme,
    })
  },
})
export default class AppComponent extends Vue {
  isDarkThemeState!: boolean

  public isDarkTheme = false;

}//
</script>

<style lang="scss">
</style>
