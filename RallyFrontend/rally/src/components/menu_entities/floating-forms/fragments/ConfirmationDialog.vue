<template>
    <v-dialog :value="dialog" max-width="500px" persistent transition="dialog-top-transition">
        <v-card class="confirmation-dialog">
            <v-card-title class="headline">Confirmación</v-card-title>
            <v-card-text>
                {{ dialog }}
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="handleConfirm()">Confirmar</v-btn>
                <v-btn color="error" @click="handleCancel()">Editar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<style>
.confirmation-dialog {
    z-index: 9999;
}
.headline {
    color: #41444B;
    font-weight: 800;
}

</style>

<script lang="ts">
export default {
    name: 'ConfirmationDialog',
    props: {
        dialog: {
            required: true,
            type: String,
        },
    },
    methods: {
        handleConfirm() {
            this.$emit('confirm');
        },
        handleCancel() {
            this.$emit('edit');
        },
    },
};
</script>
