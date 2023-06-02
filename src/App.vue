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
    <AppFooter :currentDoc="currentDoc" />
    <ActionsModal
      propTitle="Create new document"
      :showDialog="actionDialogVisible"
      :propCurrentCommand="showActionMenuState"
      @onClose="onCloseDialog"
      @onConfirmAction="onConfirmAction"
    />
      <el-button
        class="interface__show-files--button add"
        type="success"
        :icon="PlusIcon"
        circle
        @click="createFile"
      />
      <el-button
        class="interface__show-files--button"
        type="warning"
        :icon="ArrowLeftBold"
        circle
        @click="openFile"
      />
    <el-drawer
      v-if="showFilesPage"
      :modal-class="!isDarkThemeState ? '--light-theme' : '--dark-theme '"
      v-model="showFilesPage"
      @closed="onCloseFilePanel"
      title="Open file"
      :with-header="true"
    >
      <FileListing />
    </el-drawer>
  </main>
</template>


<script lang="ts">
import { mixins, Options, Vue } from "vue-class-component";
import AppNavigation from "@/components/_common/AppNavigation.vue";
import AppFooter from "@/components/_common/AppFooter.vue";
import { mapState } from "vuex";
import ActionsModal from "./components/_parts/ActionsModal.vue";
import FileListing from "./components/_parts/FileListing.vue";
import { RouterView } from "vue-router";
import FileCommandMixin from "./mixins/fileCommand.mixin";
import {
  ArrowLeftBold,
  Plus
} from '@element-plus/icons-vue'
import { FileTypesInterface } from "./models/file.model";

@Options({
  components: {
    AppNavigation,
    ActionsModal,
    FileListing,
    AppFooter
  },
  computed: {
    ...mapState({
      isDarkThemeState: (state: any) => state.isDarkTheme,
      showActionMenuState: (state: any) => state.showActionMenuState,
      currentDoc: (state: any) => state.currentDocSate
    })
  },
})
export default class AppComponent extends mixins(
  FileCommandMixin
) {
  isDarkThemeState!: boolean;
  currentDoc!: FileTypesInterface;
  showActionMenuState?: boolean | object;

  public isDarkTheme = false;
  public ArrowLeftBold = ArrowLeftBold;
  public PlusIcon = Plus;

}//
</script>

<style lang="scss">

</style>
