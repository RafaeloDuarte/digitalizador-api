function dateFormatHelper(d) {

    const day = d.getDay()
    const month = d.getMonth()
    const year = d.getFullYear()

    return `${day}/${month}/${year}`

}

module.exports = dateFormatHelper