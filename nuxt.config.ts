// https://nuxt.com/docs/api/configuration/nuxt-config
// import en from './data/en.json'
// import fr from './data/fr.json'
export default defineNuxtConfig({
    routeRules:{
    
    },
    app:{
        head:{
            charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Multikart Ecommerce | Vuejs shopping theme',
      meta: [        
        { name: 'description', content: 'My amazing site.' }
      ],
            script:[
                {src: 'https://www.paypal.com/sdk/js?client-id=test&currency=USD'},
                {src: 'https://checkout.stripe.com/checkout.js'},
              
            ],
         
        },
     
    },
  
css: ["@/assets/scss/app.scss"],

modules: [
    'nuxt-icon',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    // 'vue-toastification/nuxt',
    [
    "@pinia/nuxt",
    {
    autoImports: ["defineStore", "acceptHMRUpdate"],
    },
    ],

    
],
    plugins: [
        
        // {src: '~/node_modules/bootstrap/dist/js/bootstrap.js', mode: 'client'}
        {src: './plugins/useBootstrap.client.ts', mode: 'client'},
        {src: './plugins/showToast.client.js', mode: 'client'},
        // { src: './plugins/paypal.client.js' }
        // { src: 'https://checkout.stripe.com/checkout.js'}    
       ],
    
    //    build: { vendor: 'vue-paypal-checkout'}, 

})
