<template>
<div>
  <div> test list</div>
  
	<ul>
    <li v-for="(task,index) in tasks" :key="index" >
      <div v-bind:class="task.state" >
        <div class="rowlT">

          <div class="collT"> Projet: {{task.project}} </div>
          <div class="collT"> Responsable: {{task.responsable}} </div>
          <div class="collT"> Avancement: {{task.avancement}} </div>

        </div>

      </div>
    </li>
  </ul> 
  </div>
</template>

<script>
export default {
  name: 'listTasks',
  props:{
    tasks:[]
  }
	
}
</script>

<style>
#listTasks{
  text-align: left;
}
 .ToDo{
   background-color: #00aaff;
   width: 800px;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
 .OnGoing{
   background-color: #eeff00;
   width: 80%;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
 .Done{
   background-color: #00ff04;
   width: 80%;
   padding: 20px;
   margin: 40px;
   border: 1px solid #d8d8d8;
 }
.rowlT{
  display: flex;
}
.collT{
  width:auto;
  margin-right: 30px;
}

</style>