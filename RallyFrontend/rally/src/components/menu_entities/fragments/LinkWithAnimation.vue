<style src="@/assets/styles/admin_panel/fragments/link_animation.css"></style>

<template>
    <p><a href="#" class="wave-link">{{ message }}
            <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60"
                preserveAspectRatio="none">
                <path
                    d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
                </path>
            </svg>
        </a>
    </p>
</template>

<script lang="ts">
export default {
    name: "LinkWithAnimation",
    props: {
        message: {
            type: String,
            required: true,
        },
    },
};
</script>