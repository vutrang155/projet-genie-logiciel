<template>
<div>



	<div  v-for="(task,index) in tasks" :key="index" >
		<div class="ToDo" :style="{backgroundcolor:'#00ff04'}">
		<p>{{task.nom}}</p>

					<div class="rowlT">

          <div class="collT"> Projet: {{task.projetId.nom}} </div>
          <div class="collT"> Responsable: {{task.responsableId.prenom}} </div>
          <div class="collT"> Avancement: {{task.avancement}} </div>

        </div>
		</div>
	</div>

</div>
    
</template>

<script>

import axios from 'axios';
export default {
	name:'listTaskByProjet',
	data(){
		return{
			tasks:[]
		}
	}
	,



	props:{
		ProjetId:{
			type:String,
			required:true
		}
	},
	created(){
		this.getTasksByProjet()
	},
	methods:{
		getTasksByProjet() {
			//envoie à l'API
      axios.get('/tache/getByProjet/'+this.ProjetId)
      .then(res => {
        //console.log(res)
        this.tasks = res.data
        for(let key in this.tasks) {
          console.log(this.tasks[key])
        }
      })
      .catch(error => console.log(error))
		}
	}
	
}
</script>

<style>

 .ToDo{
   background-color: #00aaff;
   width: 800px;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }

</style>