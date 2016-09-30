import FormGenerator from './../modules/FormGenerator';
import FormCreator from './../modules/FormCreator';


/**
 * @description
 * App-controller. It have main init method that initialize listeners to the application.
 * Also it have two additional public methods - drawForm from config-json and drawGeneratedJSON (from initial markup)
 * @type {{init, drawJSON, drawForm}}
 */
const App = (() => {
  const outputContainer = document.querySelector('.output__container');
  const generatedFormContainer = document.querySelector('.generated-form__form')
  const generatedFormTitle = document.querySelector('.generated-form .output__title');
  const generateBtn = document.querySelector('.controls__generate');
  let formConfig = {};


  /**
   * @description
   * {Public} - This method gets generated json file and show it on UI (output container)
   * @param object {Object} - JSON-config file
   */
  const drawGeneratedJSON = object => {
    outputContainer.innerHTML = JSON.stringify(object);
  };


  /**
   * @description
   * {Public} - This method gets json-config and pass it to FormCreator module that returns generated HTML-form element
   * Then it renders form on UI in predefined container.
   * @param formConfig
   */
  const drawForm = formConfig => {
    const generatedForm = FormCreator.create(formConfig);
    generatedFormContainer.innerHTML = '';
    generatedFormTitle.classList.remove('hidden');
    generatedFormContainer.appendChild(generatedForm);
  };


  /**
   * @description
   * {Public} - Entry point of application. It adds listener on generate-button and calls FormGenerator module to create
   * config file from provided form (by passing className)
   */
  function init() {
    generateBtn.addEventListener('click', () => {
      formConfig = FormGenerator.generateJSON('.login__form');
      drawGeneratedJSON(formConfig);
      drawForm(formConfig);
    });
  }

  return {
    init: init,
    drawJSON: drawGeneratedJSON,
    drawForm: drawForm
  };
})();

export default App;
