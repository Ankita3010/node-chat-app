var expect = require('expect');
var expects = require('chai').expect;

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {

    var from = 'Admin';
    var text = 'Hey everyone';
    var res = generateMessage(from, text);

    expects(res.createdAt).to.be.a('number');
    expects(res).to.include({from,text});
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate corrent location object' , () => {
    var from = "Anonymous";
    var latitude = 1;
    var longitude = 1;
    var result = generateLocationMessage(from, latitude,longitude);

    expects(result.createdAt).to.be.a('number');
    expect(result.from).toEqual(from);
    expect(result.url).toEqual('https://www.google.com/maps?q=1,1');
  });
});
