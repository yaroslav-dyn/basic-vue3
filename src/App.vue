

<template>
  <main class="main--element" :class="!isDarkTheme ? '--light-theme' : '--dark-theme '">
    <div id="nav" >
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>


      <input type="radio" id="lightTheme" name="colorTheme" :value="false" v-model="isDarkTheme">
      <label for="lightTheme">Light</label>
      <input type="radio" id="darkTheme" name="colorTheme" :value="true" v-model="isDarkTheme">
      <label for="darkTheme">Dark</label>
    </div>
    <router-view />
  </main>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
  watch: {
    isDarkTheme(val) {
      localStorage.setItem('isDarkTheme', val);
    }
  }
})
export default class AppComponent extends Vue {

public isDarkTheme = false;

  mounted() {
    const isDarkThemeStatus = localStorage.getItem('isDarkTheme');
    if (isDarkThemeStatus)
      this.isDarkTheme = JSON.parse(isDarkThemeStatus);
  }

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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
