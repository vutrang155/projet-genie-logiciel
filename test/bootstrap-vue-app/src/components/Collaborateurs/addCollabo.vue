<template>
  <div>
    <form class="review-form" @submit.prevent="addCollaborateur">

      <p v-if="errors.length">
        <b> Veuillez corriger les erreurs ci-dessous:</b>
        <ul>
          <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>
      <p class="titre">
        Création d'un nouveau collaborateur
      </p>

      <p>
        <label for="nomUtilisateur" >UserName:</label>
        <input id="nomUtilisateur" v-model="nomUtilisateur" placeholder="UserName" :style="{width:'auto'}">
      </p>

      <p>
        <label for="password" >Mot de passe:</label>
        <input id="password" v-model="password" placeholder="Mot de passe" :style="{width:'auto'}">
      </p>

      <p>
        <label for="nom" >Nom:</label>
        <input id="nom" v-model="nom" placeholder="Nom" :style="{width:'auto'}">
      </p>

      <p>
        <label for="prenom" >Prénom:</label>
        <input id="prenom" v-model="prenom" placeholder="Prénom" :style="{width:'auto'}">
      </p>

      <p>
        <label for="adresse" >Adresse:</label>
        <input id="adresse" v-model="adresse" placeholder="Adresse" :style="{width:'auto'}">
      </p>

      <p>
        <label for="numeroDeTelephone" >Numéro de téléphone:</label>
        <input id="numeroDeTelephone" v-model="numeroDeTelephone" placeholder="XX XX XX XX XX " :style="{width:'auto'}">
      </p>

      <p>
        <label for="adresseMail" >Adresse e-mail:</label>
        <input id="adresseMail" v-model="adresseMail" placeholder="xxxx@xxxx.xxx" :style="{width:'auto'}">
      </p>

      <!--
      <div>
        <datepicker></datepicker>
      </div>
      -->
      <p>
        <label for="datepickerEntree">Date d'entrée:</label>
        <b-form-datepicker id="datepickerEntree" placeholder="Choisissez une date" v-model="dateEntree" reset-button></b-form-datepicker>
      </p>

      <p>
        <label for="datepickerSortie">Date de sortie:</label>
        <b-form-datepicker id="datepickerSortie" placeholder="Choisissez une date" v-model="dateSortie" reset-button></b-form-datepicker>
      </p>

      <!--<label for="compteActive">Compte activé</label> -->
      
      <div class="checkboxes">
        <label for="compteActive"> 
          <span>Compte Activé : </span><input type="checkbox" id="compteActive" v-model="compteActive" >
        </label>
      </div>
      <div class="checkboxes">
        <label for="chefDeProjet"> 
          <span>Chef de projet : </span><input type="checkbox" id="chefDeProjet" v-model="chefDeProjet">
        </label>
      </div>
      <div class="checkboxes">
        <label for="administrateur"> 
          <span>Administrateur : </span><input type="checkbox"  v-model="administrateur">
        </label>
      </div> 

      <p>
        <input type="submit" value="Créer" :style="{width:'auto'}">
      </p>
    
    </form>

    <p id="succes" v-if="statusResOk"> Collaborateur crée avec succès ! </p>
  </div>
</template>

<script>
import axios from 'axios';
//import Datepicker from 'vuejs-datepicker';
export default {
	name:'addCollabo',
  /*components: {
    Datepicker
  }, */
	data() {
    return {
      nomUtilisateur: null,
      password: null, 
      nom: null,
      prenom: null,
      adresse: null,
      numeroDeTelephone: null,
      adresseMail: null,
      dateEntree: new Date().toISOString().slice(0,10), //date par défaut initialisée à la date d'aujourd'hui //moment().format('YYYY-MM-DD'),
      dateSortie: null, 
      compteActive: true,
      chefDeProjet: false,
      administrateur: false,
      role: 1,
      statusResOk: false,

      errors: []
    }
  },
  /*created() {
    this.setDateToToday()
  },*/
  methods:{
    async addCollaborateur(){
      this.errors = []
      this.statusResOk = false
      if(this.nomUtilisateur && this.password && this.nom && this.prenom) { //champs requis
        //création de l'utilisateur
        if (this.administrateur) this.role = 3
        else if(this.chefDeProjet) this.role = 2
  
        let userToCreate = {
          nomUtilisateur: this.nomUtilisateur,
          password: this.password,
          nom : this.nom,
          prenom : this.prenom,
          adresse : (this.adresse != null) ? this.adresse : null,
          numeroDeTelephone : (this.numeroDeTelephone != null) ? this.numeroDeTelephone : null,
          adresseMail : (this.adresseMail != null) ? this.adresseMail : null,
          dateEntree : (this.dateEntree != null) ? this.dateEntree : null,
          dateSortie : (this.dateSortie != null) ? this.dateSortie : null,
          compteActive : (this.compteActive) ? this.compteActive : null,
          role : this.role
        }
        console.log(userToCreate)
        //envoie à l'API
        await axios.post('/user/new', userToCreate)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.statusResOk = true
            console.log("statusResOk" + this.statusResOk)
          }
        })
        .catch(error => {
          console.log(error)
          this.statusResOk = false
        })
      }
      else{
        if(!this.nomUtilisateur) this.errors.push("User name requis ! ")
        if(!this.password) this.errors.push("Mot de passe requis !")
        if(!this.nom) this.errors.push("Nom requis !")
        if(!this.prenom) this.errors.push("Prenom requis !")
      }

    }/*,
    setDateToToday() {
      let today = new Date().toISOString().substr(0, 10);
      document.querySelector("#dateEntree").value = today;
    }*/
  }
	
}
</script>

<style>
  .review-form {
    width: 800px;
    padding: 20px;
    margin: 40px;
    border: 1px solid #d8d8d8;
  }

  .titre {
    text-decoration: underline;
    font-size: 20px;
  }

  label {
      display: block;
      font: 1rem 'Fira Sans', sans-serif;
  }

  input,
  label {
      margin: .4rem 0;
  }
  
  #auto{
    width: auto;
    height: auto;
  }

  /* .checkboxes label, .checkboxes input et .checkboxes label span, pour positionner la checkbox juste à côté du label */ 
  .checkboxes label {
    display: inline-block;
    padding-right: 10px;
    white-space: nowrap;
  }
  .checkboxes input {
    vertical-align: middle;
  }
  .checkboxes label span {
    vertical-align: middle;
  }

  #succes {
    padding-left: 60px;
    color: red;
  }
</style>