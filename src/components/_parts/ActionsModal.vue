<template>
  <el-dialog
    :custom-class="`action_modal ${
      getFileDesignProperties((getDataFile && getDataFile.docType) || 'TEXT')
        .color
    }__bg`"
    v-model="isOpen"
    width="60%"
    draggable
    @close="$emit('onClose', false)"
  >
    <template #header>
      <div class="action_modal__header">
        <small class="doc__number" v-if="getDataFile">
          {{ currentFileData.number }}
        </small>
        <div class="d-flex" justify="--space-between" align="--center">
          <h3>
            {{ getTitle }}
          </h3>

          <el-icon
            class="fullscreen__icon action__pointer"
            :size="24"
            @click="triggerFullscreen(!fullScreenState)"
          >
            <component :is="fullScreenState ? FullScreen : ScaleToOriginal" />
          </el-icon>
        </div>
      </div>
    </template>

    <!--SECTION: File form -->
    <FileFieldsForm 
      v-if="isOpen"
      :fileDataProp="currentFileData"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('onClose', false)">Cancel</el-button>
        <el-button class="action__btn" type="primary" @click="onConfirmAction">
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script  lang="ts">
import { Options, mixins } from 'vue-class-component';
import { FileTypesInterface } from "@/models/file.model";
import DocumentOpeartionsMixin from '@/mixins/documentOperations.mixin';
import { FullScreen, ScaleToOriginal } from "@element-plus/icons-vue";
import FileFieldsForm from './FileFieldsForm.vue';

@Options({
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    propTitle: {
      type: String,
      default: ''
    },
    propCurrentCommand: {
      type: [Boolean, Object]
    },
    modalInfullScreen: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    FileFieldsForm
  },
  watch: {
    showDialog(val) {
      this.isOpen = !!val;
      if (this.getDataFile) {
        this.currentFileData = this.getDataFile;
      } else
        this.currentFileData = this.FileData;
    },
    modalInfullScreen(val) {
      this.fullScreenState = val;
    }
  }
})
export default class ActionsModal extends mixins(
  DocumentOpeartionsMixin
) {
  propTitle?: string;
  showDialog!: boolean | object;
  propCurrentCommand?: { file: FileTypesInterface, operation: string };

  public FullScreen = FullScreen;
  public ScaleToOriginal = ScaleToOriginal;
  public isOpen = false;
  public fileName = '';
  // public actionsForm = {
  // }
  // }
  // public fileFormScema = FileFormScema;
  public currentFileData = this.FileData as FileTypesInterface;
  public fullScreenState = false;


  // setFileObject<T extends keyof FileTypesInterface>(value: any, key: T) {
  //   this.currentFileData[key] = value
  // }

  onConfirmAction() {
    let postData = {} as FileTypesInterface;
    Object.assign(postData, this.currentFileData);
    let curOperation = 'EDIT_FILE';
    if (!this.getDataFile) {
      curOperation = 'CREATE_FILE';
      Object.assign(postData, { id: Math.random() * 100, number: this.stringToHash(postData.name), createdAt: Date() })
    } else {
      Object.assign(postData, { changedAt: Date() })
    }

    this.$emit('onConfirmAction', { data: postData, type: curOperation });
  }


  triggerFullscreen(state: boolean) {
    this.fullScreenState = state;
    this.$emit('triggerFullScreen', state);
  }

  get getTitle() {
    // @ts-ignore TODO
    const currentTitle = this.propCurrentCommand && this.propCurrentCommand?.file?.name;
    // @ts-ignore TODO
    const currentOperation = this.propCurrentCommand && this.propCurrentCommand?.operation || 'CREATE_DOCUMENT';
    return this.hasOpeartion ? this.$t("message." + currentOperation) + ` ${currentTitle} ` : this.propTitle;
  }

  get hasOpeartion() {
    return this.propCurrentCommand && typeof this.propCurrentCommand === 'object'
  }

  get getDataFile() {
    //@ts-ignore TODO: add types
    return this.hasOpeartion && this.propCurrentCommand.file;
  }


}//

</script>

<style lang="scss">
.gaps {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.fullscreen__icon {
  display: inline-block;
  margin-right: 4rem;
}

.doc__form {
  &--textarea {
    flex-basis: 100%;
    .el-textarea__inner {
      font-size: 1.6rem;
    }
  }
  &--label {
    flex-basis: 100%;
  }
}
</style>