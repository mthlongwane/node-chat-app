var moment =  require("moment");

var generateMessage =((from,text) => {
    return{
        from,
        text,
        createdAt: moment().local().valueOf()
    }
})

var generateLocationMessage =((from,lat, long) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt:  moment().local().valueOf()
    }
})
module.exports = {generateMessage,generateLocationMessage};