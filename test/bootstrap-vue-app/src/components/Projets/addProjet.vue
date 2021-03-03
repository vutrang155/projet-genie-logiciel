<template>
<div>
	<form class="review-form" @submit.prevent="addProjet">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
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
      <select v-model="Etat">
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
    getResponsables() {
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
    getClients() {
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
    getContacts() {
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
    addProjet(){
      console.log(this.responsable)
      let projet = {
          nom:this.nom,
          responsableId:this.responsable._id,
          clientId:this.client._id,
          contactId:this.contact._id,
          etat: "Afaire",
          dateDebutPrevisionnelle:null,
          dateFinPrevisionnelle:null,
          dateDebutReelle:null,
          dateFinReelle:null
        }
        console.log(projet)
      axios.post('/projet/create', projet)
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