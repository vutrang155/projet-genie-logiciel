<template>

	<form class = "addContact-form" @submit.prevent = "addContact" >

<p> Infos Client <br> </p>


		<p> Ajouter Contact </p>

		<p>
			<label for="name" >Nom Contact:</label> 
			<input id="name" v-model="nom" placeholder="nom" :style="{width:'auto'}">
		</p>

		<p>
			<label for="prenom" >Prénom Contact:</label> 
			<input id="prenom" v-model="prenom" placeholder="prenom" :style="{width:'auto'}">
		</p>

		<p>
			<label for="fonction" >Fonction:</label> 
			<input id="fonction" v-model="fonction" placeholder="fonction" :style="{width:'auto'}">
		</p>

		<p>
			<label for="adresse" >Adresse:</label>
			<input id="adresse" v-model="adresse" placeholder="adresse" :style="{width:'auto'}">
		</p>

		<p>
			<input type="submit" value="Enregister" :style="{width:'auto'}">
		</p>

	</form>	

</template>


<script>
import axios from 'axios';
export default{
	name: 'addContact',
	props:['idclient'],
	
	data(){
		return{
				
				id: null,
				idc: 0,
				nom: null,
				prenom: null,
				fonction: null,
				adresse: null,
				
				errors: []
		}
	},
	created(){
		this.getContact()
	},
	methods:{
		// GET CONTACT BY CLIENT ID
		getContact(){
			axios.get('/contact/getbyClient/'+this.idclient._id)
			.then(res => {
			this.contacts = res.data
			for (let key in this.contacts){
				console.log(this.contacts[key])
				console.log(this.idclient)
			}
			})		
		},
		// POST CREATE CONTACT
		addContact(){ 
			if(this.nom && this.prenom){
				let contact = {
					id: this.idc,
					idc: this.idc+1,
					nom: this.nom,
					prenom: this.prenom,
					fonction: this.fonction,
					adresse: this.adresse,
					clientId: this.idclient._id
				}
				axios.post('/contact/create',contact)
				.then(res => {
				console.log(res)
				const contact = res.data
				this.nom = contact.nom
				this.prenom = contact.prenom
				this.fonction = contact.fonction
				this.adresse = contact.adresse

				})
				.catch(error => console.log(error))

				this.$emit("Contact-added",contact)
				this.id = null,
				this.idc+=1,
				this.nom = null,
				this.prenom = null,
				this.fonction = null,
				this.adresse = null

				}
				else{
				this.errors = []
				if(!this.nom) this.errors.push("Name required")
				if(!this.prenom) this.errors.push("Firstname required")

			}




		}

	}

}

</script>


<style>

</style>