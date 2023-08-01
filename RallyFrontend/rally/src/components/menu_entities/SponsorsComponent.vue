<style src="@/assets/styles/admin_panel/admin_panel.css"></style>

<template>
    <v-toolbar class="section-header" :elevation="8" density="compact" dense floating>
        <h4>Competencia:</h4>
        <v-autocomplete v-model="selectedCompetitionName" :items="competitions.map((competition: any) => competition.name)"
            item-text="name" item-value="name" return-object append-icon="mdi-slash-forward"
            @change="handleSelectedCompetition" density="compact" hide-details single-line class="ma-6 ml-2"
            placeholder="Seleccione una competencia" color="light-blue lighten-2" variant="solo" clearable></v-autocomplete>

        <h4>Circuito:</h4>
        <v-autocomplete v-model="selectedCircuitName" :items="circuits.map((circuit: any) => circuit.name)" item-text="name"
            return-object @change="handleSelectedCircuit" density="compact" hide-details single-line class="ma-6 ml-2"
            placeholder="Seleccione una competencia" color="light-blue lighten-2" variant="solo" clearable></v-autocomplete>

    </v-toolbar>
    <AdminMenuItemHeader header_title="Sponsors" :data="sponsors" :placeholder="'Busque algún sponsor:'"
        @input_name="handleInput" />

    <NewEntityButton :button_title="'Añadir Sponsor'" @showForm="showForm"></NewEntityButton>

    <div class="pagination-container">
        <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button">
            <MdTwoToneNavigateBefore />
        </button>
        <v-pagination v-model="currentPage" :length="numberOfPages" :total-visible="5"
            class="pagination-numbers"></v-pagination>
        <button @click="goToNextPage" :disabled="currentPage === numberOfPages" class="pagination-button">
            <MdTwoToneNavigateNext />
        </button>
    </div>

    <div class="container">

        <div class="box" v-for="(sponsor, index) in paginatedSponsors" :key="index">
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
                <a :href="sponsor.web">{{ sponsor.web }}</a>
            </div>
        </div>
    </div>

    <v-dialog v-model="isFormVisible" persistent max-width="700px">
        <sponsor-form @close="hideForm" :circuit="selectedCircuit" />
    </v-dialog>
</template>
  
<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import SponsorForm from "@/components/menu_entities/floating-forms/SponsorForm.vue";
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import { competitionStore } from '@/stores/competitionStore';
import ImagePicker from "@/components/menu_entities/floating-forms/fragments/ImagePicker.vue";
import type { Circuit, Competition, Sponsor } from '@/interfaces/Interfaces';
import { onMounted, ref, computed, watchEffect, toRef } from 'vue';
import { MdTwoToneNavigateBefore, MdTwoToneNavigateNext } from '@kalimahapps/vue-icons';
import { usePagination } from '@/utils/pagination';

export default {
    name: 'SponsorsComponent',
    components: {
        AdminMenuItemHeader,
        ActionsForEntity,
        NewEntityButton,
        SponsorForm,
        ImagePicker,
        MdTwoToneNavigateBefore,
        MdTwoToneNavigateNext,
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
        const currentPage = ref(1);
        const itemsPerPage = ref(5);

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
            return sponsors.value.filter(sponsor =>
                sponsor.name.toLowerCase().includes(selectedSponsorName.value?.toLowerCase() ?? '')
            );
        });

        const sponsorsRef = toRef(filteredSponsors, 'value');

        const { paginatedData: paginatedSponsors, numberOfPages, goToNextPage, goToPreviousPage } = usePagination(
            itemsPerPage,
            sponsorsRef,
            currentPage,
        );

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
            selectedCompetitionName,
            selectedCircuitName,
            isFormVisible,
            logo,
            handleSelectedImage,
            selectedCompetition,
            selectedCircuit,
            handleSelectedCompetition,
            handleSelectedCircuit,
            deleteSponsor,
            handleInput,
            filteredSponsors,
            currentPage,
            numberOfPages,
            paginatedSponsors,
            goToNextPage,
            goToPreviousPage,
            showForm,
            hideForm,
        };
    },
};
</script>
  