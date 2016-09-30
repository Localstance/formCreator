/**
 * @description
 * FormCreator module that have one main method - create DOM element from the provided form-config JSON
 * @type {{create}}
 */
const FormCreator = (() => {
  /**
   * @description
   * {Public} - It takes form-config and generate node-element according to config.
   * @param formConfig {Object} - form-config JSON
   * @returns {Object} - DOM form-node
   */
  const create = formConfig => {
    const containerElement = document.createElement(formConfig.type);
    containerElement.className = formConfig.name;
    containerElement.setAttribute('title', formConfig.title);

    formConfig.elements.forEach((item) => {
      item.id += '-generated';

      if (item.label) {
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', item.id);
        labelElement.className = item.labelClassName;
        labelElement.innerText = item.label;
        containerElement.appendChild(labelElement);
      }

      const element = document.createElement(item.tagName);
      element.className = item.className;
      element.setAttribute('id', item.id);
      element.setAttribute('type', item.type);
      element.setAttribute('value', item.value);
      element.setAttribute('placeholder', item.placeholder);
      element.textContent = item.textContent || '';

      containerElement.appendChild(element);
    });
    return containerElement;
  };

  return {
    create: create
  };
})();

export default FormCreator;
