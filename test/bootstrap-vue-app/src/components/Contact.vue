<template>

<div>

    <p> Contacts </p>

	<p> Infos Client: <br> <br> Nom: {{this.idclient.nom}} <br> Domaine: {{this.idclient.domaine}} <br> Adresse: {{this.idclient.adresse}}    </p>


	<p v-if="errors.length">
				<b> Please correct the following error(s):</b>
				<ul>
					<li v-for="(error,index) in errors" :key="index">{{error}}</li>
				</ul>
	</p>

    <div v-if="tab">
    
        <table class ="table">
            <thead>
                <tr>
                    <th v-for="(col,index) in columns" :key="index"> {{col}}  </th>
                </tr>
            </thead>
            <tbody>
                <br>
                <tr v-for="(row,index) in contacts" :key="index">
                    <td v-for="(col,index) in columns" :key="index" v-on:click="select(row)"> {{row[col]}}  </td>  
                </tr> <br>
            </tbody>
        </table>
    
    </div>

    <div v-if="creation"> <addContact v-bind:idclient=this.idclient> </addContact>  </div>

    <div v-if="showButton">
        <button v-on:click="clickModif">Modifier </button> <br> <br>
        <button v-on:click="clickCreate">Créer</button>
    </div>

    <div v-if="modif">  <modifContact v-bind:contactcible=this.contactmodif></modifContact>  </div> 


</div>

</template>

<script>
import axios from 'axios';

import addContact from './Contact/addContact.vue'
import modifContact from './Contact/modifContact.vue'


export default {
  name:'Contact',
  props:['idclient'],
	components:{
		addContact,
		modifContact
	},

	data(){
		return{

			clientId:"603cb2253ae2db247c1b56ae",
			contacts: [],
			contactmodif : null,
			showButton: true,
			modif: false,
			creation: false,
			tab: true,
			columns:['nom','prenom','fonction','adresse'],
			errors: []

		}
	},
	created(){
		this.getContact()
	},
	methods: {

		select(row){
			this.contactmodif = row
			console.log(this.contactmodif)
		},
		getContact(){
			axios.get('/contact/getbyClient/'+this.idclient._id)  
			.then(res => {
			this.contacts = res.data
			for (let key in this.contacts){
				console.log(this.contacts[key])
			}
			console.log("THE ID:")
			console.log(this.idclient)
			})
		},
		clickCreate(){
			this.modif = false,
			this.showButton = false,
			this.creation = true,
			this.tab = false,
			this.errors = []
		},
		clickModif(){
			if(this.contactmodif != null){
				this.modif = true,
				this.creation = false,
				this.showButton = false,
				this.tab = false,
				this.errors = []
			}
			else {
				console.log("Contact non selectionné")
				this.errors = []
				this.errors.push("Contact non selectionné")
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