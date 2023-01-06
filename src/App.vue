<template>
  <main
    class="main--element"
    :class="!isDarkThemeState ? '--light-theme' : '--dark-theme '"
  >
    <div
      class="top__menu"
      id="nav"
    >
      <AppNavigation @menuAction="menuAction" />
    </div>
    <router-view />
    <ActionsModal
      propTitle="Create new document"
      :showDialog="actionDialogVisible"
      @onClose="onCloseDialog"
      @onConfirmAction="onConfirmAction"
    />
    <el-drawer
      :modal-class="!isDarkThemeState ? '--light-theme' : '--dark-theme '"
      v-model="showFilesPage"
      title="Open file"
      :with-header="true"
    >
      <FileListing @onFileSelect="showFilesPage = false" />
    </el-drawer>
  </main>
</template>


<script lang="ts">
import { mixins, Options, Vue } from "vue-class-component";
import AppNavigation from "@/components/_common/AppNavigation.vue";
import { mapState } from "vuex";
import ActionsModal from "./components/_parts/ActionsModal.vue";
import FileListing from "./components/_parts/FileListing.vue";
import { RouterView } from "vue-router";
import FileCommandMixin from "./mixins/fileCommand.mixin";

@Options({
  components: {
    AppNavigation,
    ActionsModal,
    FileListing
  },
  computed: {
    ...mapState({
      isDarkThemeState: (state: any) => state.isDarkTheme,
      showActionMenuState: (state: any) => state.showActionMenuState
    })
  },
})
export default class AppComponent extends mixins(
  FileCommandMixin
) {
  isDarkThemeState!: boolean;

  public isDarkTheme = false;


}//
</script>

<style lang="scss">

</style>
