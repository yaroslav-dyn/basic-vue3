<template>
  <div class="command--panel__search">
    <el-autocomplete
      ref="command_input"
      class="input_autocomplete"
      v-model="commandText"
      :fetch-suggestions="querySearchAsync"
      value-key="value"
      placeholder="Please input"
      @blur="commandText = null"
      @select="actionSelect"
    />
  </div>
</template>

<script lang="ts">
import RunCommandMixin from "@/mixins/RunCommand.mixin";
import { mixins, Options, Vue } from "vue-class-component";

interface LinkItem {
  value: string
  action: string
}

@Options({})
export default class EditorCommandPallet extends mixins(
  RunCommandMixin
) {

  public commandText: string | null = '';
  private links = [] as LinkItem[];

  loadAll() {
    return [
      { value: 'Save document', action: 'SAVE_DOCUMENT' },
      { value: 'Dark mode', action: 'DARK_MODE' },
      { value: 'Light mode', action: 'LIGHT_MODE' },
      { value: 'File: Create new document', action: 'CREATE_FILE' },
      { value: 'File: Open file', action: 'OPEN_FILE'},
      { value: 'Font: increase font size', action: 'INCREASE_FONT_SIZE' },
      { value: 'Font: decrease font size', action: 'DECREASE_FONT_SIZE' },
      { value: 'Font: reset font size', action: 'RESET_FONT_SIZE' },
      { value: 'Font: change font type', action: 'CHANGE_FONT_TYPE' }
    ]
  }

  private timeout: null | ReturnType<typeof setTimeout> = null;

   querySearchAsync(queryString: string, cb: (arg: any) => void)  {

    const results = queryString
      ? this.links.filter(this.createFilter(queryString))
      : this.links

    //@ts-ignore old types
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      cb(results)
    }, 500 * Math.random())
  }

  createFilter(queryString: string) {
    return (link: LinkItem) => link.action.toLowerCase().includes(queryString);
  }

  actionSelect(item: LinkItem) {
    this.runAction(item.action);
    this.commandText = null;
    //@ts-ignore html element
    this.$refs.command_input.blur();
  }

  mounted() {
    this.links = this.loadAll();
  }

}
</script>

<style scoped>

</style>
