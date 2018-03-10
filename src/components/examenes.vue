<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<template>
  <div class="container red">
    <h2 class=" center-align red-text text-lighten-3">{{nombre['.value']}}</h2>
    <div class="row">
      <p class="col s6 m3">
          <input @click="cambiarUnidad(1)" name="group1" type="radio" id="unidad1" ref="botonUnidad1"/>
          <label class=" black-text" for="unidad1">Primera Unidad</label>
      </p>
      <p class="col s6 m3">
          <input @click="cambiarUnidad(2)" name="group1" type="radio" id="unidad2" />
          <label class=" black-text" for="unidad2">Segunda Unidad</label>
      </p>
      <p class="col s6 m3">
          <input @click="cambiarUnidad(3)" name="group1" type="radio" id="unidad3" />
          <label class=" black-text" for="unidad3">Tercera Unidad</label>
      </p>
      <p class="col s6 m3">
          <input @click="cambiarUnidad(4)" name="group1" type="radio" id="susti" />
          <label class=" black-text" for="susti">Sustitorio</label>
        </p>
    </div>

    <div id="alertas" class="row">
      <transition name="slide-fade">
        <div v-if="mensajeError" class="" role="alert">
          <p class="flow-text center-align red accent-1 red-text text-darken-4">
            {{ mensajeError }}
            <i class="material-icons prefix">error</i>
          </p>
        </div>
      </transition>

      <transition name="slide-fade">
        <div v-if="mensajeExito" class="" role="alert">
          <p class="flow-text center-align green accent-1 green-text text-darken-4" v-if="mensajeExito">
            {{ mensajeExito }}
            <i class="material-icons prefix">check_circle</i>
          </p>
        </div>
      </transition>
    </div>

    <!-- card de colaborar -->
    <div class="card green lighten-2">
      <div class="card-content">
        <br>
        <br>
        <span v-if="unidadSeleccionada==4" class="card-title flow-text center-align activator grey-text text-darken-4">AYÚDANOS - SUSTIS<i class="material-icons right">expand_more</i></span>
        <span v-else class="card-title flow-text center-align activator grey-text text-darken-4">AYÚDANOS - {{unidadSeleccionada}}° UNIDAD<i class="material-icons right">expand_more</i></span>
        <br>
        <br>
        <p class="flow-text center-align" v-if="unidadSeleccionada==4" ><span>Si deseas colaborar con esta página, abré la tarjeta y coloca un examen sustitorio, en los comentarios pones la unidad.</span></p>
        <p class="flow-text center-align" v-else><span>Si deseas colaborar con esta página, abré la tarjeta y coloca un examen de la {{unidadSeleccionada}}° unidad.</span></p>
        <br>
        <br>
      </div>
      
      <!-- Subir imagen -->
      <div class="card-reveal green lighten-4">
        <form @submit.prevent="enviarExamen">
          <span ref="cerrarCard" class="center-align card-title grey-text text-darken-4">¡Gracias!<i class="material-icons right">close</i></span>
          <div class="file-field input-field">
            <div class="btn">
              <span>Imagen</span>
              <input  name="examen" type="file" accept="image/*" @change="cambiarEstado('imagenLista')">
            </div>
            <div class="file-path-wrapper">
              <input id="nombreImagen" class="file-path validate" type="text" >
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input v-model="comentario" name="comentario" id="comentario" type="text" class="validate">
                <label for="comentario">Comentario</label>
              </div>
              <div class="input-field col s6">
                <input v-model="profesor" name="profesor" id="profesor" type="text" class="validate">
                <label for="profesor">Profesor</label>
              </div>
            </div>
          </div>
          <div v-if="statusEnvio=='imagenLista'">
            <button class="btn waves-effect waves-light right" type="submit" name="enviarExamen">Enviar
              <i class="material-icons right">send</i>
            </button>
          </div>
          <div v-if="statusEnvio=='subiendo'" class="preloader-wrapper right active">
            <div class="spinner-layer spinner-blue">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>

            <div class="spinner-layer spinner-red">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>

            <div class="spinner-layer spinner-yellow">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>

            <div class="spinner-layer spinner-green">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
          <div class="right" v-if="statusEnvio=='exito'">
            <i class="material-icons right">favorite</i>
            <i class="material-icons right">favorite</i>
            <i class="material-icons right">favorite</i>
          </div>
        </form>
      </div>
    </div>
    <!-- fin de card de colaborar -->
    
    <div v-if="!unidad1.hasOwnProperty('.value')">
      <div class="row" v-if="unidadSeleccionada === 1">
          <div class="col s12" v-for="examen in unidad1" :key="examen['.key']" v-if="examen.url">
              <div class="">
              <div class="card horizontal">
                <div class="card-image">
                  <img class="responsive-img" :src="examen.url">
                </div>
                <div class="card-stacked">
                  <div class="card-content flow-text green lighten-4">
                    <p><span  style="font-weight: bold">Profesor(a):</span>{{examen.profesor}}</p>
                    <p><span  style="font-weight: bold">Comentario:</span>{{examen.comentario}}</p>
                    <a target="_blank" style="font-weight: bold" class="green-text text-darken-4" :href="examen.url">Ver Imagen Completa</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-if="!unidad2.hasOwnProperty('.value')">
      <div class="row" v-if="unidadSeleccionada === 2">
          <div class="col s12 l6" v-for="examen in unidad2" :key="examen['.key']" v-if="examen.url">
            <div class="">
              <div class="card horizontal">
                <div class="card-image">
                  <img class="responsive-img" :src="examen.url">
                </div>
                <div class="card-stacked">
                  <div class="card-content flow-text green lighten-4">
                    <p><span  style="font-weight: bold">Profesor(a):</span>{{examen.profesor}}</p>
                    <p><span  style="font-weight: bold">Comentario:</span>{{examen.comentario}}</p>
                    <a target="_blank" style="font-weight: bold" class="green-text text-darken-4" :href="examen.url">Ver Imagen Completa</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-if="!unidad3.hasOwnProperty('.value')">
      <div class="row" v-if="unidadSeleccionada === 3">
          <div class="col s12 l6" v-for="examen in unidad3" :key="examen['.key']" v-if="examen.url">
            <div class="">
              <div class="card horizontal">
                <div class="card-image">
                  <img class="responsive-img" :src="examen.url">
                </div>
                <div class="card-stacked">
                  <div class="card-content flow-text green lighten-4">
                    <p><span  style="font-weight: bold">Profesor(a):</span>{{examen.profesor}}</p>
                    <p><span  style="font-weight: bold">Comentario:</span>{{examen.comentario}}</p>
                    <a target="_blank" style="font-weight: bold" class="green-text text-darken-4" :href="examen.url">Ver Imagen Completa</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-if="!susti.hasOwnProperty('.value')">
      <div class="row" v-if="unidadSeleccionada === 4">
          <div class="col s12 l6" v-for="examen in susti" :key="examen['.key']" v-if="examen.url">
            <div class="">
              <div class="card horizontal">
                <div class="card-image">
                  <img class="responsive-img" :src="examen.url">
                </div>
                <div class="card-stacked">
                  <div class="card-content flow-text green lighten-4">
                    <p><span  style="font-weight: bold">Profesor(a):</span>{{examen.profesor}}</p>
                    <p><span  style="font-weight: bold">Comentario:</span>{{examen.comentario}}</p>
                    <a target="_blank" style="font-weight: bold" class="green-text text-darken-4" :href="examen.url">Ver Imagen Completa</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dbRefExamenes, storageRef } from "../helpers/firebase"

