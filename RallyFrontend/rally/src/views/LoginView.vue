
<style scoped src="@/assets/styles/login_styles/login.css"></style>

<template>
    <main>
        <div class="progress-container" v-if="isLoggingIn">
            <v-progress-circular color="blue-lighten-3" indeterminate :size="99" :width="12"></v-progress-circular>
        </div>

        <form name="LoginForm" @submit.prevent="login">
            <img src="../assets/img/rally_logo.png" alt="">
            <h3><strong>DATOS DE INGRESO</strong></h3>

            <input type="email" name="username" id="username" placeholder="Usuario">
            <input type="password" name="password" id="password" placeholder="Contraseña">

            <button>INGRESAR</button>

            <a href="">¿Olvidaste tu usario y/o contraseña?</a>
        </form>

    </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginView',
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');

        const isLoggingIn = ref(false);

        const login = async () => {
            isLoggingIn.value = true;
            redirectToRespectivePanel('panel');
        };


        const redirectToRespectivePanel = (route: string) => {
            setTimeout(() => {
                isLoggingIn.value = false;
                router.push(route);
            }, 2000);
        };

        return {
            email,
            password,
            isLoggingIn,
            login,
        };
    }
}

</script>