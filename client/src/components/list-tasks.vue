<template>
	<ul>
    <li v-for="task in tasks" >
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