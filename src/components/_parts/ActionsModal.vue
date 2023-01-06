<template>
  <el-dialog
    v-model="isOpen"
    :title="propTitle"
    width="30%"
    draggable
    @close="$emit('onClose', false)"
  >

    <el-form
      :model="actionsForm"
    >
      <el-form-item >
        <el-input
          v-model="actionsForm.fileName"
          placeholder="File name"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('onClose', false)">Cancel</el-button>

        <el-button
          type="primary"
          @click="onConfirmAction"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script  lang="ts">
import { Options, Vue } from 'vue-class-component';

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
    PropCurrentCommand: {

    }
  },
  watch: {
    showDialog(val) {
      this.isOpen = val;
    }
  }
})
export default class ActionsModal extends Vue {
  propTitle?: string;
  showDialog!: boolean;

  public isOpen = false;
  public fileName = '';
  public actionsForm = {
    fileName: ''
  }

  onConfirmAction() {
    this.$emit('onConfirmAction', this.actionsForm)
  }


}//

</script>

<style scoped>

</style>