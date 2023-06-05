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
                <h2>Rally 2020</h2>
            </div>

            <div class="info-element">
                <h2>Descripción</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas possimus deleniti sunt inventore atque
                    vitae accusantium, totam at autem veritatis earum nostrum quo molestias velit, cum aliquid cupiditate
                    laudantium. Amet.</p>
            </div>

            <div class="info-element">
                <h2>Logo</h2>
                <ImagePicker @imageSelected="handleImageSelected"></ImagePicker>

            </div>

            <div class="info-element">
                <h2>Sitio Web (URL):</h2>
                <a href="http://cocacola.com">
                    http://cocacola.com
                </a>
            </div>

        </div>


    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from './fragments/AdminMenuItemHeader.vue';
import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";

import NewSponsor from "@/components/competences/floating-forms/NewSponsor.vue";
import ImagePicker from "@/components/competences/floating-forms/fragments/ImagePicker.vue";

export default {
    name: 'TeamsComponent',
    components: { AdminMenuItemHeader, AnFilledPlusCircle, NewSponsor, ImagePicker },

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

