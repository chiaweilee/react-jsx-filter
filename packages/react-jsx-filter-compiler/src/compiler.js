/* eslint-disable no-return-assign,no-void,no-plusplus,default-case,no-cond-assign,no-multi-assign */

const regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;
const validDivisionCharRE = /[\w).+\-_$\]]/;

const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&');
  const close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(`${open}((?:.|\\n)+?)${close}`, 'g');
});

function parseText(text, delimiters = ['{', '}']) {
  const tagRE = buildRegex(delimiters);
  if (!tagRE.test(text)) {
    return;
  }
  const tokens = [];
  const rawTokens = [];
  let lastIndex = (tagRE.lastIndex = 0);
  let match;
  let index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(text.slice(lastIndex, index));
    }
    // tag token
    const exp = parseFilters(match[1].trim());
    tokens.push(exp);
    rawTokens.push(delimiters[0] + exp + delimiters[1]);
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(text.slice(lastIndex));
  }
  return {
    expression: rawTokens.join(''),
    tokens,
  };
}

function parseFilters(exp) {
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c;
  let prev;
  let i;
  let expression;
  let filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5c) {
        inSingle = false;
      }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5c) {
        inDouble = false;
      }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5c) {
        inTemplateString = false;
      }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5c) {
        inRegex = false;
      }
    } else if (
      c === 0x7c && // pipe
      exp.charCodeAt(i + 1) !== 0x7c &&
      exp.charCodeAt(i - 1) !== 0x7c &&
      !curly &&
      !square &&
      !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;
          break; // "
        case 0x27:
          inSingle = true;
          break; // '
        case 0x60:
          inTemplateString = true;
          break; // `
        case 0x28:
          paren++;
          break; // (
        case 0x29:
          paren--;
          break; // )
        case 0x5b:
          square++;
          break; // [
        case 0x5d:
          square--;
          break; // ]
        case 0x7b:
          curly++;
          break; // {
        case 0x7d:
          curly--;
          break; // }
      }
      if (c === 0x2f) {
        // /
        let j = i - 1;
        let p = void 0;
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') {
            break;
          }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression;
}

function wrapFilter(exp, filter) {
  const i = filter.indexOf('(');
  if (i < 0) {
    return `${filter}(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    return `${name}(${exp}${args !== ')' ? `,${args}` : args}`;
  }
}

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

module.exports = parseText;
