/**
 * @name getDemographicColor
 * @description Take 1st char of Demographic and get the color for it
 * @param {string} demographic The input string.
 * @returns {style} Color code for the demographic
 */
export const getDemographicColor = (demographic) => {
  const demographicInitial = demographic?.charAt(0);
  const colors = {
    W: 'var(--flame-orange-color)',
    M: 'var(--yale-blue-color)',
    K: 'var(--selective-yellow-color)',
    P: 'var(--forest-green-color)',
    default: 'var(--mulberry-color)'
  };

  return colors[demographicInitial] || colors.default;
};

/**
 * @name getFirstCharacter
 * @description Returns the first character of a string.
 * @param {string} str The input string.
 * @returns {string} The first character of the input string,
 *                    or an empty string if the input is null or empty.
 */
export const getFirstCharacter = (str) => (str ? str.charAt(0) : '');

/**
 * @name parseColorCodeAndName
 * @description returns colorCode and colorName
 * @param {*} colorCodeWithName string of colorCode & colorName delimited by |
 * @returns {object} ColorHexCode and ColorName as an object
 */
export const parseColorCodeAndName = (colorCodeWithName) => {
  if (!colorCodeWithName) {
    return {};
  }
  const [colorCode, colorName] = colorCodeWithName.split('|');
  return { colorCode, colorName };
};

export const getInputType = (type) => {
  switch (type) {
    case 'password':
      return 'password';
    case 'number':
      return 'number';
    case 'email':
    default:
      return 'text';
  }
};
