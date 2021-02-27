<template>
  
	<p>test Projets</p>
	<addProjet/>
	<listProjets/>
	<addTask/>

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
	}
}
</script>

<style>

</style>