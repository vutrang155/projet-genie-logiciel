<template>

	<form class = "addContact-form" @submit.prevent = "addContact" >


		<p> Ajouter Contact </p>

		<p>
			<label for="name" >Nom Client:</label> 
			<input id="nom" v-model="name" placeholder="nom" :style="{width:'auto'}">
		</p>

		<p>
			<label for="prenom" >Prénom Client:</label> 
			<input id="prenom" v-model="prenom" placeholder="prenom" :style="{width:'auto'}">
		</p>

		<p>
			<label for="fonction" >Fonction:</label> 
			<input id="fonction" v-model="fonction" placeholder="fonction" :style="{width:'auto'}">
		</p>

		<p>
			<label for="adresse" >Adresse:</label>
			<textarea id="adresse" v-model="adresse"></textarea>
		</p>

		<p>
			<label for="clientId">Client associé:</label>
			<select v-model="clientId">
				<option>Rold</option>
			</select>

		</p>

		<p>
			<input type="submit" value="Enregister" :style="{width:'auto'}">
		</p>

	</form>	

</template>


<script>

export default{
	
	data(){
		return{
				id: null,
				idc: 0,
				nom: null,
				prenom: null,
				fonction: null,
				adresse: null,
				clientId:null,

				errors: []
		}
	},
	methods:{
		addContact(){
			if(this.nom && this.prenom){
				let contact = {
					id: this.idc,
					idc: this.idc+1,
					nom: this.nom,
					prenom: this.prenom,
					fonction: this.fonction,
					adresse: this.adresse,
					clientId: this.clientId
				}
				this.$emit("Contact-added",contact)
				this.id = null
				this.idc+=1
				this.nom = null
				this.prenom = null,
				this.fonction = null,
				this.adresse = null,
				this.clientId = null
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