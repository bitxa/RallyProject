<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>


<template>
    <v-card>
        <v-card-title class="d-flex justify-center align-center">
            <h2>Categoria</h2>
            <CaCategoryNewEach class="header_icon" />
        </v-card-title>
        <v-card-text>

            <form @submit.prevent="submitForm">
                <label for="name">Nombre:</label>
                <v-text-field variant="solo-filled" type="text" id="name" v-model="category.name"
                    placeholder="Ingrese el nombre"></v-text-field>


                <label for="description">Descripción:</label>
                <v-textarea variant="solo-filled" type="text" id="description" v-model="category.description"
                    placeholder="Ingrese la descripción"></v-textarea>
            </form>
        </v-card-text>


        <v-card-actions>
            <Actions @cancel="closeForm" @accept="showConfirmationDialog = true" />
        </v-card-actions>

        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="isNewCategory ? '¿Seguro que deseas crear un nueva categoria?' : '¿Seguro que deseas editar la categoria?'"
            @cancel="closeConfirmation" />

    </v-card>
</template>
  
<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import Actions from '@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue';
import ConfirmationDialog from '@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue';
import type { Circuit, Category } from '@/interfaces/Interfaces';
import { competitionStore } from '@/stores/competitionStore';
import { CaCategoryNewEach } from "@kalimahapps/vue-icons";

export default defineComponent({
    components: { Actions, ConfirmationDialog, CaCategoryNewEach },
    name: 'CategoryForm',
    props: {
        category: {
            type: Object as () => Category | null,
            required: false,
            default: null,
        },

        circuit_id: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const showConfirmationDialog = ref(false);
        const isNewCategory = computed(() => props.category === null);

        const defaultCategory = {
            name: '',
            description: '',
            circuit_id: props.circuit_id,
            winning_team: '',
            participantTeamsIds: [],
        }

        const category = ref(props.category || defaultCategory)

        const submitForm = async () => {

            const data = {
                name: category.value.name,
                description: category.value.description,
                circuit_id: category.value.circuit_id,
                winning_team: category.value.winning_team,
                participantTeamsIds: category.value.participantTeamsIds,
            }   

            if (isNewCategory.value) {
                await competitionStore().addCategory(data);
            } else {
                if (props.category) {
                    await competitionStore().putCategory(props.category?._id || '', data);
                }
            }

            closeForm();
        };

        const closeForm = () => {
            emit('close');
        };

        const closeConfirmation = () => {
            showConfirmationDialog.value = false;
        };

        return {
            defaultCategory,
            isNewCategory,
            showConfirmationDialog,
            category,
            submitForm,
            closeForm,
            closeConfirmation,
        };
    },
});

</script>
  
<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>
  