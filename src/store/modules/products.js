import * as fb from 'firebase'

class Product {
  constructor (title, vendor, colors, type, price, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.vendor = vendor
    this.colors = colors
    this.type = type
    this.price = price
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    products: []
  },
  getters: {
    products (state) {
      return state.products
    },
    promoProducts (state) {
      return state.products.filter(product => {
        return product.promo
      })
    },
    myProducts (state, getters) {
      if (getters.user === null) {
        return state.products
      }
      return state.products.filter(product => {
        return product.ownerId === getters.user.id
      })
    },
    productById (state) {
      return (productId) => {
        return state.products.find(product => product.id === productId)
      }
    }
  },
  mutations: {
    createProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = payload
    },
    updateProduct (state, {title, description, id}) {
      const product = state.products.find(a => {
        return a.id === id
      })
      product.title = title
      product.description = description
    }
  },
  actions: {
    async createProduct ({ commit, getters }, payload) {
      commit('clearError', null)
      commit('setLoading', true)
      const image = payload.image
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.colors,
          payload.type,
          payload.price,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        const product = await fb.database().ref('products').push(newProduct)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref(`products/${product.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref('products').child(product.key).update({ imageSrc })
        commit('setLoading', false)
        commit('createProduct', {
          ...newProduct,
          id: product.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchProducts ({commit}) {
      commit('clearError', null)
      commit('setLoading', true)
      const resultProducts = []
      try {
        const productsVal = await fb.database().ref('products').once('value')
        const products = productsVal.val()
        Object.keys(products).forEach(key => {
          const product = products[key]
          resultProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.colors,
              product.type,
              product.price,
              product.description,
              product.ownerId,
              product.imageSrc,
              product.promo,
              key
            )
          )
          commit('loadProducts', resultProducts)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateProduct ({commit}, {title, description, id}) {
      commit('clearError', null)
      commit('setLoading', true)
      try {
        await fb.database().ref('products').child(id).update({
          title,
          description
        })
        commit('updateProduct', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    }
  }

}
