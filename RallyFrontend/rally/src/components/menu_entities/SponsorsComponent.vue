<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input type="text" v-model="selectedCompetitionName" list="competitionsForCategory-list" class="breadcrumbInput"
                @input="handleSelectedCompetition" @change="handleSelectedCompetition">
            <datalist id="competitionsForCategory-list">
                <option v-for="competition in competitions" :key="competition._id" :value="competition.name">{{
                    competition.name }}</option>
            </datalist>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Circuito:</label>
            <input type="text" v-model="selectedCircuitName" list="circuitsForCategory-list" class="breadcrumbInput"
                @input="handleSelectedCircuit" @change="handleSelectedCircuit">
            <datalist id="circuitsForCategory-list">
                <option v-for="circuit in circuits" :key="circuit._id" :value="circuit.name">{{ circuit.name }}</option>
            </datalist>
        </div>
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Sponsors" :data="sponsors" :placeholder="'Busque algún sponsor:'"
        @input_name="handleInput" />

    <NewEntityButton :button_title="'Añadir Sponsor'" @showForm="showForm"></NewEntityButton>


    <div class="container">
        <div v-if="isFormVisible" class="overlay">
            <NewSponsor @close="hideForm" :circuit="selectedCircuit" />
        </div>

        <div class="box" v-for="(sponsor, index) in filteredSponsors" :key="index">

            <span>
                <h2>{{ sponsor.name }}</h2>
                <ActionsForEntity @deleteItem="deleteSponsor(index)" />
            </span>

            <div class="info-element">
                <h2>Descripción</h2>
                <p>{{ sponsor.description }}</p>
            </div>

            <div class="info-element">
                <h2>Logo</h2>
                <ImagePicker @imageSelected="handleSelectedImage"></ImagePicker>
            </div>

            <div class="info-element">
                <h2>Contacto:</h2>
                <p>{{ sponsor.contact }}</p>
            </div>

            <div class="info-element">
                <h2>Sitio Web (URL):</h2>
                <a href="{{ sponsor.web }}">
                    {{ sponsor.web }}
                </a>
            </div>

        </div>


    </div>
</template>

<script lang="ts">

import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';

import NewSponsor from "@/components/menu_entities/floating-forms/NewSponsor.vue";
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import { competitionStore } from '@/stores/competitionStore';

import ImagePicker from "@/components/menu_entities/floating-forms/fragments/ImagePicker.vue";
import type { Circuit, Competition, Sponsor } from './interfaces/Interfaces';
import { onMounted, ref, computed, watchEffect } from 'vue';

export default {
    name: 'SponsorsComponent',
    components: {
        AdminMenuItemHeader,
        ActionsForEntity,
        NewEntityButton,
        NewSponsor,
        ImagePicker
    },


    setup() {
        const competitions = ref<Competition[]>([]);
        const circuits = ref<Circuit[]>([]);
        const sponsors = ref<Sponsor[]>([]);
        const selectedCompetition = ref<Competition>();
        const selectedCompetitionName = ref('');
        const selectedCircuit = ref<Circuit>();
        const selectedCircuitName = ref('');
        const selectedSponsor = ref<Sponsor>();
        const selectedSponsorName = ref('');


        const isFormVisible = ref(false);
        const logo = ref<File>();

        const handleSelectedImage = (image: File) => {
            logo.value = image;
        };

        const handleSelectedCompetition = async () => {
            selectedCompetition.value = competitions.value.find(item => item.name === selectedCompetitionName.value);
            if (selectedCompetition.value) {
                await competitionStore().getCircuitsByCompetitionID(selectedCompetition.value._id || '');
                circuits.value = competitionStore().circuits;
                selectedCircuitName.value = circuits.value[0]?.name || '';
            }
        };

        const handleSelectedCircuit = async () => {
            selectedCircuit.value = circuits.value.find(circuit => circuit.name === selectedCircuitName.value);
            if (selectedCircuit.value) {
                await competitionStore().getSponsorsByCircuitID(selectedCircuit.value._id || '');
                sponsors.value = competitionStore().sponsors;
            }
        };

        const deleteSponsor = async (index: number) => {
            await competitionStore().deleteSponsor(index);
            sponsors.value = competitionStore().sponsors;
        };


        const filteredSponsors = computed(() => {
            if (!selectedSponsorName.value) {
                return sponsors.value;
            }

            return sponsors.value.filter((sponsor) =>
                sponsor.name.toLowerCase().includes(selectedSponsorName.value?.toLowerCase() ?? '')
            );
        });

        onMounted(async () => {
            competitions.value = competitionStore().competitions;
            if (competitions.value.length > 0) {
                selectedCompetitionName.value = competitions.value[0].name;
                await handleSelectedCompetition();
            }
        });

        watchEffect(() => {
            if (selectedCircuitName.value) {
                handleSelectedCircuit();
            }
        });

        const handleInput = (name: string) => {
            selectedSponsorName.value = name;
        };
        const showForm = () => {
            isFormVisible.value = true;
        };

        const hideForm = () => {
            isFormVisible.value = false;
        };

        return {
            competitions,
            circuits,
            sponsors,
            isFormVisible,
            logo,
            showForm,
            hideForm,
            handleSelectedImage,
            selectedCompetition,
            selectedCompetitionName,
            selectedCircuit,
            selectedCircuitName,
            handleSelectedCompetition,
            handleSelectedCircuit,
            deleteSponsor,
            handleInput,
            filteredSponsors,
        }
    },

};




</script>

