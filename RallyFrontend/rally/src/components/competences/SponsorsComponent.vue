<style scoped src="@/assets/styles/admin_panel/sponsors.css"></style>
<style scoped src="@/assets/styles/admin_panel/competences.css"></style>


<template>
    <AdminMenuItemHeader header_title="Sponsors" />

    <div class="container">
        <div class="box new">
            <h2>Añadir Sponsor</h2>
            <AnFilledPlusCircle class="plus" />
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
                <div class="logo-upload-container">
                    <label v-if="!logoPreviewUrl" for="logo-upload" class="upload-label">Subir logo</label>
                    <input v-if="!logoPreviewUrl" type="file" id="logo-upload" @change="handleLogoUpload"
                        class="upload-input">
                    <div v-if="logoPreviewUrl" class="preview-container">
                        <button @click="deleteLogo" class="delete-button">X</button>
                        <img :src="logoPreviewUrl" :key="logoPreviewUrl" alt="Logo Preview" class="preview-image">
                    </div>
                </div>
            </div>

            <div class="info-element">
                <h2>URl sitio web</h2>
                <p>http://cocacola.com</p>
            </div>

        </div>


    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from './AdminMenuItemHeader.vue';
import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";

export default {
    name: 'SponsorsComponent',
    components: { AdminMenuItemHeader, AnFilledPlusCircle },

    data() {
        return {
            logoPreviewUrl: null as string | null,
            logoFile: null as File | null,
        };
    },
    methods: {
        handleLogoUpload(event: any) {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                this.logoFile = file;
                this.logoPreviewUrl = URL.createObjectURL(file);
            } else {
                this.logoFile = null;
                this.logoPreviewUrl = null;
            }

            event.target.value = '';
            // You can perform additional actions with the file, such as uploading it to a server
        },
        deleteLogo() {
            this.logoFile = null;
            this.logoPreviewUrl = null;

            // Perform additional actions for deleting the image, such as sending a request to the server
        },
    },
};




</script>

