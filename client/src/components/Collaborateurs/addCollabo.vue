<template>
  <form class="review-form" @submit.prevent="addCollabo">

  <p v-if="errors.length">
    <b> Veuillez corriger les erreurs ci-dessous:</b>
    <ul>
      <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    <p>
      Création d'un nouveau Collaborateur
    </p>

		<p>
			<label for="ID">Numéro d'identifiant:</label>
			<input type="number" id="ID" name="ID" :style="{width:'auto'}"
       min="0" >
		</p>

		<p>
      <label for="Password">Mot de Passe:</label>
      <textarea id="auto" v-model="Password"></textarea>
    </p>

		<p>
      <label for="Nom">Nom:</label>
      <textarea id="auto" v-model="Nom"></textarea>
    </p>

		<p>
      <label for="Prenom">Prénom:</label>
      <textarea id="auto" v-model="Prenom"></textarea>
    </p>

    <p>
      <label for="start">Date d'entrée':</label>

      <input type="date" id="start" name="task-start" :style="{width:'auto'}"
       value="2021-02-22"
       min="2021-01-01" max="2022-12-31">
    </p>

    <p>
			<label for="ID">Numéro d'identifiant:</label>
			<input type="number" id="ID" name="ID" :style="{width:'auto'}"
       min="1" max="3" >
		</p>

	
  
  
  </form>

</template>

<script>
export default {
	name:'addCollabo',
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



 
 #auto{
		width: auto;
		height: auto;
 }
</style>