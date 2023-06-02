import { ElNotification } from "element-plus";
import { Options, Vue } from "vue-class-component";

type ToastTypeModel = "" | "success" | "warning" | "info" | "error";

@Options({})
export default class GeneralMixin extends Vue {
  
  showNotification(toastTitle: string, toastMessage: string, toastType: ToastTypeModel) {
    ElNotification({
      title: toastTitle,
      message: toastMessage,
      type: toastType,
    })
  }


  


}//
