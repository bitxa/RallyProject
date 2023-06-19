<template>
    <v-file-input class="image-upload-container" :rules="rules" accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Seleccionar logo"
        @change="handleLogoUpload"></v-file-input>
</template>


<script lang="ts">

export default {
    name: 'ImagePicker',
    emits: ['imageSelected'],
    data() {
        return {
            logoPreviewUrl: null as string | null,
            logoFile: null as File | null,
            isFormVisible: false,
            rules: [
                (value: string | any[]) => {
                    return !value || !value.length || value[0].size < 2000000 || 'La imágen debe pesar menos de 2 MB!'
                },
            ],
        };
    },
    methods: {
        handleLogoUpload(event: any) {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                this.logoFile = file;
                this.logoPreviewUrl = URL.createObjectURL(file);
                this.$emit('imageSelected', this.logoFile);
            }
            event.target.value = '';
        },
    },
};
</script>


<style scoped>
.image-upload-container {
    display: block;
    width: 100%;
}
</style>