/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */

'use client';

import * as d3 from 'd3';
import { createElement, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import SvgImport from '@/utility/svgImport';

function Map() {
  const [svgContent, setSvgContent] = useState('');
  const [dataRooms] = useState(['415b', '415a', '417']);

  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const colors = {
    stroke: isDark ? '#fff' : '#000',
    text: isDark ? '#fff' : '#000',
    fill: isDark ? '#000' : '#fff',
    hover: {
      fill: isDark ? 'rgba(255, 81, 3, 1)' : 'rgba(255, 81, 3, 0.8)',
    } 
  };

  useEffect(() => {
    SvgImport('/locations/4th-floor.svg').then((data) => setSvgContent(data));
  }, []);

  useEffect(() => {
    if (svgContent === '') return;

    const svg = d3.select('svg');
    const g = svg.select('g');

    g.attr('text-anchor', 'middle')
      .attr('font-size', 20)
      .attr('font-weight', '600')
      .attr('font-family', '__Inter_0245cf')
      .attr('cursor', 'pointer');

    svg.selectAll('path[stroke]').attr('stroke', colors.stroke);
    svg.selectAll('path[fill]').attr('fill', colors.fill);

    const rooms = g.selectAll('g').filter(function () {
      return dataRooms.includes(this.getAttribute('class'));
    });

    rooms.on('click', () => {
      console.log('click');
    });

    rooms
      .append('text')
      .attr('fill', colors.text)
      .text(function () {
        const parent = this.parentNode;
        return parent.getAttribute('class');
      })
      .each(function () {
        const parent = d3.select(this.parentNode);
        const path = parent.select('path[fill]');

        // Получение размеров path
        const pathBoundingBox = path.node().getBBox();

        // Вычисление координат для текста (в центре path)
        const textX = pathBoundingBox.x + pathBoundingBox.width / 2;
        const textY = pathBoundingBox.y + pathBoundingBox.height / 2;

        d3.select(this).attr('x', textX).attr('y', textY).attr('dy', '0.35em');
      });

    const getPathFill = (context) => d3.select(context).select('path[fill]');

    rooms
      .on('click', function () {
        getPathFill(this);
      })
      .on('mouseover', function () {
        getPathFill(this).attr('fill', colors.hover.fill);
      })
      .on('mouseout', function () {
        getPathFill(this).attr('fill', colors.fill);
      });
  }, [svgContent]);

  return (
    <div className='w-full h-[100dvh] cursor-grab'>
      <div className='w-full ml-[38rem] mt-64'>
        {createElement('div', {
          dangerouslySetInnerHTML: { __html: svgContent },
        })}
      </div>
    </div>
  );
}

export default Map;
