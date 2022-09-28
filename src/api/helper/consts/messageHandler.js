

//#region defult messages list controled with type
const messages = [
    { type: 'Success', status: 200, message: 'request was successful' },
    { type: 'unSuccess', status: 500, message: 'request was not successful' },
  
    { type: 'SWR', status: 500, message: 'Somthing went wrong' },
    { type: 'NotArray', status: 500, message: 'Data you send is not an array' },
    { type: 'NotMatch', status: 200, message: 'Incorrect username or password' },
    { type: 'NoProduct', status: 200, message: 'No product found' },
]
//#endregion

//#region return defult messages from message list with type (filter)
const DefultMessage = (type) => {
    return `${messages?.filter(item => item?.type === type)?.map((item) => item?.message)}`
}
//#endregion

//#region  custom messages for (crud) oparation
// example { type: 'Create', model: 'user' }
const CustomMessages = (Data) => {
    if (Data?.type === 'Create') {
        return `${Data?.model} Created successfully`;
    } else if (Data?.type === 'Update') {
        return `${Data?.model} Updated successfully`;
    } else if (Data?.type === 'Delete') {
        return `${Data?.model} Deleted successfully`;
    } else if (Data?.type === 'Exiest') {
        return `${Data?.model} already exists`;
    } else if (Data?.type === 'Notxiest') {
        return `${Data?.model} doesn't exist`;
    } else if (Data?.type === 'Max') {
        return `characters is more than ${Data?.model}`;
    } else if (Data?.type === 'Min') {
        return `characters is less than ${Data?.model}`;
    }
}
//#endregion

//#region InputMessage
// example => { type: 'Requierd', input: 'User' }
// types => 'Required','NotValid','IsEmpty'
const InputMessage = (Data) => {
    if (!Data?.type || !Data?.input) {
        return `WRONG DTO - InputMessage - ( type: ${Data?.type} - input: ${Data?.input} )`
    } else {
        if (Data?.type === 'Required') {
            return `${Data?.input} is Requierd`;
        } else if (Data?.type === 'NotValid') {
            return `${Data?.model} is Not Valid`;
        } else if (Data?.type === 'IsEmpty') {
            return `${Data?.model} Is Empty`;
        } else {
            return `WRONG DTO - InputMessage - ( type: ${Data?.type} - input: ${Data?.input} )`
        }
    }
}
//#endregion

//#region Send Response Message + Data
const responseHandler = (req, res) => {
    if (req?.status === 200) {
        res.status(200)
        res.json({
            "data": req.data,
            "isSuccess": true,
            "message": req?.message
        })
    } else {
        res.status(200)
        res.json({
            "isSuccess": false,
            "message": req?.message
        })
    }
}
//#endregion

module.exports = {
    responseHandler,
    DefultMessage,
    CustomMessages,
    InputMessage,
}