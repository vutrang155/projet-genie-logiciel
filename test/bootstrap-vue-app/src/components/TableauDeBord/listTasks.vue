<template>
<div>
  
	<div v-for="(task,index) in tasks" :key="index">
		<b-card-header header-tag="header" class="p-1" role="tab" :style="{width:'80%'}">	
			<b-btn block v-b-toggle="'task-' + task._id" variant="info">
				<div class="row1Projet" :style="{backgroundColor:color}">
					<div class="col1Projet">


						{{task.nom}} {{index}}


					</div>
          <div class="row2Projet">
						<p class="col2Projet">
							Responsable: {{task.responsableId.prenom}} {{task.responsableId.nom}}
						</p>
						<p class="col2Projet">
							Avancement: {{task.avancement}}
						</p>
						<p class="col2Projet">
							Projet: {{task.projetId.nom}}
						</p>
				<!--
				<p>
					<input type="submit" value="Modifier" :style="{width:'auto'}">
				</p>
				<button v-on:click="Modify">Modifier</button>-->

				
					</div>
        <!--<div id="myDIV">
				This is my DIV element.
			
			
        <ModifyProjet :id="projet.id" />
        </div>-->

				</div>
			</b-btn>
		</b-card-header >
		<b-collapse :id="'task-' + task._id" accordion="my-accordion" role="tabpanel">
        <b-card-body>
					
          
					<SaisieAvancement :taskId="task._id"  />
					


        </b-card-body>
      </b-collapse>
	</div>
</div>
</template>

<script>

import SaisieAvancement from './SaisieAvancement.vue'
import axios from 'axios';
export default {
  name: 'listTasks',
  data(){
    return{
      tasks:[],
      color:'#00aaff'
    }
    
  },
  components:{
    SaisieAvancement
  },
  created(){
    this.getAllTasks()
  },
  methods:{
    getAllTasks() {
      //envoie à l'API
      axios.get('/tache/getAll')
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
#listTasks{
  text-align: left;
}
 .ToDo{
   background-color: #00aaff;
   width: 800px;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
 .OnGoing{
   background-color: #eeff00;
   width: 80%;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
 .Done{
   background-color: #00ff04;
   width: 80%;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
.rowlT{
  display: flex;
}
.collT{
  width:auto;
  margin-right: 30px;
}

</style>