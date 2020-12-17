module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "DECFVGBHNJMKMJNHBGVF.DXCVBHJKLKIJUYTREWE456789OLKMNBVFDERT67.8IKJHBGFDRE5T67UIKJNHG",
    api: process.env.NODE_ENV === "production" ? "https://ron-api.herokuapp.com/" : "http://localhost:8000",
    loja: process.env.NODE_ENV === "production" ? "https://rafaeloduarte.github.io/ron-dash/" : "http://localhost:3000"
};