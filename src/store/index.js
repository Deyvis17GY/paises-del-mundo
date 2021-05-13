import { createStore } from 'vuex'

export default createStore({
  state: {
    paises:[],
    paisesFiltrados:[]
  },
  mutations: {
    setPaises(state,payload){
      state.paises = payload
    },
    setPaisesFiltrado(state,payload){
    state.paisesFiltrados = payload
    }
  },
  actions: {
    async getPaises({commit}){
      try {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const data = await res.json()
        commit('setPaises',data)

      } catch (error) {
        console.log(error);
      }
    },

    filtrarRegion({commit,state},region){
      const filtro = state.paises.filter(pais => pais.region.includes(region))
      commit('setPaisesFiltrado',filtro)
    },

    filtroNombre({commit,state},texto){
      const textoCliente = texto.toLowerCase()
      const filtro = state.paises.filter(pais => {
        const textoApi = pais.name.toLowerCase()
        if(textoApi.startsWith(textoCliente)){
          return pais
        }
      })
      commit('setPaisesFiltrado',filtro)
    }

  },
  getters:{
    topPaisesPoblacion(state){
      return state.paisesFiltrados.sort((a,b) => {
           return a.population < b.population ? 1 : -1
      })
    },
    
  },
  modules: {
  }
})
