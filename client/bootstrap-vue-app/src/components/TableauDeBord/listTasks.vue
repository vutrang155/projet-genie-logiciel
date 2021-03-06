<template>
<div>


	<div v-for="(task,index) in tasks" :key="index">

		<b-card-header header-tag="header" class="p-1" role="tab" :style="{width:'80%'}"> <!-- tete de l'accordéon-->
			<b-btn block v-b-toggle="'task-' + task._id" variant="info"> <!-- bouton déclencheur de l'accordéon -->
        {{getColor(task.etat)}} <!-- génère infinite loop warning  -->
				<div class="row1Projet" :style="{backgroundColor:color}">
					<div class="col1Projet">


						{{task.nom}} 


					</div>
          <div class="row2Projet">
						<p class="col2task">
							Responsable: {{task.responsableId.prenom}} {{task.responsableId.nom}}
						</p>
						<p class="col2task">
							Avancement: {{task.avancement}}
						</p>
						<p class="col2task">
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
        <b-card-body> <!-- intérieur de l'accordéon déroulé -->


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
      color:'#00aaff',
      user:null
    }

  },
  components:{
    SaisieAvancement
  },
  created(){
    this.getAllTasks()
    //this.getTasksByUser()
  },
  mounted() {
    if (localStorage.user) {
      this.user = localStorage.user;
      
    }
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
                    this.color = '#737874'
                  }
		},
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
    }/*,
    getTasksByUser() {
      //envoie à l'API
      axios.get('/tache/getByUser/603fe5682f652a3bd05108f3'//+this.user._id)
      .then(res => {
        //console.log(res)
        this.tasks = res.data
        for(let key in this.tasks) {
          console.log(this.tasks[key])
        }
      })
      .catch(error => console.log(error))
    }*/
  }

}
</script>

<style>
#listTasks{
  text-align: left;

}
.col2task{
  width: auto;
  margin-right: 50px;
}
 .ToDo{
   background-color: #00aaff;
   width: 800px;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
 .OnGoing{
   background-color: #20d90f;
   width: 80%;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
 .Done{
   background-color: #2f68f7;
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
  margin-right: 50px;
}

</style>
