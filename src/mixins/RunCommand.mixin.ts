import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

@Options({

  methods: {
    ...mapActions({
      changeFontSize: 'changeFontSize'
    })
  }
})
export default class RunCommandMixin extends Vue {
  changeFontSize!: (action: string) => any;

  runAction(action: string): void {
    this.changeFontSize(action);
  }


}
