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

    <AdminMenuItemHeader header_title="Equipos" :data="[]" :placeholder="'Busque algún equipo:'" />

    <NewEntityButton :button_title="'Crear equipo'" @showForm="showForm"></NewEntityButton>


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
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';

export default {
    name: 'TeamsComponent',
    components: { AdminMenuItemHeader, NewEntityButton },

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

