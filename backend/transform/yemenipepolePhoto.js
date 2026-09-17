const yemenipersonTransformer = (yemeniperson) => {
    yemeniperson.photo = `${process.env.URL + process.env.UPLOADS + yemeniperson.photo}`
    return yemeniperson
}
const yemenipepoleTransformer = (ArrayOfyemenipepole) => {
    return ArrayOfyemenipepole.map((singleyemenipepole) => yemenipersonTransformer(singleyemenipepole))
}
module.exports = {
    yemenipersonTransformer,
    yemenipepoleTransformer
}