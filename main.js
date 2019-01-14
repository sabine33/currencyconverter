const url = "https://ratesapi.io/api/latest";
new Vue({
    el: "#app",
    data: {
        from: "USD",
        to: "NPR",
        amount: 0,
        exchange_rates: [],
        date: "",
        base: "",
        isLoaded: false
    },
    computed: {
        result() {
            if (!this.isLoaded || this.from == undefined || this.to == undefined || this.amount < 0 || this.amount == undefined) return "NaN"
            return ((this.exchange_rates[this.to] / this.exchange_rates[this.from]) * Number(this.amount)).toFixed(2);
        }
    },
    mounted() {
        axios
            .get(url)
            .then(response => {

                this.date = response.data.date;
                this.base = response.data.base;
                this.exchange_rates = response.data.rates;
                //user defined rate
                this.update();
                this.isLoaded = true;

            }).catch(error => {
                alert(error);
                this.isLoaded = false
            });
    },
    methods: {
        update() {
            this.exchange_rates['NPR'] = this.exchange_rates['INR'] * 1.6;
            this.exchange_rates['EUR'] = 1;
        }
    }
});