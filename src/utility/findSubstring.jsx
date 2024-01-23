/* 
    searchValue - строка поиска
*/
const findSubstring = (searchValue, list, paramName, isWave = false) => {
  if (!paramName || !searchValue || !list.length || !(paramName in list[0]))
    return [];

  return list
    .filter((elem) => {
      const elemParamValue = elem[paramName].toString().toLowerCase();

      if (searchValue.length > elemParamValue.length) return false;
      if (searchValue === elemParamValue.substring(0, searchValue.length))
        return true;

      if (isWave && elemParamValue.includes(searchValue)) return true;

      return false;
    })
    .map((item) => ('roomId' in item ? item.roomId : item.id));
};

export default findSubstring;
