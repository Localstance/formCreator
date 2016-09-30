/**
 * @description
 * FormGenerator module. Have one main public method 'generateJSON' that returns json object from provided html-form.
 * @type {{generateJSON}}
 */
const FormGenerator = (() => {
  let formNode;
  let formElements = [];
  let formLabels = [];


  /**
   * @description
   * {Private} - Helper function for generating unique GUID.
   * @returns {String} - guid
   */
  const generateGuid = () => {
    const part = i => {
      const p = (Math.random().toString(16) + '000000000').substr(2, 8);
      return i ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    };
    return part() + part(true) + part(true) + part();
  };


  /**
   * @description
   * {Private} - Main engine of module - it creates JSON-config from the provided elements.
   * @param elms {Array} - form elements
   * @returns {Object} - from-config
   */
  const buildJSON = elms => {
    const formConfig = {};
    formConfig.formId = generateGuid();
    formConfig.elements = [];
    formConfig.creationDate = new Date().toISOString();
    formConfig.name = formNode.className;
    formConfig.type = 'form';
    formConfig.title = formNode.title;

    elms.forEach((item) => {
      if (item.tagName !== 'LABEL') {
        const elmObj = {
          tagName: item.tagName.toLowerCase(),
          id: item.id || '',
          type: item.type || 'text',
          className: item.className || '',
          value: item.value || '',
          placeholder: item.placeholder || ''
        };

        formLabels.forEach((label) => {
          if (label.getAttribute('for') === item.id) {
            elmObj.label = label.textContent;
            elmObj.labelClassName = label.className;
          }
        });

        if (item.tagName === 'BUTTON') {
          elmObj.textContent = item.textContent;
        }

        formConfig.elements.push(elmObj);
      }
    });
    return formConfig;
  };


  /**
   * @description
   * {Public} - function that find provided form element and returns generated JSON form-config
   * @param formClass {String} - form class name
   * @returns {Object} - form-config
   */
  const generate = formClass => {
    formNode = document.querySelector(formClass);
    formElements = Array.from(formNode.children);
    formLabels = Array.from(document.querySelectorAll(formClass + ' label'));
    return buildJSON(formElements);
  };

  return {
    generateJSON: generate
  };
})();

export default FormGenerator;
