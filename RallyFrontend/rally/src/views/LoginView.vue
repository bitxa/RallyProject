
<style scoped src="@/assets/styles/login_styles/login.css"></style>

<template>
    <main>
        <form name="LoginForm">
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
export default {
    name: 'LoginView',
}
</script>