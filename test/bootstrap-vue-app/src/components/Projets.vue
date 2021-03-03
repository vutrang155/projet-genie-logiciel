<template>
<div>
  
	<p>test Projets</p>
	<addProjet/>
	<div v-if="showModifyProjet == true">
    <modifierProjet v-on:modify-done-Projet="modifyDone" :idProjetToModify="idProjetToModify" />
  </div>
	<listProjets v-on:modify-clicked-projet="ModifyClicked"				/>
	<addTask/>
</div>
</template>

<script>
import addProjet from './Projets/addProjet.vue'
import addTask from './Projets/addTask.vue'
import listProjets from './Projets/listProjets.vue'

export default {
  name:'Projets',
	components:{
		addProjet,
		addTask,
		listProjets
		
	},
	data(){
		showModificationSucces,
		idProjetToModify,
		showModifyProjet,
		showModify
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