

<template>
  <main class="main--element" :class="!isDarkTheme ? '--light-theme' : '--dark-theme '">
    <div id="nav" >
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>


      <input type="radio" name="colorTheme" :value="false" v-model="isDarkTheme">
      <input type="radio" name="colorTheme" :value="true" v-model="isDarkTheme">
    </div>
    <router-view />
  </main>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";

@Options({
  computed: {
    ...mapState({
      colorTheme: state => state.colorTheme
    })
  }
})
export default class AppComponent extends Vue {

  


public isDarkTheme = false;



}
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
