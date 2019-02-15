const compiler = require('../packages/react-filter-compiler/src/compiler');
const { expect } = require('chai');

describe('test react-filter-compiler', () => {
  it('should parse filter correctly', () => {
    expect(compiler('<div>{ a | b }</div>').expression).to.equal('<div>{b(a)}</div>');
    expect(compiler('<div>{ a | b | c }</div>').expression).to.equal('<div>{c(b(a))}</div>');
    expect(compiler('<div>{ x(a) | b | c }</div>').expression).to.equal('<div>{c(b(x(a)))}</div>');
    expect(compiler('<div>{ a | b(c) }</div>').expression).to.equal('<div>{b(a,c)}</div>');
    expect(compiler('<div>{ a | b(c) | d }</div>').expression).to.equal('<div>{d(b(a,c))}</div>');
  });
});
