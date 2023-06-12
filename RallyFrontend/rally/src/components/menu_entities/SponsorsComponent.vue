<style src="@/assets/styles/admin_panel/entity_data.css"></style>


<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input role="textbox" class="breadcrumbItem" />
            <p class="separator">|</p>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Categoria:</label>
            <input role="textbox" class="breadcrumbItem" />
            <p class="separator">|</p>
        </div>
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Sponsors" :data="[]" :placeholder="'Busque algún sponsor:'" />
    <NewEntityButton :button_title="'Añadir Sponsor'" @showForm="showForm"></NewEntityButton>


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

import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';

import NewSponsor from "@/components/menu_entities/floating-forms/NewSponsor.vue";
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';

import ImagePicker from "@/components/menu_entities/floating-forms/fragments/ImagePicker.vue";

export default {
    name: 'SponsorsComponent',
    components: {
        AdminMenuItemHeader,
        NewEntityButton,
        NewSponsor,
        ImagePicker
    },

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

