<style src="@/assets/styles/admin_panel/entity_data.css"></style>


<template>
    <AdminMenuItemHeader header_title="Equipos" :listing_data="[]" :placeholder="'Busque algún equipo:'" />

    <v-col cols="auto" class="new-box-container">
        <v-btn size="x-large" class="new-box" @click="showForm" rounded>
            <h2>Crear equipo</h2>
            <v-icon left>
                <AnFilledPlusCircle class="plus" />
            </v-icon>
        </v-btn>
    </v-col>

    <div class="container">
        <div v-if="isFormVisible" class="overlay">
            <NewSponsor @close="hideForm" />
        </div>

        <div class="box">
            <div class="info-element" style="align-items: center;">
                <h2>Equipo A</h2>
            </div>

            <div class="info-element">
                <h2>Número vehículo:</h2>
                <p>289</p>
            </div>

            <div class="info-element">
                <h2>Número vehículo:</h2>
                <p>289</p>
            </div>

            <div class="info-element">
                <h2>Nombre conductor:</h2>
                <p>Joel Sebastian Romero Cañar</p>
            </div>

            <div class="info-element">
                <h2>Nombre copiloto:</h2>
                <p>Joel Sebastian Romero Cañar</p>
            </div>

            <div class="info-element">
                <h2>Categoria actual:</h2>
                <p>Categoria B</p>
            </div>

            <div class="info-element">
                <h2>Resultados:</h2>
                <p>Categoria B</p>
            </div>
        </div>


    </div>
</template>

<script lang="ts">

import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";


export default {
    name: 'TeamsComponent',
    components: { AnFilledPlusCircle, AdminMenuItemHeader },

    data() {
        return {
            isFormVisible: false,
            logo: null as File | null,
        };
    },
    methods: {
        handleImageSelected(image: File) {
            this.logo = image;
        },

        showForm() {
            this.isFormVisible = true;
        },
        hideForm() {
            this.isFormVisible = false;
        },
    },
};




</script>

