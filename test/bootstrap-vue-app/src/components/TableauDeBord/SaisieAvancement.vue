<template>
<div>
	<div class="row1">
		<div class ="column1">
			<div class="row2">
				<label for="Avancement">Avancement:</label>

				<input type="number" id="Avancement" name="Avancement"
       min="0" max="100">

			</div>
			<div class="row2">
				<label for="Charge">Charge Consomée:</label>

				<input type="number" id="Charge" name="Charge"
       min="0" >

			</div>
		</div>
		<div class="column2">
			<div class="Comment">
				<p>Commentaire
					<label for="Commentaire"></label>
					<textarea id="Commentaire" v-model="Commentaire" :style="{height:'150px', width:'440px'}"></textarea>
				</p>
			</div>
			<input type="submit" value="Submit" :style="{width:'auto'}">
		</div>
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
	padding: 10px;
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
   resize: none;

 }
 input {
  width: 60px;
  height: 25px;
  margin-bottom: 20px;
 }
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
}

</style>