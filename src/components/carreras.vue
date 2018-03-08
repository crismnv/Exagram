<template>
  <div id="carreras" class="container">
    <div class="row">
      <div class="col s6"
      v-for="carrera in carreras" 
      :key="carrera['.key']"
      >
        <div class="card green lighten-2">
          <!-- <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="images/office.jpg">
          </div> -->
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{carrera.abreviacion}}<i class="material-icons right">expand_more</i></span>
            <p><router-link :carrera="carrera['.key']" :to="{name: 'cursos', params: {id: carrera['.key'], nombre: carrera.nombre}}">Ver Contenido</router-link></p>
          </div>
          <div class="card-reveal green lighten-1 green-text text-darken-4">
            <span class="card-title ">{{carrera.abreviacion}}<i class="material-icons right">close</i></span>
            <p><span style="font-weight: bold;">Año de la Curricula:</span> {{carrera.curricula}}</p>
          </div>
        </div>
      </div>

      <!-- MORE, SOON -->
      <div class="col s6">
        <div class="card green lighten-2">
          <!-- <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="images/office.jpg">
          </div> -->
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Mas carreras... <i class="material-icons right">expand_more</i></span>
            <p><a>Ver Contenido</a></p>
          </div>
          <div class="card-reveal green lighten-1 green-text text-darken-4">
            <span class="card-title grey-text text-darken-4">...Pronto<i class="material-icons right">close</i></span>
            <!-- <p><span style="font-weight: bold;">Archivos:</span> carrera.archivos</p> -->
          </div>
        </div>
      </div>
      <div class="col s6">
        <div class="card green lighten-2">
          <!-- <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="images/office.jpg">
          </div> -->
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Mas carreras... <i class="material-icons right">expand_more</i></span>
            <p><a>Ver Contenido</a></p>
          </div>
          <div class="card-reveal green lighten-1 green-text text-darken-4">
            <span class="card-title grey-text text-darken-4">...Pronto<i class="material-icons right">close</i></span>
            <!-- <p><span style="font-weight: bold;">Archivos:</span> carrera.archivos</p> -->
          </div>
        </div>
      </div>
      <div class="col s6">
        <div class="card green lighten-2">
          <!-- <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="images/office.jpg">
          </div> -->
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Mas carreras... <i class="material-icons right">expand_more</i></span>
            <p><a>Ver Contenido</a></p>
          </div>
          <div class="card-reveal green lighten-1 green-text text-darken-4">
            <span class="card-title grey-text text-darken-4">...Pronto<i class="material-icons right">close</i></span>
            <!-- <p><span style="font-weight: bold;">Archivos:</span> carrera.archivos</p> -->
          </div>
        </div>
      </div>
      <!-- FIN MORE, SOON -->
      
    </div>
  </div>

</template>

<script>
import {dbRefCarreras} from '../helpers/firebase'
export default {
  name: 'carreras',
  firebase: {
    carreras: dbRefCarreras
  }
}
</script>
