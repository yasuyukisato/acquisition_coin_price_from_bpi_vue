const app = new Vue({
  el: "#app",
  data: {
    bpi: null,
    hasError: false,
    loading: true,
    beforMount: "hoge",
    mounted: "mounted",
  },
  // 各ライフサイクルのメソッドを実行してデバック
  // beforeCreate()とmounted()を入れ替えても呼ばれる順番は変わらない
  beforeCreate() {
    console.log("beforeCreated");
  },
  created() {
    console.log("Created");
  },

  // 読み込み時では呼ばれない
  beforMount() {
    this.beforMount = "beforeMount";
    console.log("beforeMount");
  },
  // 読み込み時に呼ばれている
  //即時関数でかく場合はthisの参照先がwindowオブジェクトとなるため、bind(this)でvueインスタンスと紐付けをする必要がある
  // アロー関数で書くとthisはvueインスタンスをさすため、bind(this)はいらない
  mounted() {
    console.log("mounted");
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        this.bpi = response.data.bpi;
        console.log(this);
      })
      .catch(
        function (error) {
          console.log(error);
          this.hasError = true;
        }.bind(this)
      )
      .finally(
        function () {
          this.loading = false;
        }.bind(this)
      );
  },
  // 意図的にコンポーネントが削除される処理をかかないと到達しない
  beforeDestroy() {},

  // Vue.js のフィルタは、本質的には「値を取り、加工し、加工した値を返す」関数
  filters: {
    currencyDecimal(value) {
      // 小数点切り捨て
      return value.toFixed();
    },
  },
});
