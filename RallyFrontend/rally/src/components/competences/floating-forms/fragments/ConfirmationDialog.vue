<template>
    <v-dialog :value="dialog" max-width="500px" persistent transition="dialog-top-transition">
        <v-card class="confirmation-dialog">
            <v-card-title class="headline"><strong>Confirmación</strong></v-card-title>
            <v-card-text>
                ¿Seguro que deseas agrear una nueva competición?
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="handleConfirm">Confirmar</v-btn>
                <v-btn color="error" @click="handleEdit">Editar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<style scoped>
.confirmation-dialog {
    z-index: 9999;
}
</style>

<script lang="ts">
export default {
    name: 'ConfirmationDialog',
    props: {
        dialog: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleConfirm() {
            this.$emit('confirm');
        },
        handleEdit() {
            this.$emit('edit');
        },
    },
};
</script>
