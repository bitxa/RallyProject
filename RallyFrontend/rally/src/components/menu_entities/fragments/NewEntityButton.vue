<template>
    <v-col cols="auto" class="new-box-container">
        <v-btn size="x-large" class="new-box" @click="showForm" rounded>
            <h2>{{ button_title }}</h2>
            <v-icon left>
                <AnFilledPlusCircle class="plus" />
            </v-icon>
        </v-btn>
    </v-col>
</template>

<script lang="ts">
import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";


export default {
    name: 'NewEntityButton',

    components: {
        AnFilledPlusCircle,
    },

    props: {
        button_title: {
            required: true,
            type: String,
        }

    },

    methods: {
        showForm() {
            this.$emit('showForm');
        }
    },
}
</script>