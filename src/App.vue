<style>
  .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0
    }
</style>

<template>
  <div id="app" class="red">
  <!-- NAVBAR -->
   <nav class="red darken-2">
    <div class="nav-wrapper center">
      <router-link to="/home" class="brand-logo center hide-on-med-and-down">AprobandoUNS</router-link>
      <a class="button-collapse"></a>
      <ul class="left">
        <router-link
        tag="li"
        active-class="active"
        exact
        to="/home"
        >
        <a>Inicio</a>
        </router-link>
        <router-link
        tag="li"
        active-class="active"
        exact
        to="/carreras"
        >
        <a>Carreras</a>
        </router-link>
      </ul>
    </div>
  </nav>
  <!-- FIN-NAVBAR -->

    <!-- content -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- fin content -->
    <!-- footer -->
    <footer class="page-footer red darken-2">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Gracias Por Visitarnos</h5>
            <p class="grey-text text-lighten-4" style="text-align: justify;">Acá un lorem porque no se que poner: Lorem ipsum dolor sit amet consectetur adipisicing elit. At ullam ipsam ad. Laboriosam suscipit optio cum nostrum a error minus, eum dolore sit ab odit repellat accusantium dolorem eaque deserunt!</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Este sitio fue hecho con:</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" target="_blank" href="https://vuejs.org/">VueJs</a></li>
              <li><a class="grey-text text-lighten-3" target="_blank" href="http://materializecss.com/">Materialize</a></li>
              <li><a class="grey-text text-lighten-3" target="_blank" href="https://fonts.google.com/">Google Font</a></li>
              <li><a class="grey-text text-lighten-3" target="_blank" href="http://google.github.io/material-design-icons/">Material Icons</a></li>
              <li><a class="grey-text text-lighten-3" target="_blank" href="https://firebase.google.com/">Firebase</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
        <p>
          © Esto no tiene derechos de autor
        </p>
        </div>
      </div>
    </footer>
  </div>

  
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Carreras from './components/carreras'
import Cursos from './components/cursos'
import Examenes from './components/examenes'
import Home from './components/home'
import {dbRefCarreras, dbRefExamenes} from './helpers/firebase'


Vue.use(VueRouter)


const routes = [
  {path: '/', component: Home},
  {path: '/carreras', component: Carreras},
  {path: '/home', component: Home},
  {path: '/cursos/:id', name: 'cursos', component: Cursos},
  {path: '/examenes/:id', name: 'examenes', component: Examenes},
  {path: '*', Home},
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: './'
})
export default {
  name: 'app',
  router,
  firebase: {
    carreras: dbRefCarreras,
  }
}
</script>

