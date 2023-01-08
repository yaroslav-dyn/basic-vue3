import { mixins, Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import FileCommandMixin from "./fileCommand.mixin";
@Options({
  methods: {
    ...mapActions({
      changeFontSize: "changeFontSize",
      setColorTheme: "setColorTheme",
      openFileAction: "openFileAction"
    })
  }
})
export default class RunCommandMixin extends mixins(
  FileCommandMixin
) {

  changeFontSize!: (action: string) => void;
  setColorTheme!: (action: boolean) => void;
  openFileAction!: (state: boolean) => void;

  runAction(action: string): void {
    console.log("act", action);
    switch (action) {
      case "INCREASE_FONT_SIZE":
      case "DECREASE_FONT_SIZE":
        this.changeFontSize(action);
        break;
      case "LIGHT_MODE":
        this.setColorTheme(false);
        break;
      case "DARK_MODE":
        this.setColorTheme(true);
        break;
      case "CREATE_FILE":
        this.createFile();
        break;  
      case "OPEN_FILE":
        this.openFileAction(true);  
        break;
      default:
        return
    }
  }
}//
