<template>
<div>
	<form class="review-form" @submit.prevent="ModifierProjet">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p>
      Modifier un Projet
    </p>

    <p>
      <label for="name" >Nom du Projet:</label>
      <input id="name" v-model="nom" placeholder="nom" :style="{width:'auto'}">
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option v-for="(responsable1,index) in responsables" 
        :value="responsable"
        :key="index">
          {{ responsable1.prenom }}  {{ responsable1.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="client">Client:</label>
      <select v-model="client">

        <option 
        v-for="client1 in clients" :value="client" 
        
        v-bind:key="client1.nom"
        >
        
            {{ client1.nom}}
        </option>


      </select>
    </p>

        <p>
      <label for="contact">Contact:</label>
      <select v-model="contact">
        <option v-for="(contact1,index) in contacts" :value="contact"
        :key="index">
            {{ contact1.prenom}} {{contact1.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="state">Etat:</label>
      <select v-model="EtatTexte" >
        <option v-for="(etat1,index) in etats" :value="EtatTexte"
        :key="index" >
          {{etat1}}
          </option>

      </select>
    </p>

    <p>
      <label for="start">Date de début:</label>
      
      <input disabled type="date" id="start" name="task-start" :style="{width:'auto'}"
       value="2021-02-22"
       min="2021-01-01" max="2022-12-31">
    </p>

    <p>
      <label for="end">Date de fin:</label>

      <input disabled type="date" id="end" name="task-end" :style="{width:'auto'}"
       value="2021-02-22"
       min="2021-01-01" max="2022-12-31">
    </p>


    <p>
      <input type="submit" value="Enregistrer" :style="{width:'auto'}">
    </p>

  </form>  
  <p id="succes" v-if="statusResOk"> Projet modifié avec succès ! </p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
	name:'modifierProjet',
  props:{
    idProjetToModify:{
      type:String,
      required:true
    }
  },
	data() {
    return {
      projet:null,

      nom:null,
      responsable:null,
      responsableNom:null,
      responsablePrenom:null,
      client:null,
      clientNom:null,
      contact:null,
      contactNom:null,
      ContactPrenom:null,
      Etat:null,
      dateFinReelle:null,
			dateDebutReelle:null,
			dateDebutPrevisionnelle:null,
			dateFinPrevisionnelle:null,
      EtatTexte:null,

      responsables:[],
      clients:[],
      contacts:[],
      etats:["A faire","En cours","Terminé","Abandonné"],

      errors: [],
      Etat1:null,

      statusResOk: false,
    }
  },
  created(){
    this.getProjet(),
    this.getResponsables(),
    this.getClients(),
    this.getContacts()
    
  },
  methods:{
    getProjet(){
            console.log("idProjetToModify : " + this.idProjetToModify )
            axios.get('projet/getById/' + this.idProjetToModify) 
              .then(res => {
                  console.log(res)
                  this.projet = res.data
                  console.log("nom " + res.data.nom)
                  //maj des champs avec les champs du collaborateur
                  this.nom = this.projet.nom
                  this.responsable = this.projet.responsableId
                  this.responsablePrenom = this.responsable.prenom
                  this.responsableNom = this.responsable.nom
                  this.client = this.projet.clientId
                  this.clientNom = this.client.nom
                  this.contact = this.projet.contactId
                  this.contactNom = this.contactId.nom
                  this.contactPrenom = this.contactId.prenom
                  this.Etat =this.projet.Etat
                  if(this.Etat == "Afaire"){
                    this.EtatTexte ="A faire"
                  }
                  if(this.Etat == "Encours"){
                    this.EtatTexte ="En cours"
                  }
                  if(this.Etat == "Termine"){
                    this.EtatTexte ="Terminé"
                  }
                  if(this.Etat == "Abandonne"){
                    this.EtatTexte ="Abandonné"
                  }
                  

                  
              })
              .catch(error => console.log(error))

            //this.nom = this.user.nom
            //this.userId = this.user.userId
            /*this.nom = this.user.nom
            this.prenom = this.user.prenom
            this.adresse = this.user.adresse*/
        },
    async getResponsables() {
      let type = 2
      await axios.get('/user/getByType/' + type)
      .then(res => {
        this.responsables = res.data
        for(let key in this.responsables) {
          console.log(this.responsables[key])
        }
      })
      .catch(error => console.log(error))
    },
    async getClients() {
      //envoie à l'API
      await axios.get('/client/getAll')
      .then(res => {
        //console.log(res)
        this.clients = res.data
        for(let key in this.clients) {
          console.log(this.clients[key])
        }
      })
      .catch(error => console.log(error))
    },
    async getContacts() {
      //envoie à l'API
      await axios.get('/contact/getAll')
      .then(res => {
        //console.log(res)
        this.contacts = res.data
        for(let key in this.contacts) {
          console.log(this.contacts[key])
        }
      })
      .catch(error => console.log(error))
    },
    async ModifierProjet(){
			this.errors = []
			this.statusResOk = false
      if(this.EtatTexte == "A faire"){
                    this.Etat1 ="Afaire"
                  }
                  if(this.EtatTexte == "En cours"){
                    this.Etat1 ="Encours"
                  }
                  if(this.EtatTexte == "Terminé"){
                    this.Etat1 ="Termine"
                  }
                  if(this.EtatTexte == "Abandonné"){
                    this.Etat1 ="Abandonne"
                  }
      let projetToModify = { //à modifier
        projetId:this.idProjetToModify,
        modif:{
          nom:this.nom,
          responsableId:this.responsable._id,
          clientId:this.client._id,
          contactId:this.contact._id,
          

          etat:this.Etat
          

        }
      }
      console.log(projetToModify)
      await axios.put('/projet/update', projetToModify) //à modifier
			.then(res => {
        console.log(res)
        if (res.status === 200) {
                this.statusResOk = true
                console.log("statusResOk" + this.statusResOk)
              }
			})
			.catch(error => console.log(error))

      console.log("modify-done dans modifierProjet, statusResOk : " + this.statusResOk)
      this.$emit('modify-done-projet', this.statusResOk)
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