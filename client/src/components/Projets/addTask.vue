<template>
	<form class="review-form" @submit.prevent="addTask">

  <p v-if="errors.length">
    <b> Veuillez corriger les erreurs ci-dessous:</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p>
      Création d'une nouvelle tâche
    </p>

    <p>
      <label for="project">Projet:</label>

    <select v-model="project">
        <option>Projet A</option>
        <option>Projet B</option>
        <option>Projet C</option>
    </select>
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option>Jean-Claude</option>
        <option>Jean-Marc</option>
        <option>Jean-Paul</option>
        <option>Jean-François</option>
        <option>Jean-Jean</option>
      </select>
    </p>

    <p>
      <label for="state">Etat:</label>
      <select v-model="state">
        <option>ToDo</option>
        <option>OnGoing</option>
        <option>Done</option>
      </select>
    </p>

    <p>
      
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
      <label for="Description">Description:</label>
      <textarea id="Description" v-model="Description"></textarea>
    </p>

    <p>
      <label for="charge">Charge Associée (en demi-journée):</label>


			<input type="number" id="Charge" name="Charge" :style="{width:'auto'}"
       min="0" >


    </p>




        <p>
      <input type="submit" value="Submit" :style="{width:'auto'}">
    </p>
  </form>
</template>

<script>
export default {
  name:'addTask',
	data() {
    return {
      id: null,
      idc:0,
      project:null,
      responsable:null,
      state:null,
      startingDate:null,
      avancement:0,

      errors: []
    }
  },
  methods:{
    addTask(){
      
      if(this.project && this.responsable && this.state ){
        let task = {
          id:this.idc,
          idc:this.idc+1,
          project: this.project,
          responsable: this.responsable,
          state:this.state,
          avancement:this.avancement
          //startingDate:this.startingDate
        }
        this.$emit("task-added", task)
        this.id=null,
        this.idc+=1,
        this.project=null,
        this.responsable=null,
        this.state=null,
        this.startingDate=null

      }
      else{
        this.errors=[]
        if(!this.project) this.errors.push("Project required")
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
</style>