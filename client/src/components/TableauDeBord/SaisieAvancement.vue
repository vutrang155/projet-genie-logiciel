<template>
	<div class="row1">
		<div class ="column1">
			<div class="row2">
				<p>Avancement</p>
			</div>
			<div class="row2">
				<p>Charge Consomée</p>

			</div>
		</div>
		<div class="column2">
			<div class="Comment">
				<p>Commentaire
					<label for="Commentaire"></label>
					<textarea id="Commentaire" v-model="Commentaire"></textarea>
				</p>
			</div>
			<input type="submit" value="Submit">
		</div>
	</div>
</template>

<script>
export default {
	name:'SaisieAvancement',
	data(){
		return{
			Commentaire:null
		}
		
	},
  methods:{
    onSubmit(){
			if(this.Commentaire){
				/*let Avancement = {
					Commentaire:this.Commentaire
				}*/
			}
			//this.$emit("Avancement", SaisieAvancement)
			this.Commentaire=null
		}
	}
}
</script>

<style>

.row1 {
  display: flex;
	border: 1px solid #000000;
	margin: 10px;
	padding: 5px;
	width: 800px;
	background-color: #edea47;
	height:260px
}
.row2 {
  display: flex;
	border: 1px solid #000000;
	margin: 10px;
	padding: 5px;
	width: 200px;
}

.column1 {

  width: 250px;
  text-align: left;
  padding: 10px;
  height: auto;
}
.column2 {

  width: 450px;
  text-align: left;
  padding: 10px;
  height: 200px;
	border: 1px solid #000000;
}
 textarea {
   width: 100%;
   height: 160px;
   display: block;

 }
 input {
  width: 60px;
  height: 25px;
  margin-bottom: 20px;
 }
</style>