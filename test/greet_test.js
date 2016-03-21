const expect = require('chai').expect;
const greet = require('../lib/greet');

describe('greet()', () => {
  it('handles all arguments at once', () => {
    expect(greet('Hi there', 'you')).to.equal('Hi there, you!');
  });

  it('handles arguments separately', () => {
    const curried = greet('Yo');

    expect(curried).to.be.a('function');

    expect(curried('you')).to.equal('Yo, you!');
    expect(curried('friend')).to.equal('Yo, friend!');
  });
});
