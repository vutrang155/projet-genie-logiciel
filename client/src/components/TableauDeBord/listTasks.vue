<template>
  <div> test list</div>
  
	<ul>
    <li v-for="task in tasks" :key="task.ID" >
      <div v-bind:class="task.state" >
        <b-container>
          <b-row>
            <b-col> Projet: {{task.project}} </b-col>
            <b-col> Responsable: {{task.responsable}} </b-col>
            <b-col> Avancement: {{task.avancement}} </b-col>
          </b-row>
        </b-container>

      </div>
    </li>
  </ul> 
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

</style>