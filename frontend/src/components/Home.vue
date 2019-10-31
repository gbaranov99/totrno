<template>
  <div class="Home">
    <h1>{{ msg }}</h1>
    <br>
      <div id="line1">
      <h1 id="HeaderNormal1"> Quickly create </h1>
      <h1 id="HeaderTO"> TO</h1>
      <h1 id="HeaderNormal1">dos </h1>
    </div>
    <br>
    <div id="line2">
       <h1 id="HeaderNormal2"> Efficiently </h1>
       <h1 id="HeaderTR"> TR</h1>
       <h1 id="HeaderNormal2">ack your time </h1>
    </div>
    <br>
    <div id="line3">
      <h1 id="HeaderNormal3"> Take critical </h1>
      <h1 id="HeaderNO"> NO</h1>
      <h1 id="HeaderNormal3">tes </h1>
    </div>
    <br>
    <h1> All in one app. </h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-shadow: 3px 3px 2px rgba(63,107,169, 0.5);
  color: #2c3e50;
  position: relative;
  font-size: 300%;
  display: inline;
}
#HeaderTO {
  right: 100px;
  color: #bf1f1f;
}
#HeaderNormal1 {
  right: 100px;
}
#HeaderTR {
  color: #c56f2a;
  left: 77px;
}
#HeaderNormal2 {
  left: 77px;
}
#HeaderNO {
  color: #ac891f;
  right: 83px;
}
#HeaderNormal3 {
  right: 83px;
}
</style>
