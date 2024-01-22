const SvgImport = (svgPath) =>
  fetch(svgPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .catch((err) => {
      throw new Error(`Ошибка загрузки SVG-файла: ${err}`);
    });

export default SvgImport;
