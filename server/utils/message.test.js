var expect = require('expect');
var expects = require('chai').expect;

var {generateMessage} = require('./message');

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
