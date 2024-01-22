'use client'

import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import SvgImport from '@/utility/svgImport';
 

function Map() {
  const [svgContent, setSvgContent] = useState('');
  const [dataRooms, setDataRooms] = useState([
    '415b', '415a', '417'
  ]);


  useEffect(() => {
    SvgImport('/locations/4th-floor.svg').then(data => setSvgContent(data));
  }, []);

  useEffect(() => {
    if(svgContent === '') return;

    const svg = d3.select('svg');
    const g = svg.select('g');

    g
    .attr('text-anchor', 'middle')
    .attr('font-size', 18)
    .attr('font-weight', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('cursor', 'pointer')

    const rooms = g
      .selectAll('g')
      .filter(function (d) {
        return dataRooms.includes(this.getAttribute('class'));
      });

    
    rooms.on('click', () => {console.log('click')})


    rooms
      .append('text')
      .attr('fill', '#000')
      .text(function(d) {
        let parent = this.parentNode;
        return parent.getAttribute('class');
      })
      .each(function (d) {
          let parent = d3.select(this.parentNode);
          let path = parent.select('path[fill]');

          // Получение размеров path
          const pathBoundingBox = path.node().getBBox();
              
          // Вычисление координат для текста (в центре path)
          const textX = pathBoundingBox.x + pathBoundingBox.width / 2;
          const textY = pathBoundingBox.y + pathBoundingBox.height / 2;
          
          d3
          .select(this)
          .attr('x', textX)
          .attr('y', textY)
          .attr('dy', '0.35em');
      })

      const getPathFill = (context) => d3.select(context).select('path[fill]');

      rooms
        .on('click', function (event, d) {
          getPathFill(this)

        })
        .on('mouseover', function(d) {
          getPathFill(this)
            .attr('fill', '#afd');
        })
        .on('mouseout', function(d) {
          getPathFill(this)
            .attr('fill', '#fff');
        })

  }, [svgContent]);

  return (
  <div className='w-full h-[100dvh] cursor-grab'
    dangerouslySetInnerHTML={{__html: svgContent}}
  />
  );
}

export default Map;
