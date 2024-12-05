import './Component.css';
import React, { useState } from 'react';

const Conversion = () => {
  const [conversionType, setConversionType] = useState('km-milles');
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [savedConversions, setSavedConversions] = useState([]);
  
  // Función para convertir las unidades
  const convert = (value, type) => {
    let result = 0;
    switch (type) {
        // Por cada tipo de conversión se aplica la operación necesaria
      case 'km-milles':
        result = value * 0.621371;
        break;
      case 'milles-km':
        result = value / 0.621371;
        break;
      case 'feet-metres':
        result = value * 0.3048;
        break;
      case 'metres-feet':
        result = value / 0.3048;
        break;
      case 'cm-inches':
        result = value / 2.54;
        break;
      case 'inches-cm':
        result = value * 2.54;
        break;
      default:
        result = 0;
    }
    return result.toFixed(2); // Devuelve el resultado redondeado a dos decimales
  };

  // Selección del tipo de conversión
  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
    setResultValue(convert(inputValue, e.target.value)); // Actualiza el resultado con el tipo de conversión seleccionado
  };

  // Cambio del input y actualización del resultado de forma instantánea
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setResultValue(convert(value, conversionType));
  };

  // Intercambio de valores del input y el resultado
  const handleSwap = () => {
    setInputValue(resultValue);
    setResultValue(inputValue);
  };

  // Guarda la conversión en la lista
  const handleSave = () => {
    setSavedConversions([...savedConversions, { input: inputValue, result: resultValue, type: conversionType }]);
    setInputValue('');
    setResultValue('');
  };

  // Elimina una conversión guardada en la lista
  const handleDeleteConversion = (index) => {
    const newConversions = savedConversions.filter((_, i) => i !== index);
    setSavedConversions(newConversions);
  };

  // Creación de lo que se verá en la aplicación

  return (
    <div className="conversion">
      <h1 className='texth1'>convert</h1>
      <div className='selectType'> 
        <select id="conversionType" value={conversionType} onChange={handleConversionTypeChange}>
          <option value="km-milles">km &#10132; miles</option>
          <option value="milles-km">miles &#10132; km</option>
          <option value="feet-metres">feet &#10132; metres</option>
          <option value="metres-feet">metres &#10132; feet</option>
          <option value="cm-inches">cm &#10132; inches</option>
          <option value="inches-cm">inches &#10132; cm</option>
        </select>
      </div>

      <div className='amount'>
        <input
          type="number"
          id="inputValue"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className='result'>
        <p>{resultValue}</p>
      </div>

      <div className='swap'>
        <button onClick={handleSwap}>
          <span>&#8646;</span>
        </button>
      </div>
      <div className='save'>  
        <button onClick={handleSave}>
          <span>&#9825;</span>
        </button>
      </div>

      <div className='saved'>
        <h3>saved</h3>
        <ul>
          {savedConversions.map((conv, index) => (
            <li key={index}>
              {conv.input} → {conv.result} ({conv.type})
              <button onClick={() => handleDeleteConversion(index)}>
              &#120; 
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Conversion;
