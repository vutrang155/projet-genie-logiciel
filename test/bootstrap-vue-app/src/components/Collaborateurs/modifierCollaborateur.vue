<template>
  <div>
    <p>MODIFICATION COLLABORATEUR</p>
    <form class="review-form" @submit.prevent="updateCollaborateur">

      <p v-if="errors.length">
        <b> Veuillez corriger les erreurs ci-dessous:</b>
        <ul>
          <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>
      <p class="titre">
        Modification du collaborateur
      </p>

      <p>
        <label for="nomUtilisateur" >UserName:</label>
        <input id="nomUtilisateur" v-model="nomUtilisateur" placeholder="UserName" :style="{width:'auto'}">
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
        <input type="submit" value="Modifier" :style="{width:'auto'}">
      </p>
    
    </form>

    <p id="succes" v-if="statusResOk"> Collaborateur modifié avec succès ! </p>

  </div>
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

        nomUtilisateur: null,
        password: null, 
        nom: null,
        prenom: null,
        adresse: null,
        numeroDeTelephone: null,
        adresseMail: null,
        dateEntree: new Date(),
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
        async getCollaborateur(){
            console.log("idCollaborateurToModify : " + this.idCollaborateurToModify )
            await axios.get('user/getById/' + this.idCollaborateurToModify) 
              .then(res => {
                  console.log(res)
                  this.user = res.data
                  console.log("nom " + res.data.nom)
                  //maj des champs avec les champs du collaborateur
                  this.nomUtilisateur = this.user.nomUtilisateur
                  this.nom = this.user.nom
                  this.prenom = this.user.prenom
                  this.adresse = this.user.adresse
                  this.numeroDeTelephone = this.user.numeroDeTelephone
                  this.adresseMail = this.user.adresseMail
                  this.dateEntree = this.user.dateEntree
                  this.dateSortie = this.user.dateSortie
                  this.compteActive = this.user.compteActive

                  if (this.user.role == 3) this.administrateur = true
                  else if (this.user.role == 2) this.chefDeProjet = true
              })
              .catch(error => console.log(error))
        },
        async updateCollaborateur() {
          this.errors = []
          this.statusResOk = false

          if (this.administrateur) this.role = 3
          else if(this.chefDeProjet) this.role = 2

          //On ne propose pas le changement de mot de passe
          if(this.nomUtilisateur && this.nom && this.prenom) {
            let userToModify = {
              userId: this.idCollaborateurToModify,
              modif : {
                nomUtilisateur : this.nomUtilisateur,
                nom : this.nom,
                prenom : this.prenom,
                adresse : this.adresse,
                numeroDeTelephone : this.numeroDeTelephone,
                adresseMail : this.adresseMail,
                dateEntree : this.dateEntree,
                dateSortie : this.dateSortie,
                role : this.role,
                compteActive : this.compteActive
              }
            }
            //envoie à l'API
            await axios.put('user/update', userToModify)
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                this.statusResOk = true
                console.log("statusResOk" + this.statusResOk)
              }
              
            })
            .catch(error => console.log(error))
          }
          else{
            if(!this.nomUtilisateur) this.errors.push("User name requis ! ")
            if(!this.nom) this.errors.push("Nom requis !")
            if(!this.prenom) this.errors.push("Prenom requis !")
          }
          console.log("modify-done dans modifierCollaborateur, statusResOk : " + this.statusResOk)
          this.$emit('modify-done', this.statusResOk)
        }
      


    }
}
</script>

<style>
#succes {
  padding-left: 60px;
  color: red;
}
</style>