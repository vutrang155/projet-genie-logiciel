<template>

	<form class = "addClient-form" @submit.prevent = "addClient" >


		<p> Création d'un client </p>

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
			<input type="submit" value="Enregistrer" :style="{width:'auto'}">
		</p>

	</form>

</template>

<script>
	
	export default {
		name: "addClient",
		data(){
			return{
				id: null,
				idc:0,
				nom: null,
				domaine: null,
				adresse: null,

				errors: []
			}
		},
		methods:{
			addClient(){

				if(this.nom){
					let client = {
						id:this.idc,
						idc:this.idc+1,
						nom: this.nom,
						domaine: this.domaine,
						adresse:this.adresse
						}
					this.$emit("Client-added", client)
					this.id = null,
					this.idc+=1,
					this.nom = null,
					this.domaine = null,
					this.adresse = null
				}
				else{
					this.errors= []
					if(!this.nom) this.errors.push("Nom requis")
					}
			}
		}
	}

</script>


<style>

</style>