<template>
  <form class="review-form" @submit.prevent="onSubmitUserUpdate">

    <p v-if="errors.length">
      <b>Please correct the following error(s):</b> 
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
    <label> Yes
        <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
        No
        <input type="radio" value="No" v-model="recommend"/>
    </label>

    <p>
      <input type="submit" value="Submit">  
    </p>    
  </form>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>L'utilisateur {{ prenom }} {{ nom }} a été log avec succès (id : {{ userId }})</p>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
      todos: [],

      userId: "superman",
      password: "123456",
      nom: "man",
      prenom: "super",
      adresse: null,
      numeroDeTelephone: null,
      adresseMail: null,
      dateEntree: null,
      dateSortie: null,
      compteActive: null,
      role: null,


      users: []
      
    }
  }, 
  methods: {
    onSubmitUserCreate() {
      if(this.userId && this.password && this.nom && this.prenom) { //champs requis
        //création de l'utilisateur
        let userToCreate = {
          userId: this.userId,
          password: this.password,
          nom : this.nom,
          prenom : this.prenom,
          adresse : (this.adresse != null) ? this.adresse : null,
          numeroDeTelephone : (this.numeroDeTelephone != null) ? this.numeroDeTelephone : null,
          adresseMail : (this.adresseMail != null) ? this.adresseMail : null,
          dateEntree : (this.dateEntree != null) ? this.dateEntree : null,
          dateSortie : (this.dateSortie != null) ? this.dateSortie : null,
          compteActive : (this.compteActive != null) ? this.compteActive : null,
          role : (this.role != null) ? this.role : null
        }
        //envoie à l'API
        axios.post('/user/new', userToCreate)
        .then(res => {
          console.log(res)
          const user = res.data
          this.userId = user.userId
          this.nom = user.nom
          this.prenom = user.prenom
        })
        .catch(error => console.log(error))
      }
        //axios.post('http://jsonplaceholder.typicode.com/', productReview); 
      //let userId = "Test1";
      /*axios.get('http://localhost:8080/api/user/getAll')
        .then(res => console.log(res))
        .catch(error => console.log(error))*/
      if(this.name && this.review && this.rating && this.recommend) {
        /*let productReview = {
            name: this.name,
            review: this.review, 
            rating: this.rating,
            recommend: this.recommend
        }*/
        /*axios.get('http://jsonplaceholder.typicode.com/posts')
        .then(res => { 
          this.todos = res.data
        })
        .catch(error => console.log(error))*/
        //axios.post('http://jsonplaceholder.typicode.com/', productReview); 
      }
      
    },
    onSubmitUserLogin() {
      if(this.userId && this.password) { //champs requis
        let userToLog = {
          userId: this.userId,
          password: this.password
        }
        //envoie à l'API
        axios.post('/user/login', userToLog)
        .then(res => {
          console.log(res)
          const user = res.data
          this.userId = user.userId
          this.nom = user.nom
          this.prenom = user.prenom
        })
        .catch(error => console.log(error))
      }
    },
    onSubmitUserGetAll() {
      //envoie à l'API
      axios.get('/user/getAll')
      .then(res => {
        //console.log(res)
        this.users = res.data
        for(let key in this.users) {
          console.log(this.users[key])
        }
      })
      .catch(error => console.log(error))
    },
    onSubmitUserGetByUserId() {
      axios.get('/user/getByUserId/' + this.userId)
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
    },
    onSubmitUserGetByType() {
      let type = 2
      axios.get('/user/getByType/' + type)
      .then(res => {
        this.users = res.data
        for(let key in this.users) {
          console.log(this.users[key])
        }
      })
      .catch(error => console.log(error))
    },
    onSubmitUserDelete() {
      let userId = "Allezlefoot91"
      axios.delete('/user/delete/' + userId)
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
    },
    onSubmitUserUpdate() {
      //les deux manières de faire fonctionnent
      /*let modif = {
        adresse : "14 rue du test d'API"
      }
      let userToModify = {
          userId: this.userId,
          modif
      }*/
      let userToModify = {
          userId: this.userId,
          modif : {
            adresse : "158 Avenue du test d'API"
          }
      }
      //envoie à l'API
      axios.put('user/update', userToModify)
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
    }
    /*,
    created() { //called when the page is loaded (lifecycle hook of vuejs)
      axios.get('http://jsonplaceholder.typicode.com/posts')
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
