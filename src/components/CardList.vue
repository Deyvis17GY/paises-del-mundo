<template>
  <div class="fila">
        <div class="pais-list" v-for="pais in paises" :key="pais.name">
              <Card :pais="pais"/>
        </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import { computed, onMounted } from 'vue'
import {useStore} from 'vuex'
export default {
    components:{
        Card
    },

    setup(props) {
        const store = useStore()
        
        const paises = computed(()=>{
            return store.getters.topPaisesPoblacion
        })
       
        onMounted(async() => {
            await store.dispatch('getPaises')//dispatch para acceder a las acciones
            await store.dispatch('filtrarRegion','Americas')
        })
 
        return {paises}
    }
}
</script>

<style>
.fila{
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3,1fr);
}
.pais-list{
    width: 90%;
    margin: auto;
    max-width: 90%;
    min-width: 90%;
}

@media (max-width:800px){
    .fila{
        grid-template-columns: repeat(1,1fr);
    }
}
</style>