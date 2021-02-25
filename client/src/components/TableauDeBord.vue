<template>
	<!--
	<list-tasks :tasks="tasks"></list-tasks>
  <add-Task></add-Task>
	-->



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


export default {
	name: 'TableauDeBord',
	data(){
    return{
      tasks:[]
    }

  }/*,
  mounted(){
    eventBus.$on('task-added', task =>{
      this.tasks.push(task)
    })
  }*/

    
}
</script>

<style>

.row {
  display: flex;
}

.column {

  width: auto;
  text-align: left;
  padding: 10px;
  height: 300px;
}

.color-box {
  margin-left: 20px;
  width: 80px;
  height: 40px;
  margin-top: 5px;
 }
</style>