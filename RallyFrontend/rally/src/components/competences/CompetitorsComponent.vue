<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <AdminMenuItemHeader header_title="Competidores" :listing_data="[]" :placeholder="'Busque algún competidor:'" />

    <v-col cols="auto" class="new-box-container">
        <v-btn size="x-large" class="new-box" @click="showForm" rounded>
            <h2>Añadir competidor</h2>
            <v-icon left>
                <AnFilledPlusCircle class="plus" />
            </v-icon>
        </v-btn>
    </v-col>

    <div class="container">
        <div v-if="isFormVisible" class="overlay">
            <NewCompetitor @close="hideForm" />
        </div>

        <div class="box">
            <span>
                <h2>Joel Sebastian Romero Cañar</h2>
            </span>

            <div class="info-element">
                <h2>Edad</h2>
                <p>20 años</p>
            </div>

            <div class="info-element">
                <h2>Identifación (cédula)</h2>
                <p>1105637076</p>
            </div>

            <div class="info-element">
                <h2>Tipo sangre</h2>
                <p>B+</p>
            </div>

            <div class="info-element">
                <h2>Contacto emergencia</h2>
                <p>0982645823</p>
            </div>

            <div class="info-element">
                <h2>Provincia</h2>
                <p>Loja</p>
            </div>

            <div class="info-element">
                <h2>Ciudad</h2>
                <p>Loja</p>
            </div>

            <div class="info-element">
                <h2>Categorias</h2>
                <p>Categoria A, Categoria B</p>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from './fragments/AdminMenuItemHeader.vue';

import NewCompetitor from "@/components/competences/floating-forms/NewCompetitor.vue"

import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";

export default {
    name: 'CompetitorsComponent',
    components: { AdminMenuItemHeader, AnFilledPlusCircle, NewCompetitor },
    data() {
        return {
            isFormVisible: false,
        };
    },

    methods: {
        showForm() {
            this.isFormVisible = true;
        },
        hideForm() {
            this.isFormVisible = false;
        },
    },
};


</script>

