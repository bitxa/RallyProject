<template>
         <div class="action_buttons">
          <v-btn rounded class="edit-button" fab color="primary" @click="">
            <FaPencil />
          </v-btn>

          <v-btn rounded class="delete-button" @click="deleteItem">
            <AkCircleXFill />
          </v-btn>
        </div>
</template>

<style>
.action_buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: large;
  width: auto;
  margin: 1vh;
  margin-right: 0;
}
.delete-button {
  color: aliceblue;
  margin: 0;
  padding: 0%;
  padding-bottom: 5vh;
  font-size: 5vh;
  background-color: transparent;
  border: none;
  box-shadow: none;
}

</style>

<script lang="ts">
import { FaPencil, AkCircleXFill } from '@kalimahapps/vue-icons';

export default {
    name: "ActionsForEntity",

    components:{
        FaPencil,
        AkCircleXFill,
    },

    methods:{
        deleteItem(){
            this.$emit('deleteItem');
        }
    }
}
</script>