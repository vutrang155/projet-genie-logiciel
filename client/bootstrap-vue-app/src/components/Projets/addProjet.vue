<template>
<div>
	<form class="review-form" @submit.prevent="addProjet">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li> <!-- affiche la liste des erreurs -->
    </ul>
  </p>
    <p class="titre">
      Creation d'un nouveau Projet
    </p>

    <p>
      <label for="name" >Nom du Projet:</label>
      <input id="name" v-model="nom" placeholder="nom" :style="{width:'auto'}">
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option v-for="(responsable,index) in responsables" :key="index"
        v-bind:value="responsable">
          {{ responsable.prenom }}  {{ responsable.nom}}
          
        </option>

      </select>
    </p>

    <p>
      <label for="client">Client:</label>
      <select v-model="client">
        <option v-for="(client,index) in clients" :key="index"
        v-bind:value="client">
            {{ client.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="contact">Contact:</label>
      <select v-model="contact">
        <option v-for="(contact,index) in contacts" :key="index"
        v-bind:value="contact">
            {{ contact.prenom}} {{contact.nom}}
        </option>

      </select>
    </p>

    

    <p>
      <label for="state">Etat:</label>
      <select v-model="EtatTexte">
        <option>A faire</option>
        <option>En cours</option>
        <option>Terminé</option>
      </select>
    </p>

    <p>
      <label for="start">Date de début:</label>

      <input type="date" id="start" name="task-start" :style="{width:'auto'}"
       value="2021-02-22"
       min="2021-01-01" max="2022-12-31">
    </p>

    <p>
      <label for="end">Date de fin:</label>

      <input type="date" id="end" name="task-end" :style="{width:'auto'}"
       value="2021-02-22"
       min="2021-01-01" max="2022-12-31">
    </p>


    <p>
      <input type="submit" value="Créer" :style="{width:'auto'}">
    </p>

  </form>  
  </div>
</template>

<script>
import axios from 'axios';
export default {
	name:'addProjet',
	data() {
    return {
      nom:null,
      responsable:null,
      client:null,
      contact:null,
      Etat:null,
      dateFinReelle:null,
			dateDebutReelle:null,
			dateDebutPrevisionnelle:null,
			dateFinPrevisionnelle:null,
      EtatTexte:null,
      Etat1:null,

      responsables:[],
      clients:[],
      contacts:[],

      errors: []
    }
  },
  created(){
    this.getResponsables(),
    this.getClients(),
    this.getContacts()
  },
  methods:{
    getResponsables() { //load la liste des responsables de projet
      let type = 2
      axios.get('/user/getByType/' + type)
      .then(res => {
        this.responsables = res.data
        for(let key in this.responsables) {
          console.log(this.responsables[key])
        }
      })
      .catch(error => console.log(error))
    },
    getClients() { //récupère la liste des clients
      //envoie à l'API
      axios.get('/client/getAll')
      .then(res => {
        //console.log(res)
        this.clients = res.data
        for(let key in this.clients) {
          console.log(this.clients[key])
        }
      })
      .catch(error => console.log(error))
    },
    getContacts() { //récupère la liste des contacts
      //envoie à l'API
      axios.get('/contact/getAll')
      .then(res => {
        //console.log(res)
        this.contacts = res.data
        for(let key in this.contacts) {
          console.log(this.contacts[key])
        }
      })
      .catch(error => console.log(error))
    },
    addProjet(){ //ajout du proejet dans la base de donnée
      console.log(this.responsable)
       if(this.EtatTexte == "A faire"){ //transforme les variabiable état pour qu'elles soient correctement stockées dans la base de données
                    this.Etat1 ="Afaire"
                  }
                  else if(this.EtatTexte == "En cours"){
                    this.Etat1 ="Encours"
                  }
                  else if(this.EtatTexte == "Terminé"){
                    this.Etat1 ="Termine"
                  }
                  else if(this.EtatTexte == "Abandonné"){
                    this.Etat1 ="Abandonne"
                  }
                  else{
                    console.log("erreur etat")
                  }
      let projet = { //création d'un objet projet
          nom:this.nom,
          responsableId:this.responsable._id,
          clientId:this.client._id,
          contactId:this.contact._id,
          etat:this.Etat1,
          dateDebutPrevisionnelle:null,
          dateFinPrevisionnelle:null,
          dateDebutReelle:null,
          dateFinReelle:null
        }
        console.log(projet)
      axios.post('/projet/create', projet) //envoie du projet dans la BDD
			.then(res => {
        console.log(res)
        const projet = res.data
        this.responsable = projet.responsable
        this.nom = projet.nom
        this.etat = projet.etat
			})
			.catch(error => console.log(error))


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
  input {
    width: 100%;
    height: 25px;
    margin-bottom: 20px;
 }

</style>