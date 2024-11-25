const getBMIRange = (bmi) => {
  let bmiRange = '';
  if (bmi < 18.5) {
    bmiRange = 'Índice: Tu peso es considerado bajo';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiRange = 'Índice: Tu peso es considerado normal';
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiRange = 'Índice: Tu peso es considerado arriba de lo normal';
  } else if (bmi >= 30) {
    bmiRange = 'Índice: Tu peso es considerado como obesidad';
  }

  return bmiRange;
};

const getBMI = (hideLabel, {weight, height, savedBMI}, hideRange) => {
  let bmi;
  if (savedBMI) {
    bmi = savedBMI;
  } else {
    if (!weight || !height) {
      return 'Ingresa tu peso y estatura para obtener tu IMC (BMI por sus siglas en inglés)';
    }

    height = parseFloat(height);
    if (height < 3) {
      height = height * 100;
    }

    height = parseFloat(height / 100);
    weight = parseFloat(weight);
    bmi = (weight / Math.pow(height, 2)).toFixed(2);
  }

  return `${!hideLabel ? 'IMC: ' : ''} ${bmi} ${!hideRange ? getBMIRange(bmi) : ''}`;

};


module.exports = getBMI;
