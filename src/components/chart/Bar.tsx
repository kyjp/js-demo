import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Data {
  name: string;
  value: number;
}

const data: Data[] = [
  { name: 'A', value: 30 },
  { name: 'B', value: 80 },
  { name: 'C', value: 45 },
  { name: 'D', value: 60 },
  { name: 'E', value: 20 },
  { name: 'F', value: 90 },
  { name: 'G', value: 55 },
];

const BarChart: React.FC = () => {
  const svgRef: any = useRef<SVGSVGElement>(null);
  const resizeHandler = useRef<() => void>(() => {});

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const parentWidth = () => svgRef.current.parentElement?.clientWidth || 600;
    const parentHeight = () => parentWidth() * 0.5; // アスペクト比を維持
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = () => parentWidth() - margin.left - margin.right;
    const height = () => parentHeight() - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width()])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([height(), 0]);

    const xAxis = (g: any) =>
      g.attr('transform', `translate(0,${height()})`).call(d3.axisBottom(x));

    const yAxis = (g: any) => g.call(d3.axisLeft(y));

    svg.selectAll('*').remove(); // Clear previous elements
    svg.attr('width', parentWidth()).attr('height', parentHeight());

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').call(xAxis).attr('class', 'x-axis');
    g.append('g').call(yAxis).attr('class', 'y-axis');

    g.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name)!)
      .attr('y', height())
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'steelblue')
      .transition()
      .delay((d, i) => i * 100) // 遅延を付けて順番にアニメーション
      .duration(800)
      .attr('y', d => y(d.value)!)
      .attr('height', d => height() - y(d.value)!);

    // リサイズハンドラーを設定
    const resizeListener = () => {
      svg.attr('width', parentWidth()).attr('height', parentHeight());
      x.range([0, width()]);
      y.range([height(), 0]);
      xAxis(g.select('.x-axis'));
      yAxis(g.select('.y-axis'));
      g.selectAll('.bar')
        .attr('x', (d: any) => x(d.name)!)
        .attr('y', (d: any) => y(d.value)!)
        .attr('width', x.bandwidth())
        .attr('height', (d: any) => height() - y(d.value)!);
    };

    resizeHandler.current = resizeListener;
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return <svg ref={svgRef}></svg>;
};

const Bar = () => {
  
    return (
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <BarChart />
      </div>
    )
}

export default Bar