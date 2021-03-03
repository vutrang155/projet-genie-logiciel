<template>

<div>

	<div v-if="showform">

		<form class = "modifContact-form" @submit.prevent = "modifContact" >

			<p> Modifier Contact </p>



			<p>
				<label for="name" >Nom Contact:</label>
				<input id="name" v-model="nom" placeholder=nom :style="{width:'auto'}">
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
				<input type="submit" value="Enregistrer" :style="{width:'auto'}">
			</p>

		</form>

	</div>

	<div v-if="tab">

		<table class ="table">
            <thead>
                <tr>
                    <th v-for="(col,index) in columns" :key="index">  {{col}}  </th> 
                </tr>
            </thead>
            <tbody>
                <br>
                <tr v-for="(row,index) in contacts" :key="index">
                    <td v-for="(col,index) in columns" :key="index"> {{row[col]}}  </td>  
                    
                    
                </tr> 
            </tbody>
        </table>


	</div>



</div>

</template>


<script>
import axios from 'axios';

export default{
	name: 'modifContact',
	props:['contactcible'],
	data(){

		return{

			nom : this.contactcible.nom,
			prenom : this.contactcible.prenom,
			fonction : this.contactcible.fonction,
			adresse : this.contactcible.adresse,
			tab: false,
			showform: true,
			contacts: [],

			columns:['nom','prenom','fonction','adresse'],
			
			errors: []
		}	
	},
	created(){
		this.getContact()
	},
	updated(){
		this.getContact()
	},

	methods:{
		getContact(){
			axios.get('/contact/getbyClient/'+this.contactcible.clientId)
			.then(res => {
			this.contacts = res.data
			for (let key in this.contacts){
				console.log(this.contacts[key])
			}
			console.log("contact cible:")
			console.log(this.contactcible)

			})		
		}, 
		modifContact(){
			if(this.nom && this.prenom){
				let contact = {
					contactId : this.contactcible._id,
					modif: {
					nom : this.nom,
					prenom : this.prenom,
					fonction: this.fonction,
					adresse: this.adresse,
					clientId: this.contactcible.clientId
					}
				}
				axios.put('/contact/update',contact)
				.then(res => {
				console.log(res)
				})
				.catch(error => console.log(error))

				this.$emit("Contact-updated",contact)
				this.nom = null,
				this.prenom = null,
				this.fonction = null,
				this.adresse = null,
				this.showform = false,
				this.tab = true

			}else{
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
