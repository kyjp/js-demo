import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: DataPoint[]
  aspectRatio: number
  margin: { top: number; right: number; bottom: number; left: number }
  duration: number
}

const LineChart: React.FC<LineChartProps> = ({ data, aspectRatio, margin, duration }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [initialRender, setInitialRender] = useState(true); // Flag for initial render

  const updateDimensions = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = width * aspectRatio;
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [aspectRatio]);

  useEffect(() => {
    const { width, height } = dimensions;
  
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
  
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([height - margin.bottom, margin.top]);
  
    const xAxis: any = d3.axisBottom(xScale);
    const yAxis: any = d3.axisLeft(yScale);
  
    svg.select('.x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);
  
    svg.select('.y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);
  
    const line = d3.line<DataPoint>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));
  
    const path: any = svg.select('.line')
      .datum(data)
      .attr('d', line);
  
    const totalLength = path.node()?.getTotalLength() || 0;
  
    // Clear previous animation
    path.interrupt();
  
    if (initialRender) {
      // Hide path for initial animation
      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength);
    } else {
      // Show path for subsequent renders
      path
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);
    }
  
    if (initialRender) {
      // Animation only for initial render
      path.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', () => {
          // Animation complete, set flag to false
          setInitialRender(false);
        });
    }
  }, [data, dimensions, margin, duration, initialRender]);

  return (
    <div ref={containerRef} className="m-w-[100%]">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
        <path className="line" fill="none" stroke="steelblue" strokeWidth="2" />
      </svg>
    </div>
  );
};


const LineChartOuter: React.FC = () => {
  const data: DataPoint[] = [
    { date: new Date(2021, 0, 1), value: 30 },
    { date: new Date(2021, 1, 1), value: 80 },
    { date: new Date(2021, 2, 1), value: 45 },
    { date: new Date(2021, 3, 1), value: 60 },
    { date: new Date(2021, 4, 1), value: 20 },
    { date: new Date(2021, 5, 1), value: 90 },
    { date: new Date(2021, 6, 1), value: 55 },
  ]


  const widthPercentage = 100; // Width as a percentage of the window width
  const aspectRatio = 9 / 16; // 16:9 aspect ratio

  return (
    <LineChart
      data={data}
      aspectRatio={aspectRatio}
      margin={{ top: 20, right: 30, bottom: 30, left: 40 }}
      duration={2000}
    />
  )
}

export default LineChartOuter