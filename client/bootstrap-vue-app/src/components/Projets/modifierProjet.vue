<template>
<div>
	<form class="review-form" @submit.prevent="ModifierProjet">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p class="titre">
      Modifier un Projet
    </p>

    <p>
      <label for="name" >Nom du Projet:</label>
      <input id="name" v-model="nom" placeholder="nom" :style="{width:'auto'}">
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option v-for="(responsable,index) in responsables" 
        :value="responsable"
        :key="index">
          {{ responsable.prenom }}  {{ responsable.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="client">Client:</label>
      <select v-model="client">

        <option 
        v-for="(client,index) in clients" :key="index" 
        
        v-bind:value="client" 
        >
        
            {{ client.nom}}
        </option>


      </select>
    </p>

        <p>
      <label for="contact">Contact:</label>
      <select v-model="contact">
        <option v-for="(contact,index) in contacts" v-bind:value="contact"
        :key="index">
            {{ contact.prenom}} {{contact.nom}}
        </option>

      </select>
    </p>

    <p>
      <label for="state">Etat:</label>
      <select v-model="EtatTexte" >
        <option v-for="(etat,index) in etats" 
        :key="index" v-bind:value="etat">
          {{etat}}
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
      Etat:"Afaire",
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
    async getProjet(){ //récupère les données du projet
            console.log("idProjetToModify : " + this.idProjetToModify )
            await axios.get('projet/getById/' + this.idProjetToModify) 
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
                  this.contactNom = this.contact.nom
                  this.contactPrenom = this.contact.prenom
                  this.Etat =this.projet.etat
                  if(this.Etat == "Afaire"){
                    this.EtatTexte ="A faire"
                  }
                  else if(this.Etat == "Encours"){
                    this.EtatTexte ="En cours"
                  }
                  else if(this.Etat == "Termine"){
                    this.EtatTexte ="Terminé"
                  }
                  else if(this.Etat == "Abandonne"){
                    this.EtatTexte ="Abandonné"
                  }
                  else{this.EtatTexte="A faire"}
                  console.log(this.projet.etat)
                  console.log(this.Etat)
                  console.log(this.EtatTexte)
                  

                  
              })
              .catch(error => console.log(error))

            //this.nom = this.user.nom
            //this.userId = this.user.userId
            /*this.nom = this.user.nom
            this.prenom = this.user.prenom
            this.adresse = this.user.adresse*/
        },
    async getResponsables() {//récupère les responsables de projets
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
    async getClients() { //récupère les clients
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
    async getContacts() { //récupère les contacts
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
    async ModifierProjet(){ //enregistrer les modifications projets
			this.errors = []
			this.statusResOk = false
      if(this.EtatTexte == "A faire"){
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
                  console.log(this.EtatTexte)
                  console.log(this.Etat1)
      let projetToModify = { //à modifier
        projetId:this.idProjetToModify,
        modif:{
          nom:this.nom,
          responsableId:this.responsable._id,
          clientId:this.client._id,
          contactId:this.contact._id,
          

          etat:this.Etat1
          

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

 .titre {
	text-decoration: underline;
	font-size: 20px;
	font-weight: bold;
}

</style>