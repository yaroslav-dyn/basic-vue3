<template>
  <div>is legal {{ legalAge }}</div>
</template>

<script lang="ts">
import { Options, mixins } from "vue-class-component";
import General from "@/mixins/General";

@Options({
  components: {},
})
export default class Home extends mixins(General) {
  age = 18;

  get legalAge(): boolean {
    return this.age >= 18;
  }

  mounted(): void {
    console.log("on mounted", this.$route.name);
    this.logger(this, "data");
  }
}
</script>
