<template>

	<form class = "modifClient-form" @submit.prevent = "modifClient" >


		<p> Modification client </p>

		<p>
			<label for="name" >Nom Client:</label> 
			<input id="nom" v-model="name" placeholder="nom" :style="{width:'auto'}">
		</p>


		<p>
			<label for="domaine" >Domaine d'Activité:</label>
			<input id="domaine" v-model="domaine" placeholder="domaine" :style="{width:'auto'}">
		</p>

		<p>

			<label for="adresse" >Adresse:</label>
			<textarea id="adresse" v-model="adresse"></textarea>
		</p>


		<p>
			<input type="submit" value="Enregister" :style="{width:'auto'}">
		</p>

	</form>

</template>



<script>
	
	export default {
		name: "modifClient",
		data(){
			return{
				id: null,

				nom: null,
				domaine: null,
				adresse: null,

				errors: []
			}
		},
		methods:{
			modifClient(){

				if(this.nom){
					let client = {
						id: null,
						nom: this.nom,
						domaine: this.domaine,
						adresse: this.adresse
					}

					this.$emit("Client-updated",client)
					this.id = null,
					this.nom = null,
					this.domaine = null,
					this.adresse = null
				}
				else{
					this.errors = []
					if(!this.nom) this.errors.push("Nom requis")

				}



			}

		}

	}

</script>


<style>

</style>