/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */

'use client';

import * as d3 from 'd3';
import { createElement, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import SvgImport from '@/utility/svgImport';
import { useStore } from '@/store/store';

function Map() {
  const [svgContent, setSvgContent] = useState('');

  const { theme, resolvedTheme } = useTheme();
  const { databaseStore } = useStore();

  useEffect(() => {
    SvgImport('/locations/4th-floor.svg').then((data) => setSvgContent(data));
  }, []);

  useEffect(() => {
    if (svgContent === '') return;

    const isDark = resolvedTheme === 'dark';

    const colors = {
      stroke: isDark ? '#fff' : '#000',
      text: isDark ? '#fff' : '#000',
      fill: isDark ? '#000' : '#fff',
      hover: {
        fill: isDark ? 'rgba(255, 81, 3, 1)' : 'rgba(255, 81, 3, 0.8)',
      } 
    };

    console.log({theme, resolvedTheme, isDark, colors});

    const svg = d3.select('svg');
    const g = svg.select('g');

    g.attr('text-anchor', 'middle')
      .attr('font-size', 20)
      .attr('font-weight', '600')
      .attr('font-family', '__Inter_0245cf')
      .attr('cursor', 'pointer');

    svg.selectAll('path[stroke]').attr('stroke', colors.stroke);
    svg.selectAll('path[fill]').attr('fill', colors.fill);

    const roomNames = databaseStore.getRooms().map(i => i.name);
    
    const rooms = g.selectAll('g').filter(function () {
      return roomNames.includes(this.getAttribute('class'));
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
        const room = databaseStore
          .getRooms()
          .find(r => r.name === this.getAttribute('class'));
        
        const roomItems = databaseStore
          .getItems()
          .filter(item => item.roomId === room.id);
        
        console.log({room, roomItems});
        // menuStore.setActiveTab(null);
      })
      .on('mouseover', function () {
        getPathFill(this)
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('fill', colors.hover.fill);
      })
      .on('mouseout', function () {
        getPathFill(this)
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('fill', colors.fill);
      });
  }, [svgContent, theme]);

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
