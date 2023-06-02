<template>
  <el-dialog
    v-model="isOpen"
    width="60%"
    draggable
    @close="$emit('onClose', false)"
  >

  <template #header>

      <h3>{{getTitle}}</h3>

    <hr />
  </template>

    <el-form action="#" :model="actionsForm" class="doc__form">
      <div v-for="el in fileFormScemaArray" :key="el.name">
        <template v-for="g in el.data" :key="g.elIndex">
          <el-form-item>
            <div class="doc__form--label">
              <label :for="g.key">
                <strong>{{ g.title }}</strong>
              </label>
            </div>

            <el-input
              class="gaps"
              v-if="g.type === 'text'"
              :id="g.key"
              v-model="g.value"
              placeholder="File name"
              :label="g.title"
            />

            <el-select
              class="gaps"
              v-if="g.type === 'select'"
              v-model="g.value"
              :id="g.key"
              placeholder="Select"
            >
              <el-option
                v-for="opt in g.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>

          </el-form-item>

            <el-form-item v-if="g.type === 'textarea'">
              <el-input
                class="doc__form--textarea"
                v-model="g.value"
                :rows="2"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
        </template>

        <hr />
        <br />
      </div>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('onClose', false)">Cancel</el-button>
        <el-button type="primary" @click="onConfirmAction"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script  lang="ts">
import { Options, mixins } from 'vue-class-component';
import FileFormScema from '@/models/fileFormSchema';
import { FileTypesInterface } from "@/models/file.model";
import  DocumentOpeartionsMixin from '@/mixins/documentOperations.mixin'

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
    }
  },
  watch: {
    showDialog(val) {
      this.isOpen = !!val;
    }
  }
})
export default class ActionsModal extends mixins(
  DocumentOpeartionsMixin
) {
  propTitle?: string;
  showDialog!: boolean | object;
  propCurrentCommand?: { file: FileTypesInterface, operation: string };


  public isOpen = false;
  public fileName = '';
  public actionsForm = {
    fileName: ''
  }
  public fileFormScema = FileFormScema;

  onConfirmAction() {
    this.$emit('onConfirmAction', this.actionsForm)
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

.doc__form {
  &--textarea {
    flex-basis: 100%;
  }
  &--label {
    flex-basis: 100%;
  }
}
</style>