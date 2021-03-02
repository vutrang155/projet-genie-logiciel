<template>
  <p>Page Collaborateurs</p>
  Je vais modifier le collaborateur avec l'id : {{ idCollaborateurToModify }}
  <div v-if="showModify == true">
    <modifierCollaborateur :idCollaborateurToModify="idCollaborateurToModify"/>
  </div>
  
  <listCollaborateurs v-on:modify-clicked="modifyClicked"/>
  
  <addCollabo/>
  
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
      showModify: false
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
      /*EventBus.$on('modify-clicked', (data) => {
      this.idCollaborateurModified = data
      })*/
      this.idCollaborateurToModify = idCollaborateur
      this.showModify = true
      console.log("idCollaborateurToModify " + this.idCollaborateurToModify)
      console.log("showModify " + this.showModify)
    }
  }
	
}
</script>

<style>

</style>