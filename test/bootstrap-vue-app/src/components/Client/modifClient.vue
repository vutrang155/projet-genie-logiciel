<template>


<div>

	<div v-if="form">

		<form class = "modifClient-form" @submit.prevent = "modifClient" >

			<p v-if="errors.length">
				<b> Please correct the following error(s):</b>
				<ul>
					<li v-for="(error,index) in errors" :key="index">{{error}}</li>
				</ul>
			</p>

			<p class="titre"> Modification client </p>

			

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
				<input id="adresse" v-model="adresse" placeholder="adresse" :style="{width:'auto'}">
			</p>


			<p>
				<input type="submit" value="Enregistrer" :style="{width:'auto'}">
			</p>

		</form>

	</div>

	
    

</div>

</template>



<script>

import axios from 'axios';

	export default {
		name: 'modifClient',
		props:['idd'],
		data(){
			return{

				id: "603b711fdc9e9367e08e3b97",

				nom: this.idd.nom,
				domaine: this.idd.domaine,
				adresse: this.idd.adresse,
				cpt: 0,

				errors: [],
				clients: [],
				columns: ['nom','domaine','adresse'],
				
				form: true
			}
		},
		created(){
			this.getClients()
		},
		
		methods:{
			getClients(){
				axios.get('client/getAll')
				.then(res => {
				this.clients = res.data
				for (let key in this.clients){
					console.log(this.clients[key])
				}
				})

			},

			modifClient(){
				if (this.nom){
					let client = {
						clientId: this.idd._id,
						modif:{
						nom: this.nom,
						domaine: this.domaine,
						adresse: this.adresse
						}
					}

					this.errors = []
					for (let key in this.clients){
						if(this.idd._id == this.clients[key]._id){
							console.log(this.id)
							console.log(this.clients[key]._id)
							break;
						}
						this.cpt = this.cpt + 1
					}
					console.log(this.cpt)
					console.log(this.clients.length)
					if (this.cpt == this.clients.length){
						this.errors.push("Client introuvable")
						}
						else if(this.errors.length ==0){					
						axios.put('/client/update',client)
						.then(res => {
						console.log(res)
						console.log(this.idd)
						})
						.catch (error => console.log(error))

						this.id = null,
						this.nom = null,
						this.domaine = null,
						this.adresse = null
						
						
					}

				}else{
					this.errors = []
					if(!this.nom)this.errors.push("Nom requis")
				}

				this.$emit('modify-done', true)

			}

		}

	}

</script>


<style>
.titre {
	text-decoration: underline;
	font-size: 20px;
	font-weight: bold;
}
</style>