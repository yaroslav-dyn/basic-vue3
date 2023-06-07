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
      <router-link to="/">
        {{ getHomelinkName }}
      </router-link>
    </el-menu-item>
    <el-sub-menu index="2" @select="onChangeCommand">
      <template #title>File</template>
      <el-menu-item index="1-2" @click="onChangeCommand('CREATE_FILE')"
        >New</el-menu-item
      >
      <el-menu-item index="1-1" @click="onChangeCommand('OPEN_FILE')"
        >Open</el-menu-item
      >
      <el-menu-item index="2-1" @click="onChangeCommand('SAVE_DOCUMENT')"
        >Save</el-menu-item
      >
      <el-menu-item index="2-2">Save as</el-menu-item>
      <!-- <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
    <el-menu-item index="3"> 
      <router-link to="/files"> Files </router-link>
    </el-menu-item>
    <el-menu-item index="4" disabled> View </el-menu-item>
    <el-menu-item index="5">
      <router-link to="/about"> About </router-link>
    </el-menu-item>
    <el-menu-item index="6">
      <router-link to="/help"> Help </router-link>
    </el-menu-item>

    <div class="flex-grow" flex-grow="1"></div>

    <div class="switcher--element">
      <el-switch
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        active-color="var(--el-menu-active-color)"
        inactive-color="green"
        size="large"
        v-model="isDarkTheme"
        @input="onChangeTheme"
      />
    </div>
  </el-menu>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Moon, Sunny } from '@element-plus/icons-vue';
import { mapActions, mapState } from "vuex";
import { FileTypesInterface } from "@/models/file.model";

@Options({
  methods: {
    ...mapActions({
      setColorThemeAction: 'setColorTheme'
    })
  },
  computed: {
    ...mapState({
      isDarkThemeState: (state: any) => state.isDarkTheme,
      currentDocSate: (state: any) => state.currentDocSate
    })
  },
  watch: {
    isDarkThemeState(val) {
      localStorage.setItem('isDarkTheme', val);
      this.isDarkTheme = val;
    }
  }
})
export default class AppNavigation extends Vue {

  setColorThemeAction!: (value: boolean) => void;
  currentDocSate?: FileTypesInterface;

  public Moon = Moon;
  public Sunny = Sunny;
  public activeIndex = 0;
  public activeIndex2 = 0;
  public isDarkTheme = false;

  onChangeTheme() {
    this.setColorThemeAction(this.isDarkTheme);
  }

  onChangeCommand(command: string) {
    console.log('menu command', command);
    this.$emit('menuAction', command);

  }

  get getHomelinkName() {
    const projectName = process.env.VUE_APP_PROJECT_NAME;
    return this.currentDocSate && 'name' in this.currentDocSate && this.currentDocSate.name.length > 0
      ? this.currentDocSate.name
      : projectName
  }

  mounted() {
    const isDarkThemeStatus = localStorage.getItem('isDarkTheme');
    if (isDarkThemeStatus)
      this.isDarkTheme = JSON.parse(isDarkThemeStatus);
    this.setColorThemeAction(this.isDarkTheme);
  }

}
</script>

<style scoped>


.switcher--element {
  padding: 1rem 2rem 0;
}
</style>
