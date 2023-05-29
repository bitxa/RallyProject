<style scoped src="@/assets/styles/admin_panel/competences.css"></style>

<template>
    <AdminMenuItemHeader header_title="Competidores" />

    <div class="container">
        <div class="box new">
            <h2>Agregar competidor</h2>
            <AnFilledPlusCircle class="plus" />
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
import AdminMenuItemHeader from './AdminMenuItemHeader.vue';
import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";

export default {
    name: 'CompetitorsComponent',
    components: { AdminMenuItemHeader, AnFilledPlusCircle },

};


</script>

