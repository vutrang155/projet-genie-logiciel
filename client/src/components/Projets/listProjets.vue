<template>
<p> listProjets </p>
	<div v-for="(projet, index) in projets" :key="index">
		<!--  <div class={{projet.etat}}>   -->
		<div class="row1Projet" :style="{backgroundColor:color}">
			<div class="col1Projet">


					{{projet.nom}}


			</div>
			<div class="row2Projet">
				<p class="col2Projet">
					Responsable: 
				</p>
				<p class="col2Projet">
					Client: 
				</p>
				<p class="col2Projet">
					Contact Id: {{projet.contactId}}
				</p>
				<p>
					<input type="submit" value="Modifier" :style="{width:'auto'}">
				</p>
			</div>

			<!--<ModifyProjet :id={{projet.id}};>-->

		</div>
	</div>




	

	<div class="row">
    <div class="color-box" :style="{ backgroundColor:'#00aaff'}"></div>
    <div class="column" >

      <p>:To Do</p>
    </div>
    <div class="color-box"  :style="{ backgroundColor:'#eeff00'}"></div>
    <div class="column" >

      <p>:On Going</p>
    </div>
    <div class="color-box"  :style="{ backgroundColor:'#00ff04'}"></div>
    <div class="column" >

      <p>:Done</p>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios';
//import ModifyProjet from './ModifierProjet.vue';
export default {
	name:'listProjets',
	/*components:{
		ModifyProjet
	},*/
	data(){
		return{
			projets:[],
			client:null,
			color:'#00aaff'
		}
		
	},
	created(){
		this.getAllProjets()
	},
	methods:{
		
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
    }/*,
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
.afaire{
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 80%;
	height:80px;
}
.row1Projet {

	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 80%;
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
	width:31%;

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