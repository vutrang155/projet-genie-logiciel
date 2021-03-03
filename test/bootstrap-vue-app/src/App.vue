<template>
<div>
  <div class="nav-bar">
      <span class="tab"
          :class="{ activeTab: selectedTab ===tab}"
          v-for="(tab,index) in tabs"
          :key="index"
          @click="selectedTab=tab">
          {{tab}}</span>



          
        <p class="userName">Jean PAUL</p>
        

    </div>
  <div v-show="selectedTab ==='Tableau de bord'">

    <TableauDeBord/>
  </div>
  <div v-show="selectedTab ==='Projets'">

    <Projets/>
  </div >
  <div v-show="selectedTab ==='Clients'">
    <Client/>
  </div >
  <div v-show="selectedTab ==='Collaborateurs'">
    <p>Collabo</p>
    <Collaborateurs/>
  </div >

  <div v-show="selectedTab ==='Notifications'">
    <p>Notifications</p>
    <Notifications/>
  </div >
  
  
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TableauDeBord from './components/TableauDeBord.vue'
import Projets from './components/Projets.vue'
import Collaborateurs from './components/Collaborateurs.vue'
import Client from './components/Client.vue'
import Notifications from './components/Notifications.vue'

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api/'

//Pour afficher les dates sous la forme DD/MM/YYYY
import Vue from 'vue'
import moment from 'moment'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});



export default {
  name: 'App',
  components: {
    //HelloWorld,
    TableauDeBord,
    Projets,
    Collaborateurs,
    Client,
    Notifications
  },
  data(){
    return{
      tabs: ["Tableau de bord","Projets","Clients","Collaborateurs","Notifications"],
      selectedTab: "Tableau de bord"
    }

  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.center{
  text-align: center;
}
 .nav-bar {
   background: linear-gradient(-90deg, #84CF6A, #16C0B0);
   height: 60px;
   margin-bottom: 15px;
   text-align: left;
 }
  .tab {

   margin-left: 20px;
   margin-top: 10px;
   cursor: pointer;
   text-align: left;
 }
  .activeTab {
   margin-top: 10px;
   color: #A52A2A;
   text-decoration: underline;
   text-align: left;
 }
  .userName{
   text-align: right;
   margin-right: 20px;
 }
</style>
