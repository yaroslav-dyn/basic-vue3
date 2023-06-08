<template>
  <main
    class="main--element"
    :class="!isDarkThemeState ? '--light-theme' : '--dark-theme '"
  >
    <div class="top__menu" id="nav">
      <AppNavigation @menuAction="menuAction" />
    </div>
    <router-view />

    <AppFooter :currentDoc="currentDoc" />

    <ActionsModal
      class="action__modal"
      propTitle="Create new document"
      :showDialog="actionDialogVisible"
      :propCurrentCommand="showActionMenuState"
      :modalInfullScreen="modalInfullScreen"
      :close-on-click-modal="false"
      :fullscreen="modalInfullScreen"
      destroy-on-close
      @triggerFullScreen="setFullScreen"
      @onClose="onCloseDialog"
      @onConfirmAction="onConfirmAction"
    />
    
    <!-- TODO: Rewrite to one reused component-->
    <!--NOTE: add file  -->
    <el-tooltip effect="dark" content="Add file" placement="left-start">
      <el-button
        class="interface__show-files--button add"
        type="success"
        :icon="PlusIcon"
        circle
        @click="createFile"
      />
    </el-tooltip>

    <!--NOTE: Edit file  -->
    <el-tooltip effect="dark" content="Edit file" placement="left-start">
      <el-button
        v-if="currentDoc && currentDoc.hasOwnProperty('id')"
        class="interface__show-files--button edit"
        type="success"
        :icon="EditIcon"
        circle
        @click="editFile(currentDoc)"
      />
    </el-tooltip>

    <!--NOTE: Save file  -->
    <el-tooltip effect="dark" content="Save file" placement="left-start">
      <el-button
        class="interface__show-files--button save"
        type="info"
        :icon="DocumentAddIcon"
        circle
        @click="saveFile"
      />
    </el-tooltip>

  <!--NOTE: Open files panel  -->
    <el-tooltip effect="dark" content="Open file" placement="left-start">
    <el-button
      class="interface__show-files--button open"
      type="warning"
      :icon="ArrowLeftBold"
      circle
      @click="openFile"
    />
    </el-tooltip>

    <el-drawer
      v-if="showFilesPage"
      :modal-class="`interface__drawer ${
        !isDarkThemeState ? '--light-theme' : '--dark-theme'
      }`"
      v-model="showFilesPage"
      @closed="onCloseFilePanel"
      :with-header="true"
    >
      <template #header>
        <h4 class="text--center">Open file</h4>
      </template>
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
  Plus,
  DocumentAdd,
  Edit
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
  public DocumentAddIcon = DocumentAdd;
  public EditIcon = Edit;

  mounted() {
   const files = this.getFilesArray();
   this.setFilesArrayAction(files);
  }

}//
</script>
