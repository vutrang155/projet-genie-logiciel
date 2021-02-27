Vue.config.devtools = true

var eventBus = new Vue()

Vue.component("product-tabs",{

  template:`
  <div>
    <div class="nav-bar">
      <span class="tab"
          :class="{ activeTab: selectedTab ===tab}"
          v-for="(tab,index) in tabs"
          :key="index"
          @click="selectedTab=tab">
          {{tab}}</span>



          <div>

          </div>
        <p class="userName">Jean PAUL</p>

    </div>

    <div v-show="selectedTab ==='Tableau de bord'">

      <Tableau-de-bord></Tableau-de-bord>

    </div>




  </div>
    `,
    data(){
      return {
        tabs: ["Tableau de bord","Projets","Clients","Collaborateurs","Notifications"],
        selectedTab: "Tableau de bord"

      }
    }

})
//##################################################################
Vue.component("Tableau-de-bord",{
  template:`
  <div>

  <list-tasks :tasks="tasks"></list-tasks>
  <add-Task></add-Task>



  <div class="row">
    <div class="color-box" cols="12" :style="{ backgroundColor:'#00aaff'}"></div>
    <div class="column" >

      <p>:To Do</p>
    </div>
    <div class="color-box" cols="12" :style="{ backgroundColor:'#eeff00'}"></div>
    <div class="column" >

      <p>:On Going</p>
    </div>
    <div class="color-box" cols="12" :style="{ backgroundColor:'#00ff04'}"></div>
    <div class="column" >

      <p>:Done</p>
    </div>

  </div>

  </div>`,
  data(){
    return{
      tasks:[],
      legends:[
        {
          color: "#00aaff",
          text: "To Do"
        },
        {
          color: "#eeff00",
          text: "On Going"
        },
        {
          color: "#00ff04",
          text: "Done"
        }
      ]
    }

  },
  mounted(){
    eventBus.$on('task-added', task =>{
      this.tasks.push(task)
    })
  }
})

//##################################################################
Vue.component("list-tasks",{
  props: {
    tasks:{
      type: Array,
      required:true
    }
  },

  template: `
    <div>
      <ul>
        <li v-for="task in tasks" :key="task.ID">
          <div v-bind:class="task.state" >
            <b-container>
              <b-row>
                <b-col> Projet: {{ task.project }} </b-col>
                <b-col> Responsable: {{task.responsable}} </b-col>
                <b-col> Avancement: {{task.avancement}} </b-col>
              </b-row>
            </b-container>

          </div>
        </li>
      </ul>


    </div>
  `,
  data(){
    return {
      test:0

    }
  }

})

//##################################################################

/*
Vue.component("task",{
  template:`
    <div >
      <p> ID </p>
    </div>


  `,
  data(){
    return {
      ID: 0,
      Etat: "Encours"
    }
  },
  methods:{
    addTask(){
      let task = {
        ID: this.ID
      }

      eventBus.$emit("task-added", task)

    }
  }

})*/
//##################################################################
Vue.component("add-Task",{
  template: `
  <form class="review-form" @submit.prevent="addTask">

  <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <p>
      Create new task
    </p>

    <p>
      <label for="project">Project:</label>

    <select v-model="project">
        <option>Project A</option>
        <option>Project B</option>
        <option>Project C</option>
    </select>
    </p>

    <p>
      <label for="responsable">Responsable:</label>
      <select v-model="responsable">
        <option>Jean-Claude</option>
        <option>Jean-Marc</option>
        <option>Jean-Paul</option>
        <option>Jean-François</option>
        <option>Jean-Jean</option>
      </select>
    </p>

    <p>
      <label for="state">Etat:</label>
      <select v-model="state">
        <option>ToDo</option>
        <option>OnGoing</option>
        <option>Done</option>
      </select>
    </p>



    <p>
      <input type="submit" value="Submit">
    </p>

  </form>

  `,
  data() {
    return {
      id: null,
      idc:0,
      project:null,
      responsable:null,
      state:null,
      startingDate:null,
      avancement:0,

      errors: []
    }
  },
  methods:{
    addTask(){
      if(this.project && this.responsable && this.state /*&& startingDate*/ ){
        let task = {
          id:this.idc,
          idc:this.idc+1,
          project: this.project,
          responsable: this.responsable,
          state:this.state,
          avancement:this.avancement
          //startingDate:this.startingDate
        }
        eventBus.$emit("task-added", task)
        this.id=null,
        this.idc+=1,
        this.project=null,
        this.responsable=null,
        this.state=null,
        this.startingDate=null

      }
      else{
        if(!this.project) this.errors.push("Project required")
        if(!this.responsable) this.errors.push("Responsable required")
        if(!this.state) this.errors.push("State required")
        //if(!this.startingDate) this.errors.push("Starting Date required")
      }

    }
  }
})


//##################################################################


Vue.component("Calendar",{
  template:`
  <div>
    <b-calendar v-model="value" :min="min" :max="max" locale="en"></b-calendar>
  </div>

  `,
  data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 2)
      minDate.setDate(15)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)

      return {
        value: '',
        min: minDate,
        max: maxDate
      }
    }

})








var app = new Vue({
  el: '#app',
  //vuetify: new Vuetify(),
  data:{
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id){
      this.cart.push(id)
    }
  }
})
