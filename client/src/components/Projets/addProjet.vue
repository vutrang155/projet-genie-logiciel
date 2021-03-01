<template>
	<form class="review-form" @submit.prevent="addProjet">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p>
      Creation d'un nouveau Projet
    </p>

    <p>
      <label for="name" >Nom du Projet:</label>
      <input id="name" v-model="nom" placeholder="nom" :style="{width:'auto'}">
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option v-for="(responsable,index) in responsables" :key="index">
          {{ responsable.prenom }}  {{ responsable.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="client">Client:</label>
      <select v-model="client">
        <option v-for="(client,index) in clients" :key="index">
            {{ client.nom}}
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
      Etat:null,
      dateFinReelle:null,
			dateDebutReelle:null,
			dateDebutPrevisionnelle:null,
			dateFinPrevisionnelle:null,

      responsables:[],
      clients:[],

      errors: []
    }
  },
  created(){
    this.getResponsables(),
    this.getClients()
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
    addProjet(){
      let projet = {
          nom:this.nom,
          responsableId:this.responsable.userId,
          clientId:this.client.id,
          contactId:"6034be5b226d51307ef0be57",
          etat: "1",
          dateDebutPrevisionnelle:null,
          dateFinPrevisionnelle:null,
          dateDebutReelle:null,
          dateFinReelle:null
        }
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