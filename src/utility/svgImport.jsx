const SvgImport = (svgPath) => {
    return fetch(svgPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .catch(err => {
        console.error('Ошибка загрузки SVG-файла:', err);
      });
  };
  
  export default SvgImport;
  