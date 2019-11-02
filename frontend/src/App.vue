<template>
  <div id="app">
    <TopNav></TopNav>
    <router-view/>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
export default {
  name: 'app',
  components: {
    'TopNav': TopNav
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
body {
  margin:0px;
  width: 100%;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  
  background-color:#edeff2;
  background-size: cover;
 /* 
  background-image: linear-gradient(red,white);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  */
}
#background {
  background-image: linear-gradient(red,yellow);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.Forms {
  background-size: cover;
  background-color: white;
  width: 800px;
  height: 800px;
  margin: 0 auto;
  margin-top: 0px;
  text-align: left;
}
h1.Form {
  line-height: 100px;
  color: #2c3e50;
  position: relative;
  font-size: 300%;
  text-align: center;
}
p.Form {
  font-size:100%;
  margin-left: 20px;
}
a.FormInline {
  font-size:100%;
  color: #2c3e50;
}
a:visited.FormInline {
  text-decoration: none;
}
p.FormInlineLeft {
  position: relative;
  display: inline;
  font-size:100%;
  margin-left: 20px;
}
p.FormInlineRight {
  position: relative;
  display: inline;
  font-size:100%;
}
</style>
