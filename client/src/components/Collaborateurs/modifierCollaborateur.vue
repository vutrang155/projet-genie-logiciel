<template>
  <p>MODIFICATION COLLABORATEUR</p>
  <form class="review-form" @submit.prevent="addCollaborateur">

    <p v-if="errors.length">
      <b> Veuillez corriger les erreurs ci-dessous:</b>
      <ul>
        <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
    <p class="titre">
      Modification du collaborateur
    </p>

    <!--<p>
      <label for="userId" >Id de l'utilisateur:</label>
      <input id="userId" v-model="userId" placeholder="userId" :style="{width:'auto'}">
    </p>

    <p>
      <label for="password" >Mot de passe:</label>
      <input id="password" v-model="password" placeholder="Mot de passe" :style="{width:'auto'}">
    </p>-->

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
      <label for="dateEntree">Date d'entrée:</label>
      <input type="date" :style="{width:'auto'}"
      vmodel="dateEntree" >
      
       <!-- Mettre ici comme value de base la date d'aujourd'hui-->
    </p>
      {{ dateEntree }}
    <p>

    </p>

    <p>
      <label for="dateSortie">Date de sortie:</label>
      <input type="date" id="dateSortie" name="dateSortie" :style="{width:'auto'}"  vmodel="dateSortie">
      
      <!--min="2021-01-01" max="2022-12-31" -->
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


</template>

<script>
import axios from 'axios';
//import Datepicker from 'vuejs-datepicker';
export default {
	name:'modifierCollaborateur',
    props: {
      idCollaborateurToModify: {
          type: String,
          required: true
      }
    },
	data() {
        return {
        user: null,


        userId: null,
        password: null, 
        nom: null,
        prenom: null,
        adresse: null,
        numeroDeTelephone: null,
        adresseMail: null,
        dateEntree: new Date(), //.toISOString().slice(0,10), //.toISOString().substr(0, 10),//moment().format('YYYY-MM-DD'),
        dateSortie: new Date(),
        compteActive: true,
        chefDeProjet: false,
        administrateur: false,
        role: 1,
        statusResOk: false,

        errors: []
        }
    },
    created() {
        this.getCollaborateur()
    },
    methods:{
        getCollaborateur(){
            console.log("idCollaborateurToModify : " + this.idCollaborateurToModify )
            axios.get('user/getById/' + this.idCollaborateurToModify) 
              .then(res => {
                  console.log(res)
                  this.user = res.data
                  console.log("nom " + res.data.nom)
                  //maj des champs avec les champs du collaborateur
                  this.nom = this.user.nom
                  this.prenom = this.user.prenom
                  this.adresse = this.user.adresse
                  this.numeroDeTelephone = this.user.numeroDeTelephone
                  this.adresseMail = this.user.adresseMail
                  this.dateEntree = this.user.dateEntree
                  this.dateSortie = this.user.dateSortie
              })
              .catch(error => console.log(error))

            //this.nom = this.user.nom
            //this.userId = this.user.userId
            /*this.nom = this.user.nom
            this.prenom = this.user.prenom
            this.adresse = this.user.adresse*/
        }


    }
}
</script>

<style>

</style>