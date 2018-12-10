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
  namespaced: true,
  state: {
    products: [{
      id: '1',
      title: 'Comouflage Parka',
      vendor: 'Inflation HK',
      colors: ['darkgreen'],
      type: 'Coat&Jacket',
      description: 'Зимняя хлопковая комуфляжная парка',
      price: 21000,
      promo: false,
      imageSrc: 'https://ae01.alicdn.com/kf/HTB1W0AgXOrxK1RkHFCcq6AQCVXaF/2018.jpg'
    },
    {
      id: '2',
      title: 'Letter Sleeve Hoodies',
      vendor: 'Inflation HK',
      colors: ['deepskyblue'],
      type: 'Hoodies',
      description: 'Уличный лоскутный свитер, с белым капюшоном',
      price: 12500,
      promo: false,
      imageSrc: 'https://ae01.alicdn.com/kf/HTB13G3mJKuSBuNjSsziq6zq8pXa8/2018.jpg_640x640.jpg'
    },
    {
      id: '3',
      title: 'Drawstring Ankle Strap Pants',
      vendor: 'Inflation HK',
      colors: ['Black', 'Grey', 'Purple'],
      type: 'Bottoms',
      description: 'Уличные брюки-ветровки.',
      price: 11500,
      promo: false,
      imageSrc: 'https://ae01.alicdn.com/kf/HTB1tx4sXcTxK1Rjy0Fgq6yovpXat.jpg'
    },
    {
      id: '4',
      title: 'Freedom Shirt',
      vendor: 'Inflation HK',
      colors: ['Black'],
      type: 'Shirt&Sweater',
      description: 'Уличная рубашка "Refuse Freedom"',
      price: 9000,
      promo: false,
      imageSrc: 'https://ae01.alicdn.com/kf/HTB1YuvalqAoBKNjSZSyq6yHAVXaS/2018-FW-Reflctive.jpg'
    },
    {
      id: '5',
      title: 'Leaf Sleeve Hoodies',
      vendor: 'Inflation HK',
      colors: ['Black'],
      type: 'Hoodies',
      description: 'Уличный худи Sleeve Graphic Printed Fleece Hoodies',
      price: 12000,
      promo: false,
      imageSrc: 'https://ae01.alicdn.com/kf/HTB1bR4vB3KTBuNkSne1q6yJoXXaY/-.jpg'
    },
    {
      id: '6',
      title: 'Down Jacket',
      vendor: 'Inflation HK',
      colors: ['darkgrey', 'Yellow', 'Purple', 'Black'],
      type: 'Coat&Jacket',
      description: 'Зимняя куртка с высококачественным хлопковой тканью',
      price: 19000,
      promo: false,
      imageSrc: 'https://ae01.alicdn.com/kf/HTB1UXIGXOLrK1Rjy1zdq6ynnpXaw/INFLATION-2018-Winter-Jackets-Coat-Fashion-High-Quality-Cotton-Padded-Windproof-Thick-Warm-Soft-Brand-Clothing.jpg'
    }
    ]
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
    myProducts (state) {
      return state.products
    },
    productById (state) {
      return (productId) => {
        console.log(productId)
        return state.products.find(product => product.id === productId)
      }
    }
  },
  mutations: {
    createProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = state.products.concat(payload)
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
    async createProduct ({ commit, rootGetters }, payload) {
      commit('clearError', null, {root: true})
      commit('setLoading', true, {root: true})
      const image = payload.image
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.colors,
          payload.type,
          payload.price,
          payload.description,
          rootGetters.user.id,
          '',
          payload.promo
        )
        const product = await fb.database().ref('products').push(newProduct)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref(`products/${product.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref('products').child(product.key).update({ imageSrc })
        commit('setLoading', false, {root: true})
        commit('createProduct', {
          ...newProduct,
          id: product.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message, {root: true})
        commit('setLoading', false, {root: true})
        throw error
      }
    },
    async fetchProducts ({commit}) {
      commit('clearError', null, {root: true})
      commit('setLoading', true, {root: true})
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
          commit('setLoading', false, {root: true})
        })
      } catch (error) {
        commit('setError', error.message, {root: true})
        commit('setLoading', false, {root: true})
        throw error
      }
    },
    async updateProduct ({commit}, {title, description, id}) {
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })
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
        commit('setLoading', false, { root: true })
      } catch (error) {
        commit('setError', error, { root: true })
        commit('setLoading', false, { root: true })
        throw error
      }
    }
  }

}
