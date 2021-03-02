<template>
  <div>
    <p>Page Collaborateurs</p>
    Je vais modifier le collaborateur avec l'id : {{ idCollaborateurToModify }}
    <div v-if="showModify == true">
      <modifierCollaborateur v-on:modify-done="modifyDone" :idCollaborateurToModify="idCollaborateurToModify" />
    </div>
    <p id="succes" v-if="showModificationSucces"> Collaborateur modifié avec succès ! </p>
    
    
    <listCollaborateurs v-on:modify-clicked="modifyClicked"/>
    
    <addCollabo/>
  </div>
</template>



<script>
import addCollabo from './Collaborateurs/addCollabo.vue'
import listCollaborateurs from './Collaborateurs/listCollaborateurs.vue'
import modifierCollaborateur from './Collaborateurs/modifierCollaborateur.vue'
//import { EventBus } from '../event-bus.js';

export default {
	name:'Collaborateurs',
  components:{
    addCollabo,
    listCollaborateurs,
    modifierCollaborateur
  },
  data() {
    return {
      idCollaborateurToModify: null,
      showModify: false,
      showModificationSucces: false
    }
  }, 
  /*updated() {
    this.showModify = true
  },
  created() {
    this.modifyClicked()
  }, */
  methods : {
    modifyClicked(idCollaborateur) {
      this.showModificationSucces = false //pour enlever "Collaborateur modifié avec succès !" si le bouton modifier à été re-cliqué pour un autre collaborateur
      this.idCollaborateurToModify = idCollaborateur
      this.showModify = true //fais apparaître le formulaire de modification (component modifierCollaborateur)
      console.log("idCollaborateurToModify " + this.idCollaborateurToModify)
      console.log("showModify " + this.showModify)
    }, 
    modifyDone(statusResOk) {
      if(statusResOk) this.showModificationSucces = true 
      this.showModify = false
      console.log("modify-done dans Collaborateurs, statusResOk : " + statusResOk)
    }
  }
	
}
</script>

<style>
#succes {
  padding-left: 60px;
  color: red;
}
</style>