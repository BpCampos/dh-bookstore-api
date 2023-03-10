const axios = require('axios');

const countriesApi = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
})

const methods = {
    getByAlphaCode: async (code) => {
        try {

            const response = await countriesApi.get(`/alpha/${code}`)

            if (response.status !== 200) {
                return response.status(response.status).json({ message: "A requisição não deu certo" })
            }

            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = methods;