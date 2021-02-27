<template>
    <p> Clients </p>
    <addClient/>
    <modifClient/>
</template>

<script>

import addClient from './Client/addClient.vue'
import modifClient from './Client/modifClient.vue'


export default {
  name:'Client',
	components:{
		addClient,
		modifClient
	}	
}
</script>

<style>

</style>