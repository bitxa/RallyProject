<template>
    <div class="actions">
        <button type="submit" id="create" @click="submitForm">Crear</button>
        <button type="button" id="cancel" @click="cancelForm">Cancelar</button>
    </div>
</template>

<script lang="ts">
export default {
    name: "Actions",
    methods: {
        submitForm() {
            this.$emit('submit');
        },
        cancelForm() {
            this.$emit('cancel');
        },
    },
};
</script>

<style>
.actions {
    margin-top: 2vh;
    margin-bottom: 3vh;
    justify-content: space-evenly;
    display: flex;
    width: 100%;
    flex-direction: row;
}

.actions button {
    font-size: small;
    color: white;
    width: 20%;
    border-style: none;
    border-radius: 12px;
    padding: 1vh;
}

#create {
    background-color: #03c988;
}

#cancel {
    background-color: #db005b;
}

.popup .actions button:active {
    width: 22%;
}
</style>