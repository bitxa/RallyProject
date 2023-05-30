<style scoped src="@/assets/styles/admin_panel/floating-forms/new.css"></style>

<template>
    <div class="popup">
        <h2>Crear competencia</h2>
        <!-- Form fields and inputs here -->
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" required>
            </div>

            <div class="field">
                <label for="province">Provincia:</label>
                <input type="text" id="province" v-model="province" required>
            </div>

            <div class="field">
                <label for="description">Descripción:</label>
                <input type="text" id="description" v-model="description" required>
            </div>
            <div class="field">
                <label for="dates">Fecha Inicio y Fin:</label>
                <VueDatePicker class="date-picker" v-model="date" range />
            </div>


        </form>

        <Actions @submit="submitForm" @cancel="cancelForm" />
    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import ActionsComponent from './ActionsComponent.vue';

import Actions from "@/components/competences/floating-forms/ActionsComponent.vue";

import { ref, onMounted } from 'vue';
import { apiService } from '@/services/apiService';


const date = ref();

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date();
    date.value = [startDate, endDate];
})

export default {

    components: { VueDatePicker, Actions },
    name: 'NewCompetence',
    data() {
        return {
            name: '',
            province: '',
            description: '',
            date: date,
        };
    },
    methods: {
        async submitForm() {

            interface CreateCompetitionDto {
                name: string;
                description: string;
                start_date: any;
                end_date: any;
                province: string;
                circuits?: [];
            }

            const data: CreateCompetitionDto = {
                name: this.name,
                description: this.description,
                start_date: new Date(this.date[0]).toISOString(),
                end_date: new Date(this.date[1]).toISOString(),
                province: this.province,
            }

            console.log('Form submitted:');
            console.log(data);

            await apiService.postData(data, 'competitions')

            this.$emit('close');
        },
        cancelForm() {
            this.$emit('close');
        }
    }
}
</script>
