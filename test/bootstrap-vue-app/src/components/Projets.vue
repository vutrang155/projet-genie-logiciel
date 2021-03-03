<template>
<div>
  
	<p>test Projets</p>
	<addProjet/>
	<div v-if="showModifyProjet == true">
    <modifierProjet v-on:modify-done-Projet="modifyDoneProjet" :idProjetToModify="idProjetToModify" />
  </div>
  <p id="succes" v-if="showModificationSucces"> ¨Projet modifié avec succès ! </p>
	<listProjets v-on:modify-clicked-projet="modifyClicked"				/>
</div>
</template>

<script>
import addProjet from './Projets/addProjet.vue'
import listProjets from './Projets/listProjets.vue'
import modifierProjet from './Projets/modifierProjet.vue'

export default {
  name:'Projets',
	components:{
		addProjet,
		listProjets,
		modifierProjet
		
	},
	data(){
		return{
		showModificationSucces:false,
		idProjetToModify:null,
		showModifyProjet:false,
		showModify:false
		}
	},
	methods:{
		modifyClicked(idProjet) {
      this.showModificationSucces = false //pour enlever "Collaborateur modifié avec succès !" si le bouton modifier à été re-cliqué pour un autre collaborateur
      this.idProjetToModify = idProjet
      this.showModifyProjet = true //fais apparaître le formulaire de modification (component modifierCollaborateur)
      console.log("idProjetToModify " + this.idProjetToModify)
      console.log("showModifyProjet " + this.showModifyProjet)
    }, 
    modifyDoneProjet(statusResOk) {
      if(statusResOk) this.showModificationSucces = true 
      this.showModifyProjet = false
      console.log("modify-done dans Projets, statusResOk : " + statusResOk)
    }
	}

}
</script>

<style>

</style>