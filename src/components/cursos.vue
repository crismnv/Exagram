<template>
    <div class="container">
        <h2 class=" center-align red-text text-lighten-3">{{nombre['.value']}}</h2>
        <!-- <p  v-for="ciclo in ciclos['.value']" :key="ciclo['.key']" v-if="ciclo">{{ciclo}}------- </p> -->
        <ul class="collection with-header" v-for="ciclo in ciclos['.value']" :key="ciclo['.key']" v-if="ciclo">
            <li class="collection-header green lighten-2"><h4>{{ciclo.numero}}° Ciclo</h4></li>
            <router-link class="green lighten-3 collection-item black-text" :to="{name: 'examenes', params: {id:curso.id}}" v-for="curso in ciclo.cursos" :key="curso['.key']">{{curso.nombre}}</router-link>
        </ul>
    </div>
    
</template>


<script>
import { dbRefCarreras } from '../helpers/firebase';
export default {
  name: 'cursos',
//   data()
//   {
//   },
//   firebase: 
//   {
//     //   cursos: dbRefCarreras.child(this.carrera).child('cursos')
//     //   cursos: dbRefCarreras.child(this.carrera).child('cursos')
//   },
  beforeMount()
  {
    //   console.log(this.$route.params)
    let carrera = this.$route.params.id
    console.log('>>>>carrera: ' + carrera)
    this.$bindAsObject('ciclos', dbRefCarreras.child(carrera).child('ciclos'))
    this.$bindAsObject('nombre', dbRefCarreras.child(carrera).child('nombre'))
    console.log(this.ciclos)
  }
}
</script>
