<template>
  <main class="main--element" :class="!isDarkTheme ? '--light-theme' : '--dark-theme '">
    <div id="nav">
      <AppNavigation @onChangeTheme="(theme) => { isDarkTheme = theme }" />
    </div>
    <router-view />
  </main>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElSwitch } from 'element-plus';
import { Moon, Sunny } from '@element-plus/icons-vue';
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
