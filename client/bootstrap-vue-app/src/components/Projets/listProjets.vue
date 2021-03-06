<template>
<div>






	<div v-for="(projet,index) in projets" :key="index"> <!-- parcourt tout les projets -->
		<b-card-header  header-tag="header" class="p-1"  role="tab" :style="{width:'80%'}">
			<b-btn block v-b-toggle="'projet-' + projet._id" variant="info">
				<!--{{getColor(projet.etat)}}-->
			<div v-bind:class="projet.etat" :style="{backgroundColor:color}">
			<div class="col1Projet">


					{{projet.nom}} 


			</div>
			<div class="row2Projet">
				<p class="col2Projet">
					Responsable: {{projet.responsableId.prenom}} {{projet.responsableId.nom}}
				</p>
				<p class="col2Projet">
					Client: {{projet.clientId.nom}}
				</p>
				<p class="col2Projet">
					Contact: {{projet.contactId.prenom}} {{projet.contactId.nom}}
				</p>
				<!--
				<p>
					<input type="submit" value="Modifier" :style="{width:'auto'}">
				</p>-->



			</div>
			<!--<div id="myDIV">
				This is my DIV element.


			<ModifyProjet :id="projet.id" />
			</div>-->

		</div>
			</b-btn>
		</b-card-header >
		<b-collapse :id="'projet-' + projet._id" accordion="my-accordion" role="tabpanel">
        <b-card-body>
					<button v-on:click="modifierProjet(projet._id)">Modifier</button>
					<button v-on:click="creerTache()">Créer tâche</button>

					<listTaskByProjet :ProjetId="projet._id" />
					<addTask v-on:annulation-creation-tache="cacherCreerTache" v-on:add-task="addTask" v-if="showAddTask" :ProjetId="projet._id"/>
					<p id="succes" v-if="showTaskCreationSucces"> Tâche créée avec succès ! </p>
					<!--<button v-on:click="cacherCreerTache()">Annuler création tâche</button>-->


        </b-card-body>
      </b-collapse>
	</div>



	<!-- légende couleurs -->
	<div class="row">
    <div class="color-box" :style="{ backgroundColor:'#4cdcfc'}"></div>
    <div class="column" >

      <p>: A faire</p>
    </div>
    <div class="color-box"  :style="{ backgroundColor:'#20d90f'}"></div>
    <div class="column" >

      <p>: En cours</p>
    </div>
    <div class="color-box"  :style="{ backgroundColor:'#2f68f7'}"></div>
    <div class="column" >

      <p>: Terminé</p>
    </div>
	<div class="color-box"  :style="{ backgroundColor:'#868f85'}"></div>
    <div class="column" >

      <p>: Abandonné</p>
    </div>

  </div>



  </div>
</template>

<script>
import axios from 'axios';
import listTaskByProjet from './listTaskByProjet.vue'
import addTask from './addTask.vue'

//import ModifyProjet from './ModifierProjet.vue';
export default {
	name:'listProjets',
	components:{
		listTaskByProjet,
		addTask
	},
	data(){
		return{
			statusResOk: false,
			projets:[],
			client:null,
			text:'test',
			tasks:[],
			showAddTask: false,
			color:null,
			showTaskCreationSucces: false
		}

	},
	created(){
		this.getAllProjets()

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
		modifierProjet(idProjet) {
			//App.Vue.prototype.$eventHub.$emit('modify-clicked', idCollaborateur)
			this.$emit('modify-clicked-projet', idProjet)
			/*if (event) {
				alert(event.target.tagName)
			}*/
		},
		methodThatForcesUpdate() {
      // ...
      this.$forceUpdate();
		},
		Modify(){
			var x = document.getElementById("myDIV");
			if (x.style.display === "none") {
				x.style.display = "block";
			}
			else {
				x.style.display = "none";
			}
		},
		getAllProjets() {
			//envoie à l'API
			axios.get('/projet/getAll')
			.then(res => {
				//console.log(res)
				this.projets = res.data
				for(let key in this.projets) {
					console.log(this.projets[key])
				}
			})
			.catch(error => console.log(error))
		},
		creerTache() {
			this.showAddTask = true
		},
		cacherCreerTache() {
			this.showAddTask = false
			this.showTaskCreationSucces = false
		}, 
		addTask(statusResOk) {
			if(statusResOk) this.showTaskCreationSucces = true 
			console.log("add-task dans listProjets, statusResOk : " + statusResOk)
		}

		/*,
		getRespoFromId(id){
			axios.get("/Client/getbyId/'id'")
			.then(res => {
				this.client =res.data
			})

		}*/
	}





}
</script>


<style>
#myDIV {
  width: 100%;
  padding: 50px 0;
  text-align: center;
  background-color: lightblue;
  margin-top: 20px;
}
.afaire{
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 80%;
	height:80px;
}
.Afaire {
	background-color: '#00aaff';
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 95%;
	height:80px;
}
.Encours {
	background-color: '#eeff00';
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 95%;
	height:80px;
}
.Termine {
	background-color:'#868f85' ;
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 95%;
	height:80px;
}
.Abandonne {
	background-color:'#737874' ;
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 95%;
	height:80px;
}

.row2Projet {
  display: flex;
	padding: 10px;
	width: 100%;
	height: auto;
}
.col1Projet{
	width:100%;
	height:auto;
	font-size:x-large;
	margin-left: 10px;


}
.col2Projet{
	width:33%;

}
.row {
  display: flex;
}

.column {

  width: auto;
  text-align: left;
  padding: 10px;
  height: auto;
}

.color-box {
  margin-left: 20px;
  width: 80px;
  height: 40px;
  margin-top: 5px;
 }

  input {
    width: 100%;
    height: 25px;
    margin-bottom: 20px;
 }

#succes {
  padding-left: 60px;
  color: green;
}
</style>
