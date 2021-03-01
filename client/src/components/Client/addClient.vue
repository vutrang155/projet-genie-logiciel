<template>

	<form class = "addClient-form" @submit.prevent = "addClient" >

		<p v-if="errors.length">
			<b> Please correct the following error(s):</b>
			<ul>
				<li v-for="(error,index) in errors" :key="index">{{error}}</li>
			</ul>
		</p>

		<p> Création d'un client </p> 

		<p>
			<label for="name" >Nom Client:</label>
			<input id="name" v-model="nom" placeholder="nom" :style="{width:'auto'}">
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

		<Client/>
</template>

<script>
import axios from 'axios';
import Client from './../Client.vue';	

	export default {
		name: 'addClient',
		components:{
			Client
		},
		data(){
			return{
				id: null,
				idc:0,
				nom: null,
				domaine: null,
				adresse: null,

				errors: [],
				clients: []
			}
		},

		created(){
			this.getClients()
		},
		methods:{

			// GET Client getAll
			getClients(){
				axios.get('/client/getAll')
				.then(res => {
				this.clients = res.data
				for (let key in this.clients){
					console.log(this.clients[key])
				}

				})
			},
			// POST Client create
			addClient(){
	
				if(this.nom){

					let client = {
						id:this.idc,
						idc:this.idc+1,
						nom: this.nom,
						domaine: this.domaine,
						adresse:this.adresse
						}

					this.errors = []
					for (let key in this.clients){
						if (this.nom == this.clients[key].nom){
							this.errors.push("Client déjà existant")
							break;
						}
					}

					if (this.errors.length == 0){
						axios.post('/client/create',client)
						.then(res => {
						console.log(res)
						const client = res.data
						this.nom = client.nom
						this.domaine = client.domaine
						this.adresse = client.adresse
						})
						.catch(error => console.log(error))

						this.$emit("Client-added", client)
						this.id = null,
						this.idc+=1,
						this.nom = null,
						this.domaine = null,
						this.adresse = null
					}				
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