
<style scoped src="@/assets/styles/admin_panel/admin_panel.css"></style>

<template>
    <div class="admin-panel">
        <aside>
            <img src="../assets/img/rally_logo.png" class="rally_logo">

            <div class="user">
                <img src="../assets/img/admin_default_image.png" class="admin_image">
                <h3 class="name">Joel Romero</h3>
                <h3 class="username">
                    @bitxa
                </h3>
                <h6 class="role">admin</h6>
            </div>

            <div class="menu">
                <button type="button" class="menu_button">
                    <span>
                        <JaFillChronometer class="menu_icon" />
                    </span>
                    <span>
                        <p> Tiempos</p>
                    </span>
                </button>

                <button type="button" class="menu_button">
                    <span>
                        <UnPathfinderUnite class="menu_icon" />
                    </span>
                    <span>
                        <p> Competiciones</p>
                    </span>
                </button>

                <button type="button" class="menu_button">
                    <span>
                        <FaRoad class="menu_icon" />
                    </span>
                    <span>
                        <p> Circuitos </p>
                    </span>
                </button>

                <button type="button" class="menu_button">
                    <span>
                        <FlFilledPeopleTeam class="menu_icon" />
                    </span>

                    <span>
                        <p> Competidores</p>
                    </span>
                </button>

                <button type="button" class="menu_button">
                    <span>
                        <CaLocationCompanyFilled class="menu_icon" />
                    </span>
                    <span>
                        <p> Sponsors</p>
                    </span>
                </button>

            </div>
        </aside>
        <main>
            <CompetencesComponent />
        </main>
    </div>
</template>

<script lang="ts">
import { JaFillChronometer } from "@kalimahapps/vue-icons";
import { UnPathfinderUnite } from "@kalimahapps/vue-icons";
import { FlFilledPeopleTeam } from "@kalimahapps/vue-icons";
import { CaLocationCompanyFilled } from "@kalimahapps/vue-icons";
import { FaRoad } from "@kalimahapps/vue-icons";
import CompetencesComponent from "@/components/competences/CompetencesComponent.vue";

export default {
    name: 'LoginView',
    components: {
        JaFillChronometer,
        UnPathfinderUnite,
        FaRoad,
        FlFilledPeopleTeam,
        CaLocationCompanyFilled,
        CompetencesComponent
    },


}
</script>