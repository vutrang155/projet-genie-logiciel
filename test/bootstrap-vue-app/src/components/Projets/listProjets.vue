<template>
<div>
<p> listProjets </p>





	<div v-for="(projet,index) in projets" :key="index">
		<b-card-header  header-tag="header" class="p-1"  role="tab" :style="{width:'80%'}">
			<b-btn block v-b-toggle="'projet-' + projet._id" variant="info">
				{{getColor(projet.etat)}}
			<div v-bind:class="projet.etat" :style="{backgroundColor:color}">
			<div class="col1Projet">


					{{projet.nom}} {{projet.etat}}


			</div>
			<div class="row2Projet">
				<p class="col2Projet">
					Responsable: {{projet.clientId.nom}}
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
					<addTask v-on:annulation-creation-tache="cacherCreerTache" v-if="showAddTask" :ProjetId="projet._id"/>
					<!--<button v-on:click="cacherCreerTache()">Annuler création tâche</button>-->


        </b-card-body>
      </b-collapse>
	</div>




	<div class="row">
    <div class="color-box" :style="{ backgroundColor:'#00aaff'}"></div>
    <div class="column" >

      <p>: A faire</p>
    </div>
    <div class="color-box"  :style="{ backgroundColor:'#eeff00'}"></div>
    <div class="column" >

      <p>: En cours</p>
    </div>
    <div class="color-box"  :style="{ backgroundColor:'#00ff04'}"></div>
    <div class="column" >

      <p>: Terminé</p>
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
			color:null
		}

	},
	created(){
		this.getAllProjets()

	},
	methods:{
		getColor(Etat){
			if(Etat == "Afaire"){
                    this.color ='#00aaff'
                  }
                  if(Etat == "Encours"){
                    this.color ='#eeff00'
                  }
                  if(Etat == "Termine"){
                    this.color ='#00ff04'
                  }
                  if(Etat == "Abandonne"){
                    this.color = '#737874'
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
	background-color:'#00ff04' ;
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
</style>
