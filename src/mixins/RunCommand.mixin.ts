import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

@Options({

  methods: {
    ...mapActions({
      changeFontSize: "changeFontSize",
      setColorTheme: "setColorTheme"
    })
  }
})
export default class RunCommandMixin extends Vue {

  changeFontSize!: (action: string) => void;
  setColorTheme!: (action: boolean) => void;

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
      default:
        return
    }
  }
}//
