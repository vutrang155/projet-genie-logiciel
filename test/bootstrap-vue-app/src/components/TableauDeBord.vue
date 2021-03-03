<template>
<div>
	
	<listTasks/> <!-- @task-added="addTask"/>-->




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
import listTasks from './TableauDeBord/listTasks.vue'




export default {
	name: 'TableauDeBord',
  components:{
    listTasks
  },
	data(){
    return{
      tasks:[]
    }

  },
  methods:{
    addTask(task){
      this.tasks.push(task)
    }
  }

    
}
</script>

<style>
#TableauDeBord{
  text-align: left;
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
</style>