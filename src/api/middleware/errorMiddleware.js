
// mrx : custome error handler Start ----------------------------------------------------------------
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        isSuccess: false,
        message: err.message
    })
}
// mrx : End ----------------------------------------------------------------------------------------


module.exports = {
    errorHandler,
}