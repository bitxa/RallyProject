<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input role="textbox" v-model="selected_competition" class="breadcrumbItem" />
        </div>
    </v-breadcrumbs>


    <AdminMenuItemHeader header_title="Circuitos" :data="[]" :placeholder="'Busque algún circuito:'" />

    <NewEntityButton :button_title="'Crear circuito'" @showForm="showForm"></NewEntityButton>



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
                    tempore quas quos id distinctio dolorum non, fugit eum quidem porro molestiae delectus nisi ducimus?
                </p>
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
                <LinkWithAnimation :message="'Categorias'" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.breadCrumb {
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    margin-bottom: 0%;
    background-color: transparent;
    width: 90%;
}

.breadCrumbItem {
    align-self: center;
    color: white;
    font-size: 1rem;
    margin: 1vh;
}
</style>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';

import NewCircuit from "@/components/menu_entities/floating-forms/NewCircuit.vue";
import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";


export default {
    name: 'CompetencesComponent',
    components: {
        AdminMenuItemHeader,
        NewCircuit,
        LinkWithAnimation,
        NewEntityButton
    },

    data() {
        return {
            isFormVisible: false,
            selected_competition: 'dara',
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

