export default {
  meta: {
    messages: {
      noStyles: 'Stoyle is called without specifying styles to apply',
      wrongStoyleParameterType: 'Wrong argument passed to stoyle, should be an object',
      wrongStoyleGlobalParameterType: 'Wrong argument passed to stoyleGlobal, should be an object',
      nodesNumberMismatch: 'The number of nodes in the template string does not match the number of styles',
      edgesNumberMismatch: 'The number of nodes in the template string does not match the number of styles',
    },
  },
  create (context) {
    return {
      CallExpression (node) {
        if (node.callee.type !== 'TaggedTemplateExpression') { return true; }

        const templateNode = node.callee;
        if (templateNode.tag.name !== 'stoyle') { return true; }
        const edgesNumber = templateNode.quasi.quasis.length;
        const nodesNumber = templateNode.quasi.expressions.length;

        const { arguments: args = [] } = node;
        if (args.length < 1) {
          context.report({ node, messageId: 'noStyles' });
          return true;
        }

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
