const { expect } = require('chai');
const { transform } = require('babel-core');

const test = (code, target) => transform(
  code,
  {
    plugins: [require.resolve('../src/index.js')],
  },
  (err, result) => {
    expect(err).to.equal(null);
    expect(result.code).to.equal(target);
  }
);

describe('test babel-plugin-transform-react-jsx-filter', () => {
  it('should parse react jsx filter correctly', () => {
    test('<div>{ \'hello\' | a }</div>', '<div>{a(\'hello\')}</div>;');
    test('<div>{ \'hello\' | a() }</div>', '<div>{a(\'hello\')}</div>;');
    test('<div>{ \'hello\' | a(1) }</div>', '<div>{a(\'hello\', 1)}</div>;');
    test('<div>{ \'hello\' | a(1, b) }</div>', '<div>{a(\'hello\', 1, b)}</div>;');
    test('<div>{ \'hello\' | a(1, b, \'c\') }</div>', '<div>{a(\'hello\', 1, b, \'c\')}</div>;');

    test('<div>{ \'hello\' | a | b}</div>', '<div>{b(a(\'hello\'))}</div>;');
    test('<div>{ \'hello\' | a() | b() }</div>', '<div>{b(a(\'hello\'))}</div>;');
    test('<div>{ \'hello\' | a(1) | b(2) }</div>', '<div>{b(a(\'hello\', 1), 2)}</div>;');
    test('<div>{ \'hello\' | a(1, b) | c(2, d) }</div>', '<div>{c(a(\'hello\', 1, b), 2, d)}</div>;');
    test('<div>{ \'hello\' | a(1, b, \'c\') | d(2, e, \'f\') }</div>', '<div>{d(a(\'hello\', 1, b, \'c\'), 2, e, \'f\')}</div>;');

    test('<div>{ \'hello\' | a | b() | c(1) | d | e(\'\') | f }</div>', '<div>{f(e(d(c(b(a(\'hello\')), 1)), \'\'))}</div>;');
  });
});