export default {
  name: 'examenes',
  data()
  {
    return {
      unidadSeleccionada: 1,
      profesor: '',
      comentario: '',
      mensajeExito: '',
      mensajeError: '',
      statusEnvio: 'sinImagen'
    }
  },
  methods:
  {
    setMensajes(error, mensaje)
    {
      if (error)
      {
        this.mensajeError = mensaje
      }else{
        this.mensajeExito = mensaje
      }

      this.productoSeleccionado = false
      setTimeout(() => {
        this.mensajeExito = false;
        this.mensajeError = false;
      }, 3000);
    },
    cambiarEstado(estado)
    {
      this.statusEnvio = estado
    },
    cambiarUnidad(unidad)
    {
      // alert("Cambiaste a la unidad: " + unidad)
      this.unidadSeleccionada = unidad
    },
    cadenaAleatoria() 
    {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    subirExamen(url, comentario, profesor, referencia)
    {
      console.log(url)
      console.log(comentario)
      console.log(profesor)
      console.log(referencia)

      dbRefExamenes.child(this.$route.params.id).child(this.unidadSeleccionada).push({
        comentario,
        url,
        profesor,
        referencia
      }).then( () => {
        this.comentario = ''
        this.profesor = ''
        document.getElementById("nombreImagen").value = '';
        this.cambiarEstado('exito')
        this.$refs.cerrarCard.click()
        this.setMensajes(false, "Todo ha ido de maravilla, gracias por colaborar <3!")
        // alert('gracias')
      }).catch( () => {
        this.setMensajes(true, "¡No se subir la imagen, intentelo mas tarde <3!")
        storageRef.child(referencia).delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      })
    },
    subirImagen(file, curso, unidad, comentario, profesor)
    {
      // console.log('llega');
      // let file = document.querySelector('input[type=file]').files[0];
      let urlImg = 'examenes/' + this.cadenaAleatoria() + '-' + curso + '-' + unidad + '.jpg'
      let src, referencia
      console.log('subiendo!:' + urlImg);
      this.cambiarEstado('subiendo')
      // console.log(file)
      storageRef.child(urlImg).put(file)
      .then( (snapshot) => {
          console.log(snapshot)
          // this.cambiarEstado('logrado')  
          src = snapshot.downloadURL
          referencia = snapshot.ref.fullPath
          console.log('Uploaded!');
          this.subirExamen(src, comentario, profesor, referencia)
          // alert('Uploaded!');
        })
      .catch( (error) => {
        // alert('No se pudo enviar la imagen')
        this.setMensajes(true, "¡No se subir la imagen, intentelo mas tarde <3!")
        
        this.cambiarEstado('error')  
        console.log('>>>>>>>>>>>error:')
        console.log(error)
      });
    },
    enviarExamen(e)
    {
      // obtener datos del form
      let formData = new FormData(e.target);
      let examen = formData.get("examen")
      let comentario = formData.get("comentario")
      let profesor = formData.get("profesor")
      let examenSnap = this.subirImagen(examen, this.$route.params.id, this.unidadSeleccionada, comentario, profesor)
      // let urlExamen = examenSnap.src
      // console.log('examen:' + examen)
      // console.log('comentario: ' + comentario)
      // console.log('url:' + urlExamen)
      // console.log(file)
      //  let imagen = this.subirImagen(file, formData.get("nombre"), formData.get("tamaño"))

    }
  },
  beforeCreate()
  {
    let curso = this.$route.params.id
    this.$bindAsObject('nombre', dbRefExamenes.child(curso).child('nombre'))
    this.$bindAsObject('unidad1', dbRefExamenes.child(curso).child('1'))
    this.$bindAsObject('unidad1', dbRefExamenes.child(curso).child('1'))
    this.$bindAsObject('unidad2', dbRefExamenes.child(curso).child('2'))
    this.$bindAsObject('unidad3', dbRefExamenes.child(curso).child('3'))
    this.$bindAsObject('susti', dbRefExamenes.child(curso).child('4'))
  },
  mounted()
  {
    this.$refs.botonUnidad1.click()
    // console.log(this.$refs)
  }
}
</script>
