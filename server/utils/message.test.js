var expect  = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () =>{
    it('should generate correct object', () => {
        //tests if generate message method works
        var from  = "Gandh" ;
        var text = "random message" ;
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});
describe('generateLocationMessage', () =>{
    it('should generate current location object', () => {    
        //tests if generate location message method works
        var from = "test"
        var lat = 12
        var long = 11

        var ans = generateLocationMessage(from,lat, long)

        expect(ans.from).toBe(from);
        expect(ans.url).toBe("https://www.google.com/maps?q=12,11")
    });
});