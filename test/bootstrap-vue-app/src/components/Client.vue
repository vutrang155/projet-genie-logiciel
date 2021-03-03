<template>
  
<div>

    <p> Clients </p>

    
     <div v-if="creation"> <addClient/>  </div>  

    <div v-if="modif"> <modifClient v-on:modify-done="modifyDone" v-bind:idd=this.clientcible> </modifClient> </div>

    <div v-if="accescontact"> <Contact v-on:modifyc-done="modifyContactDone" v-bind:idclient=this.clientcible> </Contact> </div>

    <div v-else> <br>   


	<div v-if="tab">
    
        <table class ="table">
            <thead>
                <tr>
                    <th v-for="(col,index) in columns" :key="index">  {{col}}  </th> 
                </tr>
            </thead>
            <tbody>
                <br>
                <tr v-for="(row,index) in clients" :key="index">
                    <td v-for="(col,index) in columns" :key="index" v-on:click="setaccess(row)"> {{row[col]}}  </td>  
                    <div> 
                    <br> <button v-on:click="select(row)">Modifier Client</button> </div> <br>
                    <div> 
                    <br> <button v-on:click="suppr(row)">Supprimer Client</button> </div> <br>  


                </tr> 
            </tbody>
        </table>
    
    </div>    

  
    </div>


</div>

</template>

<script>
import axios from 'axios';

import addClient from './Client/addClient.vue'
import modifClient from './Client/modifClient.vue'
import Contact from './Contact.vue'



export default {
  name:'Client',
	components:{
		addClient,
		modifClient,
		Contact
	},

	data(){
		return {
			
			
			modif: false,
			showButton: true,
			clients: [],
			columns: ['nom','domaine','adresse'],
			clientcible :null,
			contactcible: null,
			tab: true,
			accescontact: false,
			creation: true

		}
	},

	created(){
		this.getClients()
		
	},

	updated(){

		this.getClients()
		
		
	},
	methods: {
		setaccess(row){
			this.clientcible = row,
			console.log(this.clientcible),
			this.accescontact = true,
			//this.tab = false,
			
			this.showButton = false,
			this.modif = false,
			this.creation = false	
		},

		select(row){
			this.clientcible = row,
			console.log(this.clientcible),
			this.modif = true,
			this.showButton = false	
		},

		suppr(row){
			axios.delete('/client/delete/'+row._id)
			.then(res => {
			console.log(res)
			this.clients = res.data
			})
			.catch(error => console.log(error))

			

		},

		getClients(){
			axios.get('/client/getAll')
			.then(res => {
			this.clients = res.data
			
			for (let key in this.clients){
				console.log(this.clients[key])
			}
			})
			
		},
		
		clickModif(){
			this.modif = true
		},

		modifyDone(statusResOk){
			if(statusResOk){
				this.modif = false} 
			},

		modifyContactDone(statusResOk){
			if(statusResOk){
				this.modif = false,
				this.showButton = true,
				this.tab = true,
				this.accescontact = false,
				this.creation = true
			}
		}
	}
}
</script>

<style>
	.table {
		width : 800px;
		padding: 20px;
		margin: 40px;
		border: 1px solid #d8d8d8;
		text-align: center;
	}

</style>