/* eslint-disable no-param-reassign */

module.exports = ({ types: t }) => {
  function approach(expression) {
    function iterator(expr) {
      if (!expr.right && !expr.left) {
        // approaching minimum
        return expr;
      }

      // continue
      const { left, right } = expr;
      switch (right.type) {
        case 'CallExpression':
          if (right.left) {
            if (!right.arguments) {
              right.arguments = [];
            }
            right.arguments.unshift(iterator(right.left));
            return right;
          }
          // approaching minimum
          const argv = right.arguments;
          argv.unshift(iterator(left));
          return t.callExpression(
            t.identifier(right.callee.name),
            argv
          );

        case 'Identifier':
          return t.callExpression(
            t.identifier(right.name),
            [iterator(left)]
          );
        default:
          console.warn(`unknow type of ${right.type}`);
      }
    }

    return iterator(expression);
  }

  const nestedVisitor = {
    JSXOpeningElement(node) {
      node.container.children = node.container.children.map(child => {
        if (
          t.isJSXExpressionContainer(child) &&
          child.expression.operator === '|'
        ) {
          return t.JSXExpressionContainer(
            approach(child.expression)
          );
        }

        return child;
      });

      node.replaceWith(node);
    },
  };

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement(path) {
        path.traverse(nestedVisitor);
      },
    },
  };
};
