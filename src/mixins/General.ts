import { Vue } from "vue-class-component";

export default class General extends Vue {
  logger(context: any, data: any) {
    console.log(context, data);
  }
}
