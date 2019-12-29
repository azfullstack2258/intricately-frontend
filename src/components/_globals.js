import Vue from 'vue';
import _upperFirst from 'lodash/upperFirst';
import _camelCase from 'lodash/camelCase';

const requireComponent = require.context(
  'Components/shared',
  false,
  /Base[\w-]+\.vue$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = _upperFirst(
    _camelCase(
      fileName.replace(/\.\w+$/, '')
    )
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});
