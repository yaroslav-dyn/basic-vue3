<template>
  <el-dialog
    class="action__modal"
    v-model="isOpen"
    width="60%"
    draggable
    @close="$emit('onClose', false)"
  >
    <template #header>
      <div class="action_modal__header">
        <div class="d-flex" justify="--space-between" align="--center">
          <h3>{{ getTitle }}</h3>

          <i class="doc__number" v-if="getDataFile">
            {{ currentFileData.number }}
          </i>
          <el-button
            size="large"
            circle
            class="fullscreen__icon"
            :icon="!fullScreenState ? FullScreen : ScaleToOriginal"
            @click="triggerFullscreen(!fullScreenState)"
          />

        </div>
      </div>
    </template>

    <el-form :model="actionsForm" class="doc__form">
      <div
        class="d-flex wrapped"
        align="--baseline"
        v-for="el in fileFormScemaArray"
        :key="el.name"
      >
        <!-- <span>{{el.name}}</span> -->

        <el-form-item v-for="g in el.data" :key="g.elIndex" :style="g.style">
          <div
            class="doc__form--label"
            v-if="
              el.name === 'TEXT' ||
              (el.name === 'TASK' && currentFileData.docType === 'TASK')
            "
          >
            <!-- NOTE: Label -->
            <label :for="g.key">
              <strong>{{ g.title }}</strong>
            </label>
          </div>

          <template
            v-if="
              el.name === 'TEXT' ||
              (el.name === 'TASK' && currentFileData.docType === 'TASK')
            "
          >
            <!-- NOTE: Text -->
            <el-input
              :name="g.key"
              class="gaps"
              v-if="g.type === 'text'"
              :id="g.key"
              v-model="g.value"
              placeholder="File name"
              :label="g.title"
              @change="setFileObject($event, g.key)"
            />

            <!-- NOTE: Select -->
            <el-select
              class="w100 gaps"
              v-if="g.type === 'select'"
              :name="g.key"
              v-model="g.value"
              :id="g.key"
              placeholder="Select"
              @change="setFileObject($event, g.key)"
            >
              <el-option
                v-for="opt in g.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>

            <!-- NOTE: Datetime -->
            <el-date-picker
              class="w100"
              v-if="g.type === 'datetime'"
              :name="g.key"
              v-model="g.value"
              type="date"
              placeholder="DueDate"
              @change="setFileObject($event, g.key)"
            />
          </template>
        </el-form-item>
      </div>
      <hr />
      <br />
      <div>
        <!-- NOTE: Textarea -->
        <el-input
          name="Filedata"
          class="doc__form--textarea"
          v-model="currentFileData.data"
          :rows="8"
          type="textarea"
          placeholder="Please input"
          @change="setFileObject($event, 'data')"
        />
      </div>

      <!-- <div>
        <pre>
          {{currentFileData}}
        </pre>
      </div> -->
    </el-form>

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
import FileFormScema from '@/models/fileFormSchema';
import { FileTypesInterface } from "@/models/file.model";
import DocumentOpeartionsMixin from '@/mixins/documentOperations.mixin';
import { FullScreen, ScaleToOriginal } from "@element-plus/icons-vue";

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
  public actionsForm = {

  }
  public fileFormScema = FileFormScema;
  public currentFileData = this.FileData as FileTypesInterface;
  public fullScreenState = false;


  setFileObject<T extends keyof FileTypesInterface>(value: any, key: T) {
    this.currentFileData[key] = value
  }

  onConfirmAction() {
    let postData = {} as FileTypesInterface;
    Object.assign(postData, this.currentFileData);
    let curOperation = 'EDIT_FILE';
    if (!this.getDataFile) {
      curOperation = 'CREATE_FILE';
      Object.assign(postData, { id: Math.random() * 100, number: this.stringToHash(postData.name), createdAt: Date() })
    } else {
      Object.assign(postData, { changedAt: Date()})
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
    const currentOperation = this.propCurrentCommand && this.propCurrentCommand?.operation;
    return this.hasOpeartion ? `${currentOperation} ${currentTitle}` : this.propTitle;
  }

  get hasOpeartion() {
    return this.propCurrentCommand && typeof this.propCurrentCommand === 'object'
  }

  get getDataFile() {
    //@ts-ignore TODO: add types
    return this.hasOpeartion && this.propCurrentCommand.file;
  }

  get fileFormScemaArray() {
    return this.fileFormScema.map(s => {
      //@ts-ignore ???
      s.data.map(sg => {
        if (this.getDataFile && sg.key in this.getDataFile) {
          //@ts-ignore TODO: add types
          sg.value = this.getDataFile[sg.key];
        } else {
          //@ts-ignore TODO: add types
          sg.value = this.FileData[sg.key]
        }
        return sg
      })
      return s
    })
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
  margin-right: 2rem;
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