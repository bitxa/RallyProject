<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input role="textbox" class="breadcrumbItem" />
            <p class="separator">|</p>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Circuito:</label>
            <input role="textbox" class="breadcrumbItem" />
            <p class="separator">|</p>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Categoria:</label>
            <input role="textbox" class="breadcrumbItem" />
            <p class="separator">|</p>
        </div>
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Competidores" :data="[]" :placeholder="'Busque algún competidor:'" />

    <NewEntityButton :button_title="'Crear competidor'" @showForm="showForm"></NewEntityButton>


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

import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';

import NewCompetitor from "@/components/menu_entities/floating-forms/NewCompetitor.vue"


export default {
    name: 'CompetitorsComponent',
    components: {
        AdminMenuItemHeader,
        NewEntityButton,
        NewCompetitor
    },
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

