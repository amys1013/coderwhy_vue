<script>
axios({
  url: "/getUser",
  method: "get",
  responseType: "json",
  data: {
    a: 1,
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });

$ajax;
export default {
  setup() {},
};
</script>