<template>
  <div id="app2">
    <div v-show="bool">

     
        

     


    <div class="container">
      <router-view />
    </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            bool:true
        }
    }
  
};
</script>