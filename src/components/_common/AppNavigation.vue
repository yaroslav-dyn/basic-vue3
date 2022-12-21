<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
    :ellipsis="false"
  >
    <el-menu-item index="1">
     {{ $route.meta.projectName }}
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>File</template>
      <el-menu-item index="2-1">Save</el-menu-item>
      <el-menu-item index="2-2">Save as</el-menu-item>
      <!-- <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
    <el-menu-item
      index="3"
      disabled>
      View
    </el-menu-item>
    <el-menu-item index="4">Help</el-menu-item>
    <div class="flex-grow"></div>

    <div class="switcher--element">
      <el-switch
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        active-color="var(--el-menu-active-color)"
        inactive-color="green"
        size="large"
        v-model="isDarkTheme"
      />
    </div>


  </el-menu>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Moon, Sunny } from '@element-plus/icons-vue';

@Options({
  components: {
  },
  watch: {
    isDarkTheme(val) {
      localStorage.setItem('isDarkTheme', val);
      this.$emit('onChangeTheme', val);
    }
  }
})
export default class AppNavigation extends Vue {
  public Moon = Moon;
  public Sunny = Sunny;
  public activeIndex = 0;
  public activeIndex2 = 0;
  public isDarkTheme = false;

  mounted() {
    const isDarkThemeStatus = localStorage.getItem('isDarkTheme');
    if (isDarkThemeStatus)
      this.isDarkTheme = JSON.parse(isDarkThemeStatus);
  }

}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.switcher--element {
  padding: 1rem 0;
}
</style>