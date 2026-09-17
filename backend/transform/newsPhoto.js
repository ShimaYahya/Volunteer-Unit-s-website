const newTransformer = (onenew) => {
    onenew.photo = `${process.env.URL + process.env.UPLOADS + onenew.photo}`
    return onenew
}
const newsTransformer = (ArrayOfnews) => {
    return ArrayOfnews.map((singlenew) => newTransformer(singlenew))
}
module.exports = {
    newTransformer,
    newsTransformer
}