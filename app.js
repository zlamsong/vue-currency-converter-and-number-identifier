new Vue({
  el: "#app",

  //  vue instance data property
  data: {
    currencies: {},
    
    amount: 0,

    from: 'USD',

    to:'NPR',

    result: 0,

    loading: false
  },

  // object
  mounted() {
    this.getCurrencies();
   
  },

  computed: {
      formattedCurrencies(){
          return Object.values(this.currencies);
      },

      calculateResult(){
          return (Number(this.amount) * this.result).toFixed(3);
      },

      disabled(){
          return this.amount === 0|| !this.amount|| this.loading;
      }
  },


  methods: {
    getCurrencies() {
      const currencies = localStorage.getItem("currenciesData");
      if (currencies) {
        this.currencies = JSON.parse(currencies);
        return;
      }

      axios.get("https://free.currencyconverterapi.com/api/v6/currencies?apiKey=94383acd839ad348189e")
        .then(response => {
          this.currencies = response.data.results;
          localStorage.setItem("currenciesData", JSON.stringify(response.data.results)); //creates folder 'currenciesData' and stores api request's data so that it don't have to make large number if api call
        });
    },

    convertCurrency(){
        
        this.loading = true;

        const key = this.from+"_"+this.to;

        axios.get("https://free.currencyconverterapi.com/api/v6/convert?q="+key+"&compact=ultra&apiKey=94383acd839ad348189e")
        .then(response=>{
            
            this.loading = false;
            // console.log(response);
            this.result = response.data[key]
            
        })
    }
  },

  watch: {
      
    from(){

        this.result = 0;
    },

    to(){

        this.result = 0;
    }
  },
});
