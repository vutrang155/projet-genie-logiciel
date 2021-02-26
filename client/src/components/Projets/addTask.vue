<template>
  <p>addTask</p>
	<form class="review-form" @submit.prevent="addTask">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <p>
      Create new task
    </p>

    <p>
      <label for="project">Project:</label>

    <select v-model="project">
        <option>Project A</option>
        <option>Project B</option>
        <option>Project C</option>
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
      <input type="submit" value="Submit">
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
</style>