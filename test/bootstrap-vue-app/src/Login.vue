<template>
  <div class="vue-tempalte">
    <form @submit.prevent="Login">
      <h3>Sign In</h3>
      <div class="form-group">
        <label>nomUtilisateur</label>
        <input type="nomUtilisateur" class="form-control form-control-lg" v-model="nomUtilisateur" placeholder="nomUtilisateur"/>
      </div>
      <div class="form-group">
        <label>Mot de Passe</label>
        <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Mot de Passe"/>
      </div>

      <p id="echec"  v-if="statusResNotOk"> nomUtilisateur ou Mot de Passe Faux </p>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
    </form>
  </div>
</template>
<script>
//import router from "./router"
import axios from "axios"

export default {
  name: 'Login',
  data(){
    return{
      nomUtilisateur:"",
      password:"",
      statusResNotOk: false,

    }
  },
  methods:{
    Login(){
      console.log(this.password)
      console.log(this.nomUtilisateur)

        axios.post('/user/login',{
        nomUtilisateur:this.nomUtilisateur,
        password: this.password
      }).then((response)=>{
        localStorage.setItem('user',JSON.stringify(response.data.user));
        localStorage.setItem('token',response.data.token);
          this.$router.push({ name: 'app' });
        console.log("Ca doit pas afficher ca")
      }).catch((errors) => {
        console.log(errors);
        this.statusResNotOk=true;
        console.log("Cannot login")
      })
    }
  }
}
</script>
<style>
#echec {
  padding-left: 60px;
  color: red;
}
</style>