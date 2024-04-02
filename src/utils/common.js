export const getDemographicColor = (demographic) => {
  const demographicInitial = demographic?.charAt(0);
  const colors = {
    W: 'var(--flame-orange-color)',
    M: 'var(--yale-blue-color)',
    default: 'var(--selective-yellow-color)'
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
