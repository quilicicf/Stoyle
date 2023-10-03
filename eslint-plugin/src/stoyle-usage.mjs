export default {
  meta: {
    messages: {
      noStyles: 'Stoyle is called without specifying styles to apply',
      shouldBeArray: 'Wrong argument, should be an array',
      shouldBeObject: 'Wrong argument, should be an object',
      shouldBeObjectOrUndefined: 'Wrong argument, should be an object or undefined',
      nodesNumberMismatch: 'The number of nodes in the template string does not match the number of styles',
      edgesNumberMismatch: 'The number of nodes in the template string does not match the number of styles',
    },
  },
  create (context) {
    return {
      CallExpression (node) {
        if (node.callee.type !== 'TaggedTemplateExpression') { return; }

        const templateNode = node.callee;
        const methodName = templateNode.tag.name;
        if (!methodName.startsWith('stoyle')) { return; }
        const edgesNumber = templateNode.quasi.quasis.length;
        const nodesNumber = templateNode.quasi.expressions.length;

        const { arguments: args = [] } = node;
        if (args.length < 1) {
          context.report({ node, messageId: 'noStyles' });
          return;
        }

        validateParameterTypes(context, methodName, args[ 0 ]);

        const properties = (args[ 0 ].properties || [])
          .reduce((seed, property) => ({ ...seed, [ property.key.name ]: property.value?.elements || [] }), {});
        if (properties.nodes && properties.nodes.length !== nodesNumber) {
          context.report({ node, messageId: 'nodesNumberMismatch' });
        }
        if (properties.edges && properties.edges.length !== edgesNumber) {
          context.report({ node, messageId: 'edgesNumberMismatch' });
        }
      },
    };
  },
};

function getProperty (objectNode, propertyName) {
  return objectNode.properties
    .find((property) => property.key.name === propertyName)
    ?.value;
}

function isArray (node) {
  return node.type === 'ArrayExpression';
}

function isObject (node) {
  return node.type === 'ObjectExpression';
}

function isUndefined (node) {
  return node.type === 'Identifier' && node.name === 'undefined';
}

function validateParameterTypes (context, methodName, firstArgument) {
  if (methodName === 'stoyleGlobal') {
    if (!isObject(firstArgument) && !isUndefined(firstArgument)) {
      context.report({ node: firstArgument, messageId: 'shouldBeObjectOrUndefined' });
    }
  } else {
    if (!isObject(firstArgument)) {
      context.report({ node: firstArgument, messageId: 'shouldBeObject' });
    } else {
      const nodesNode = getProperty(firstArgument, 'nodes');
      if (!isArray(nodesNode)) {
        context.report({ node: nodesNode, messageId: 'shouldBeArray' });
      }
    }
  }
}
