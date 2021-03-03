<template>
    <p> Contact </p>
    <addContact/>
    <modifContact/>
</template>

<script>

import addContact from './Contact/addContact.vue'
import modifContact from './Contact/modifContact.vue'


export default {
  name:'Contact',
	components:{
		addContact,
		modifContact
	}	
}
</script>

<style>

</style>