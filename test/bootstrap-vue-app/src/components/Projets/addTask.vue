<template>
<div>
	<form class="review-form" @submit.prevent="addTask">

  <p v-if="errors.length">
    <b> Veuillez corriger les erreurs ci-dessous:</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p class="titre">
      <b>
      Création d'une nouvelle tâche
      </b>
    </p>

    <p>
      <label for="nom" >Nom:</label>
      <input id="nom" v-model="nom" placeholder="Nom de la tâche" :style="{width:'auto'}">
    </p>

    <!--
    <p>
      <label for="projet">Projet:</label>
      <select v-model="projet">
        <option v-for="(projet,index) in projets" :key="index"
        v-bind:value="projet">
            {{ projet.nom }}
        </option>

      </select>
    </p>-->

    <p>
      <label for="responsable">Collaborateur responsable de la tâche:</label>
      <select v-model="responsable">
        <option v-for="(responsable,index) in collaborateurs" :key="index"
        v-bind:value="responsable">
            {{ responsable.prenom }}  {{ responsable.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="etat">Etat:</label>
      <select v-model="etat">
        <option>A faire</option>
        <option>En cours</option>
        <option>Terminée</option>
      </select>
    </p>

    <p>
      <label for="datepickerDebut">Date de début:</label>
      <b-form-datepicker id="datepickerDebut" placeholder="Choisissez une date" v-model="dateDebutPrevisionnelle" reset-button></b-form-datepicker>
      {{ dateDebutPrevisionnelle }}
    </p>

    <p>
      <label for="description">Description:</label>
      <textarea id="description" v-model="description"></textarea>
    </p>

    <p>
      <label for="chargeAssociee">Charge Associée (en journées):</label>
			<input type="number" id="chargeAssociee" v-model="chargeAssociee" :style="{width:'auto'}" min="0" >
    </p>
    
    <p>
      <label for="responsable">Prédécesseur(s):</label>
      <select multiple v-model="predecesseurs">
        <option v-for="(tache,index) in tachesProjet" :key="index"
        v-bind:value="predecesseurs">
            {{ tache.nom }}
        </option>

      </select>
    </p>



    <p>
      <input type="submit" value="Créer tâche" :style="{width:'auto'}">
    </p>

    <button v-on:click="annulerCreationTache()">Annuler création tâche</button>
  </form>

  

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'addTask',
	data() {
    return {
      nom: null,
      projet: null,
      responsable:null,
      etat:null,
      dateDebutPrevisionnelle: null,
      description:null,
      chargeAssociee: null, //charge: 1, pour initaliser la charge à 1
    
      projets: [],
      collaborateurs: [],

      tachesProjet: [],
      predecesseurs: [],

      errors: [],
      statusResOk: false
    }
  },
  props:{
		ProjetId:{
			type:String,
			required:true
		}
	},
  created() {
    this.getAllProjets(),
    this.getAllCollaborateurs(),
    this.getTachesProjet()
  },
  methods:{
    async addTask(){
      this.errors = []
      this.statusResOk = false
      //console.log("Nom projet : " + this.projet.nom)
      console.log("Projet id " + this.ProjetId)
      if(this.nom && this.responsable._id && this.ProjetId && this.etat && this.dateDebutPrevisionnelle){

        let etatAEnvoyer;
        switch (this.etat) {
          case 'A faire':
            etatAEnvoyer = "Afaire"
            break
          case 'En cours':
            etatAEnvoyer = "Encours"
            break
          case 'Terminée':
            etatAEnvoyer = "Termine"
            break
        }
        console.log("Etat a envoyer : " + etatAEnvoyer)
        let task = {
          nom: this.nom,
          responsableId: this.responsable._id, 
          projetId: this.ProjetId,
          etat: etatAEnvoyer,
          dateDebutPrevisionnelle: this.dateDebutPrevisionnelle,
          description: this.description,
          chargeAssociee: this.chargeAssociee,
        }
        console.log(task)

        //this.$emit("task-added", task)

        //on remet les champs à null
        this.nom = null
        this.projet = null
        this.responsable = null
        this.etat = null
        this.dateDebutPrevisionnelle = null
        this.description = null
        this.chargeAssociee = null

        //envoie à l'API
        console.log("taks.projetId avant envoie : " + task.projectId)
        await axios.post('/tache/create', task)
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
        this.errors=[]
        if(!this.nom) this.errors.push("Nom requis !")
        if(!this.responsable._id) this.errors.push("Responsable requis !")
        if(!this.etat) this.errors.push("Etat requis !")
        if(!this.dateDebutPrevisionnelle) this.errors.push("Date requise !")
      }

    }, 
    async getAllProjets() {
      await axios.get('/projet/getAll')
      .then(res => {
        //console.log(res)
        this.projets = res.data
        /*for(let key in this.projets) {
          console.log(this.projets[key])
        }*/
      })
      .catch(error => console.log(error))
    },
    async getAllCollaborateurs() {
      //envoie à l'API
      await axios.get('/user/getAll')
      .then(res => {
          //console.log(res)
          this.collaborateurs = res.data
          for(let key in this.collaborateurs) {
              console.log(this.collaborateurs[key])
          }
      })
      .catch(error => console.log(error))
    },
    async getTachesProjet() {
      await axios.get('/tache/getByProjet/' + this.ProjetId)
      .then(res => {
        this.tachesProjet = res.data
        /*for(let key in this.projets) {
          console.log(this.projets[key])
        }*/
      })
      .catch(error => console.log(error))
    },
    annulerCreationTache() {
      this.$emit('annulation-creation-tache')
    }
    
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
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
}
 textarea {
   width: 100%;
   height: 160px;
   display: block;
   resize: none;

 }
 .titre{
   font-size: x-large;
 }
</style>