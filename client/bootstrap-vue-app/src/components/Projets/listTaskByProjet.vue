<template>
<div>



	<div  v-for="(task,index) in tasks" :key="index" >
		{{getColor(task.etat)}}
		<div v-bind:class="task.etat" >
		<p>{{task.nom}}</p>

					<div class="rowlT">

          <div class="collT"> Projet: {{task.projetId.nom}} </div>
          <div class="collT"> Responsable: {{task.responsableId.prenom}} </div>
          <div class="collT"> Avancement: {{task.avancement}} </div>
          <div class="collT"> Date début prévisionnelle: {{task.dateDebutPrevisionnelle | formatDate}} </div>



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
		getColor(Etat){
			if(Etat == "Afaire"){
                    this.color ='#4cdcfc'
                  }
                  if(Etat == "Encours"){
                    this.color ='#20d90f'
                  }
                  if(Etat == "Termine"){
                    this.color ='#2f68f7'
                  }
                  if(Etat == "Abandonne"){
                    this.color = '#868f85'
                  }
		},
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

 .Afaire{
   background-color: #4cdcfc;
   width: 800px;
   padding: 20px;
   margin: 10px;
   border: 1px solid #d8d8d8;
 }
  .Encours{
   background-color: #20d90f;
   width: 800px;
   padding: 20px;
   margin: 10px;
   border: 1px solid #d8d8d8;
 }
  .Termine{
   background-color: #2f68f7;
   width: 800px;
   padding: 20px;
   margin: 10px;
   border: 1px solid #d8d8d8;
 }
  .Abandonne{
   background-color: #868f85;
   width: 800px;
   padding: 20px;
   margin: 10px;
   border: 1px solid #d8d8d8;
 }
</style>