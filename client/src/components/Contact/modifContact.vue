<template>

	<form class = "modifContact-form" @submit.prevent = "modifContact" >

		<p> Modifier Contact </p>

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
			<input type="submit" value="Enregistrer" :style="{width:'auto'}">
		</p>

	</form>


</template>


<script>

export default{

	data(){

		return{
			id : null,
			nom : null,
			prenom : null,
			fonction : null,
			adresse : null,
			clientId: null,

			errors: []
		}	
	},

	methods:{
		modifContact(){
			if(this.nom && this.prenom){
				let contact = {
					id : null,
					nom : this.nom,
					prenom : this.prenom,
					domaine: this.domaine,
					adresse: this.adresse
				}
				this.$emit("Contact-updated",contact)
				this.id = null,
				this.nom = null,
				this.domaine = null,
				this.adresse = null

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
