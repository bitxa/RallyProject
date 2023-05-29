<style scoped src="@/assets/styles/admin_panel/competences.css"></style>

<template>
  <AdminMenuItemHeader header_title="Competiciones" />

  <div class="container">



    <div v-if="isFormVisible" class="overlay">
      <NewCompetence @close="hideForm" />
    </div>

    <div class="box new" @click="showForm">
      <h2>Nueva competencia</h2>
      <AnFilledPlusCircle class="plus" />
    </div>

    <div class="box">
      <div class="info-element" style="align-items: center;">
        <h2>Rally 2020</h2>
      </div>

      <div class="info-element">
        <div class="dates">
          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>14/05/2004</p>
          </div>

          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>14/05/2004</p>
          </div>
        </div>

      </div>

      <div class="info-element">
        <h2>Provincia</h2>
        <p>Rally 2020-2021</p>
      </div>

      <div class="info-element">
        <h2>Descripción</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam corrupti, repellendus blanditiis eligendi sint
          placeat recusandae non omnis vel iusto fugit odit veritatis dolores quidem facilis dicta nesciunt neque officia!
        </p>
      </div>


      <div class="info-element">
        <h2>Circuitos</h2>
        <p><a href="#" class="wave-link">Ver circuitos
            <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60"
              preserveAspectRatio="none">
              <path
                d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
              </path>
            </svg>
          </a>
        </p>
      </div>
    </div>

    <div class="box">
      <div class="info-element" style="align-items: center;">
        <h2>Rally 2020</h2>
      </div>

      <div class="info-element">
        <div class="dates">
          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>14/05/2004</p>
          </div>

          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>14/05/2004</p>
          </div>
        </div>

      </div>

      <div class="info-element">
        <h2>Provincia</h2>
        <p>Rally 2020-2021</p>
      </div>

      <div class="info-element">
        <h2>Descripción</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam corrupti, repellendus blanditiis eligendi sint
          placeat recusandae non omnis vel iusto fugit odit veritatis dolores quidem facilis dicta nesciunt neque officia!
        </p>
      </div>


      <div class="info-element">
        <h2>Circuitos</h2>
        <p><a href="#" class="wave-link">Ver circuitos
            <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60"
              preserveAspectRatio="none">
              <path
                d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
              </path>
            </svg>
          </a>
        </p>
      </div>
    </div>

    <div class="box">
      <div class="info-element" style="align-items: center;">
        <h2>Rally 2020</h2>
      </div>

      <div class="info-element">
        <div class="dates">
          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>14/05/2004</p>
          </div>

          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>14/05/2004</p>
          </div>
        </div>

      </div>

      <div class="info-element">
        <h2>Provincia</h2>
        <p>Rally 2020-2021</p>
      </div>

      <div class="info-element">
        <h2>Descripción</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam corrupti, repellendus blanditiis eligendi sint
          placeat recusandae non omnis vel iusto fugit odit veritatis dolores quidem facilis dicta nesciunt neque officia!
        </p>
      </div>


      <div class="info-element">
        <h2>Circuitos</h2>
        <p><a href="#" class="wave-link">Ver circuitos
            <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60"
              preserveAspectRatio="none">
              <path
                d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
              </path>
            </svg>
          </a>
        </p>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from './AdminMenuItemHeader.vue';
import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";
import NewCompetence from "@/components/competences/floating-forms/NewCompetence.vue"

export default {
  name: 'CompetencesComponent',
  components: {
    AdminMenuItemHeader,
    AnFilledPlusCircle,
    NewCompetence
  },

  data() {
    return {
      isFormVisible: false,
    };
  },

  methods: {
    showForm() {
      this.isFormVisible = true;
    },
    hideForm() {
      this.isFormVisible = false;
    },
  },
};


</script>

