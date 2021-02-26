<template>
	<form class="review-form" @submit.prevent="addTask">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p>
      Create new Project
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
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
      <input type="submit" value="Submit">
    </p>

  </form>  
</template>

<script>
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

      errors: []
    }
  },
  methods:{
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