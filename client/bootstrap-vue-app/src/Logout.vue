<template>
  <p>Logout</p>
</template>
<script>
export default {
  data (){
    return {
    }
  },
  created:function(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('user'))
    this.$router.push({ name: 'Login' });
  }
}
</script>