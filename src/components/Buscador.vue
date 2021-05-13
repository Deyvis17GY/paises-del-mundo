<template>
   <div class="col-md-6 m-auto">
         <input type="text" placeholder="Ingrese Pais"
            class="form-control my-3"
            v-model.trim="texto" @keyup="procesar()">
   </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup(props) {
        const texto = ref('')
        const store = useStore()

        const procesar =async ()=>{
            console.log(texto.value)
            await store.dispatch('filtroNombre',texto.value)
        }

        return {texto,procesar}
    }
}
</script>

<style>

</style>