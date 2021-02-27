<template>
	<form class="review-form" @submit.prevent="addTask">

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
      <input id="name" v-model="name" placeholder="nom" :style="{width:'auto'}">
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option v-for="(responsable,index) in responsables" :key="index"> {{responsable.nom }} </option>

      </select>
    </p>

    <p>
      <label for="state">Etat:</label>
      <select v-model="state">
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
      <input type="submit" value="Submit" :style="{width:'auto'}">
    </p>

  </form>  
</template>

<script>
import axios from 'axios';
export default {
	name:'addProjet',
	data() {
    return {
      id: null,
      idc:0,
      nom:null,
      responsable:null,
      state:null,
      startingDate:null,
      avancement:0,
      responsables:[],

      errors: []
    }
  },
  created(){
    this.onSubmitUserGetByType()

  },
  methods:{
    onSubmitUserGetByType() {
      let type = 2
      axios.get('/user/getByType/' + type)
      .then(res => {
        this.responsables = res.data
        for(let key in this.responsables) {
          console.log(this.users[key])
        }
      })
      .catch(error => console.log(error))
    },
    onSubmitUserGetAll() {
      //envoie à l'API
      axios.get('/user/getAll')
      .then(res => {
        //console.log(res)
        this.users = res.data
        for(let key in this.users) {
          console.log(this.users[key])
        }
      })
      .catch(error => console.log(error))
    },
    addProjet(){
      if(this.nom && this.responsable && this.state ){
        let task = {
          id:this.idc,
          idc:this.idc+1,
          nom: this.nom,
          responsable: this.responsable,
          state:this.state,
          avancement:this.avancement
          //startingDate:this.startingDate
        }
        this.$emit("task-added", task)
        this.id=null,
        this.idc+=1,
        this.nom=null,
        this.responsable=null,
        this.state=null,
        this.startingDate=null

      }
      else{
        this.errors=[]
        if(!this.nom) this.errors.push("Name required")
        if(!this.responsable) this.errors.push("Responsable required")
        if(!this.state) this.errors.push("State required")
        //if(!this.startingDate) this.errors.push("Starting Date required")
      }

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