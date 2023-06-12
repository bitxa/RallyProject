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
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Categorias" :data="[]" :placeholder="'Busque alguna categoria:'" />

    <NewEntityButton :button_title="'Crear categoria'" @showForm="showForm"></NewEntityButton>


    <div class="container">

        <div v-if="isFormVisible" class="overlay">
            <NewCircuit @close="hideForm" />
        </div>

        <div class="box">
            <span>
                <h2>Circuito Catamayo</h2>
            </span>

            <div class="info-element">
                <h2>Descripción</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse unde animi nam nemo assumenda aperiam,
                    tempore quas quos id distinctio dolorum non, fugit eum quidem porro molestiae delectus nisi ducimus?</p>
            </div>

            <div class="info-element">
                <h2>Longitud</h2>
                <p>2 Km</p>
            </div>

            <div class="info-element">
                <h2>Locación</h2>
                <p>Pista San Jose</p>
            </div>

            <div class="info-element">
                <h2>Sponsors</h2>
                <LinkWithAnimation :message="'Ver Sponsors'" />
            </div>

            <div class="info-element">
                <h2>Categorias</h2>
                <p><a href="#" class="wave-link">Ver categorias
                        <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60"
                            preserveAspectRatio="none">
                            <path
                                d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
                            </path>
                        </svg>
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';

import NewCircuit from "@/components/menu_entities/floating-forms/NewCircuit.vue";
import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";


export default {
    name: 'CategoriesComponent',
    components: {
        AdminMenuItemHeader,
        NewCircuit,
        LinkWithAnimation,
        NewEntityButton
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

