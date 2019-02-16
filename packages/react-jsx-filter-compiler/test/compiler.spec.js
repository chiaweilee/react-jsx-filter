const compiler = require('../src/compiler');
const { expect } = require('chai');

describe('test react-jsx-filter-compiler', () => {
  it('should parse react jsx filter correctly', () => {
    expect(compiler('<div>{ a | b }</div>').expression).to.equal('<div>{b(a)}</div>');
    expect(compiler('<div>{ a | b | c }</div>').expression).to.equal('<div>{c(b(a))}</div>');
    expect(compiler('<div>{ x(a) | b | c }</div>').expression).to.equal('<div>{c(b(x(a)))}</div>');
    expect(compiler('<div>{ a | b(c) }</div>').expression).to.equal('<div>{b(a,c)}</div>');
    expect(compiler('<div>{ a | b(c) | d }</div>').expression).to.equal('<div>{d(b(a,c))}</div>');
    expect(compiler('<div>{ a | this.b | this.c }</div>').expression).to.equal('<div>{this.c(this.b(a))}</div>');
  });
});
