//

function goBack() {
  window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
}