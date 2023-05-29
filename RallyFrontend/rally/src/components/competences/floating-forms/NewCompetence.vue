<style scoped src="@/assets/styles/admin_panel/floating-forms/new.css"></style>

<template>
    <div class="popup">
        <h2>Competencia nueva</h2>
        <!-- Form fields and inputs here -->
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" required>
            </div>

            <div class="field">
                <label for="province">Provincia:</label>
                <input type="text" id="provincia" v-model="province" required>
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

        <div class="actions">
            <button type="submit" id="create" @click="submitForm">Crear</button>
            <button type="button" id="cancel" @click="cancelForm">Cancelar</button>
        </div>
    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, onMounted } from 'vue';
import { apiService } from '@/services/apiService';
import { formatDate } from '@/utils/DateFormatter';

const date = ref();

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date();
    date.value = [startDate, endDate];
})

export default {

    components: { VueDatePicker },
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
                start_date: Date;
                end_date: Date;
                province: string;
                circuits?: [];
            }

            const data: CreateCompetitionDto = {
                name: this.name,
                description: this.description,
                start_date: new Date(this.date[0]),
                end_date: new Date(this.date[1]),
                province: this.province,
            }

            console.log('Form submitted:');
            console.log(data);
            const result = await apiService.postData(data, 'competitions')
            console.log(result);
            this.$emit('close');
        },
        cancelForm() {
            this.$emit('close');
        }
    }
}
</script>
