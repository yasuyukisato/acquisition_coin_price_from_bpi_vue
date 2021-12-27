const app = new Vue({
  el: "#app",
  data: {
    bpi: null,
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
  mounted() {
    console.log("mounted");
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(function (response) {
        this.bpi = response.data.bpi;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // 意図的にコンポーネントが削除される処理をかかないと到達しない
  beforeDestroy() {},
});
