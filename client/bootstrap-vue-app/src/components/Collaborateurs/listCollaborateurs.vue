<template>
    <div>
        <div v-for="(collaborateur, index) in collaborateurs" :key="index">
            <div class="row1Collabo" >
                <div class="col1Projet">


                    {{collaborateur.prenom}}
                    {{collaborateur.nom}}


                </div>
                <div class="row2Projet">
                    <p class="col2Projet">
                        Username : {{ collaborateur.nomUtilisateur }}
                    </p>
                    <p class="col2Projet">
                        Adresse e-mail : {{ collaborateur.adresseMail }}
                    </p>
                    <p class="col2Projet">
                        Telephone : {{ collaborateur.numeroDeTelephone }}
                    </p>
                    <p class="col2Projet">
                        Compte activé : {{ collaborateur.compteActive }}
                    </p>
                    <p class="col2Projet">
                        Adresse : {{collaborateur.adresse}}
                    </p>
                    <p class="col2Projet">
                        Date d'entrée : {{ collaborateur.dateEntree | formatDate }}
                    </p>
                    <p>
                        <button v-on:click="modifierCollaborateur(collaborateur._id)">Modifier</button>
                    </p>
                    <!--
                    <p>
                        <input type="submit" value="Modifier" :style="{width:'auto'}">
                    </p>
                    -->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
//import { EventBus } from '../../event-bus.js';
//import App from '../../App.vue'


export default {

    name:'listCollaborateurs',
    data() {
        return {
        statusResOk: false,
        collaborateurs:[]
        }
    },
    methods:{ 
        async getAllCollaborateurs() {
            //envoie à l'API
            await axios.get('/user/getAll')
                .then(res => {
                    //console.log(res)
                    this.collaborateurs = res.data
                    for(let key in this.collaborateurs) {
                        console.log(this.collaborateurs[key])
                    }
                })
                .catch(error => console.log(error))
        },
        modifierCollaborateur(idCollaborateur) {
            //App.Vue.prototype.$eventHub.$emit('modify-clicked', idCollaborateur)
            this.$emit('modify-clicked', idCollaborateur)
            /*if (event) {
                alert(event.target.tagName)
            }*/
        }
    },
    created() {
        this.getAllCollaborateurs();
    }
}
</script>

<style>
.row1Collabo {
	border: 1px solid #000000;
	margin: 10px;
	padding: 10px;
	width: 95%;
	height:120px;
}
.row2Projet {
  display: flex;
	padding: 10px;
	width: 100%;
	height: auto;
}
.col1Projet{
	width:100%;
	height:auto;
	font-size:x-large;
	margin-left: 10px;
}
.col2Projet{
	width:31%;
    margin-right: 30px;
}
</style>