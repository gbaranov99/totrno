<template>
  <div>
    <nav>
      <router-link v-for="routes in links"
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page:'/home'
        },
        {
          id: 1,
          text: 'About',
          page:'/about'
        },
        {
          id: 2,
          text: 'Contact',
          page:'/contact'
        },
        {
          id: 3,
          text: 'Getting Started',
          page:'/getstarted'
        },
        {
          id: 4,
          text: 'Login',
          page:'/login'
        },
        {
          id: 5,
          text: 'Sign Up',
          page:'/signup'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
nav{  
  width:100%;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
  text-align: center;
  background-color: #333;
}

nav a{
  display: inline-block;
  color:#edeff2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
</style>
