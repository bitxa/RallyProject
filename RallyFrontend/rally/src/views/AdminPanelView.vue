
<style src="@/assets/styles/admin_panel/admin_panel.css"></style>


<template>
    <v-container fluid class="admin-panel">
        <button type="button" class="menu-toggle-button" @click="toggleMenu">
            <ChMenuHamburger class="menu-icon" :class="{ 'menu-icon-active': !showMenu }" />
        </button>

        <aside :class="{ 'hide-menu': !showMenu }" @mouseleave="hideMenuButton" @mouseover="showMenuButton">
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
                <button type="button" class="menu_button" @click="selectMenuItem('times')"
                    :class="{ active: currentComponent === 'TimesComponent' }">
                    <span>
                        <JaFillChronometer class=" menu_icon" />
                    </span>
                    <span>
                        <p> Tiempos </p>
                    </span>
                </button>

                <button type="button" class="menu_button" @click="selectMenuItem('competences')"
                    :class="{ active: currentComponent === 'CompetitionComponent' }">
                    <span>
                        <UnPathfinderUnite class=" menu_icon" />
                    </span>
                    <span>
                        <p> Competiciones </p>
                    </span>
                </button>

                <button type="button" class="menu_button" @click="selectMenuItem('circuits')"
                    :class="{ active: currentComponent === 'CircuitsComponent' }">
                    <span>
                        <FaRoad class=" menu_icon" />
                    </span>
                    <span>
                        <p> Circuitos </p>
                    </span>
                </button>

                <button type="button" class="menu_button" @click="selectMenuItem('competitors')"
                    :class="{ active: currentComponent === 'CompetitorsComponent' }">
                    <span>
                        <AnOutlinedUsergroupAdd class="menu_icon" />
                    </span>
                    <span>
                        <p> Competidores </p>
                    </span>
                </button>

                <button type="button" class="menu_button" @click="selectMenuItem('sponsors')"
                    :class="{ active: currentComponent === 'SponsorsComponent' }">
                    <span>
                        <CaLocationCompanyFilled class="menu_icon" />
                    </span>
                    <span>
                        <p> Sponsors </p>
                    </span>
                </button>

                <button type="button" class="menu_button" @click="selectMenuItem('teams')"
                    :class="{ active: currentComponent === 'TeamsComponent' }">
                    <span>
                        <FlFilledPeopleTeam class="menu_icon" />
                    </span>
                    <span>
                        <p> Equipos </p>
                    </span>
                </button>

            </div>
            <v-switch v-model="lightMode" label="Dark Mode" inset @change="toggleDarkMode"></v-switch>

        </aside>

        <main :class="{ 'full-width': !showMenu }">
            <keep-alive>
                <component :is="currentComponent" :key="currentComponent"></component>
            </keep-alive>
        </main>
    </v-container>
</template>

<script lang="ts">
import { JaFillChronometer } from "@kalimahapps/vue-icons";
import { UnPathfinderUnite } from "@kalimahapps/vue-icons";
import { FlFilledPeopleTeam } from "@kalimahapps/vue-icons";
import { AnOutlinedUsergroupAdd } from "@kalimahapps/vue-icons";
import { CaLocationCompanyFilled } from "@kalimahapps/vue-icons";
import { FaRoad } from "@kalimahapps/vue-icons";
import { ChMenuHamburger } from "@kalimahapps/vue-icons";

import CompetitionComponent from "@/components/competences/CompetitionComponent.vue";
import TimesComponent from "@/components/competences/TimesComponent.vue";
import CircuitsComponent from "@/components/competences/CircuitsComponent.vue";
import CompetitorsComponent from "@/components/competences/CompetitorsComponent.vue";
import SponsorsComponent from "@/components/competences/SponsorsComponent.vue";
import TeamsComponent from "@/components/competences/TeamsComponent.vue";


export default {
    name: 'LoginView',
    components: {
        JaFillChronometer,
        UnPathfinderUnite,
        FaRoad,
        FlFilledPeopleTeam,
        CaLocationCompanyFilled,
        AnOutlinedUsergroupAdd,
        ChMenuHamburger,
        CompetitionComponent,
        TimesComponent,
        CircuitsComponent,
        CompetitorsComponent,
        SponsorsComponent,
        TeamsComponent,
    },
    data() {
        return {
            currentComponent: localStorage.getItem('lastComponent') || 'CompetitionComponent',
            showMenu: true,
            timeout: null as any,
            lightMode: false,
        };
    },
    methods: {
        selectMenuItem(menuItem: string) {
            switch (menuItem) {
                case 'times':
                    this.currentComponent = 'TimesComponent';
                    break;
                case 'competences':
                    this.currentComponent = 'CompetitionComponent';
                    break;
                case 'circuits':
                    this.currentComponent = 'CircuitsComponent';
                    break;
                case 'competitors':
                    this.currentComponent = 'CompetitorsComponent';
                    break;
                case 'sponsors':
                    this.currentComponent = 'SponsorsComponent';
                    break;
                case 'teams':
                    this.currentComponent = 'TeamsComponent';
                    break;
            }
            localStorage.setItem('lastComponent', this.currentComponent);
        },

        toggleMenu() {
            this.showMenu = !this.showMenu;
        },

        hideMenuButton() {
            this.timeout = setTimeout(() => {
                this.showMenu = false;
            }, 2000);
        },

        showMenuButton() {
            clearTimeout(this.timeout);
            this.showMenu = true;
        },

        toggleDarkMode() {
            this.lightMode = !this.lightMode;
        },

    },

}
</script>

