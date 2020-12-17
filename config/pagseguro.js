module.exports = {
    mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
    sandbox: process.env.NODE_ENV === "production" ? false : true,
    sandbox_email: process.env.NODE_ENV === "production" ? null : "17d9MKKF191WDx46",
    email:"rafaeloliveiraduarte@hotmail.com",
    token:"F3513957B45E4935AF3B796E118FDBA0",
    notificationURL: "link do servidor/v1/api/pagamentos/notificacoes"
}