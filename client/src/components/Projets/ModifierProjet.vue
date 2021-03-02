<template>
	<p>does it ? </p>
	<!--
	<form class="review-form" @submit.prevent="addProjet">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p>
      Modification 
    </p>

    <p>
      <label for="name" >Nom du Projet:</label>
      <input id="name" v-model="nom" value={{nom}} :style="{width:'auto'}">
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
      <select v-model="etat">
        <option value="afaire">A faire</option>
        <option value="encours">En cours</option>
        <option value="terminé">Terminé</option>
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
      <input type="submit" value="Enregistrer" :style="{width:'auto'}">
    </p>

  </form>  -->
</template>

<script>
import axios from 'axios';
export default {
	name:'ModifyProjet',
	props: {
    id:{
      type: String,
      required:true
    }
  },
	data() {
    return {
      nom:null,
      responsable:null,
      client:null,
      etat:null,
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
    this.getClients(),
		this.getProjet()
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
		getProjet(){
			axios.get('/projet/getById')
			.then(res => {
				if(res.data.etat==1){
					this.etat="afaire"
				}
				else if(res.data.etat==2){
					this.etat="encours"
				}
				else if(res.data.etat==3){
					this.etat="terminé"
				}
				this.responsable=res.data.responsableId,
				this.contact=res.data.contactId,
				this.dateDebutPrevisionnelle=res.data.dateDebutPrevisionnelle,
				this.dateFinPrevisionnelle=res.data.dateFinPrevisionnelle,
				this.dateDebutReelle=res.data.dateDebutReelle,
				this.dateFinReelle=res.data.dateFinReelle
			}
			
			)
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