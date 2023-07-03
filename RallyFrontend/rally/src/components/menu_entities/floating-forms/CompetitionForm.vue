<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">
        <span class="header">
            <h2>{{ isNewCompetition ? 'Crear competencia' : 'Editar competencia' }}</h2>
            <UnPathfinderUnite class="header_icon" />
        </span>

        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="competition.name" placeholder="Ingrese el nombre">
            </div>

            <div class="field">
                <label for="province">Provincia:</label>
                <select v-model="competition.province" placeholder="Escoga la provincia">
                    <option v-for="province in provinces" :key="province.name" :value="province.name">{{ province.name }}
                    </option>
                </select>
            </div>

            <div class="field">
                <label for="description">Descripción:</label>
                <input type="text" id="description" v-model="competition.description" placeholder="Ingrese la descripción">
            </div>

            <div class="field">
                <label for="dates">Fecha Inicio y Fin:</label>
                <VueDatePicker class="date-picker" v-model="date" range placeholder="Escoga las fechas" />
            </div>
        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="isNewCompetition ? '¿Seguro que deseas agregar una nueva competición?' : '¿Seguro que deseas editar la competición?'"
            @cancel="closeConfirmation" />
    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { UnPathfinderUnite } from "@kalimahapps/vue-icons";
import { competitionStore } from '@/stores/competitionStore';

import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";

import { ref, onMounted, computed, defineEmits } from 'vue';

import { useProvincesStore } from '@/stores/provinces';

export default {
    name: 'CompetitionForm',
    components: { VueDatePicker, Actions, ConfirmationDialog, UnPathfinderUnite },

    props: {
        competition: {
            type: Object,
            default: null,
        },
    },

    emits: ['close'],

    setup(props, { emit }) {
        defineEmits(['close']);
        const showConfirmationDialog = ref(false);
        const isNewCompetition = computed(() => props.competition === null);
        const date = ref();

        const provinces = useProvincesStore().getProvinces;

        onMounted(() => {
            const startDate = new Date();
            const endDate = new Date();
            date.value = [startDate, endDate];
        });

        const submitForm = async () => {
            const data = {
                name: props.competition.name,
                description: props.competition.description,
                start_date: new Date(date.value[0]).toISOString(),
                end_date: new Date(date.value[1]).toISOString(),
                province: props.competition.province,
            };

            if (isNewCompetition.value) {
                await competitionStore().addCompetition(data);
            } else {
                // Edit existing competition
                await competitionStore().patchCompetition(props.competition.id, data);
            }

            closeForm();
        };

        const cancelForm = () => {
            closeForm();
        };

        const showConfirmation = () => {
            showConfirmationDialog.value = true;
        };

        const closeConfirmation = () => {
            showConfirmationDialog.value = false;
        };

        const closeForm = () => {
            emit('close');
        };

        return {
            isNewCompetition,
            competition: props.competition || {},
            date,
            provinces,
            submitForm,
            cancelForm,
            showConfirmationDialog: ref(false),
            showConfirmation,
            closeConfirmation,
        };
    },
};
</script>
