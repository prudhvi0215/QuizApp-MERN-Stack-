import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import {useNavigate,Link} from "react-router-dom"


const chart = () => {
  let navigate = useNavigate();
  const [scoreData] = useState(JSON.parse(localStorage.getItem("scoreBoard")));
  scoreData.unshift(0);
  const svgRef = useRef();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  useEffect(() => {
    //Setting up svg
    const w = 400;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#d3d3d3")
      .style("margin-top", "50")
      .style('overflow','visible')
      .style('padding',"100")

    //Setting the scale
    const xScale = d3
      .scaleLinear()
      .domain([0, scoreData.length - 1])
      .range([0, w]);

    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    //   Setting up the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(scoreData.length)
      .tickFormat((i) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
    svg.append("g").call(yAxis);

    //Setting up the data for svg
    svg
      .selectAll(".line")
      .data([scoreData])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [scoreData]);

  return (
    <>
        <div className= 'adminNavbar'>
            <h1>User Dashboard</h1>
            <a onClick={handleLogout}>Logout</a>
        </div>

        <div className="scoreCard">
            <h1>Score Chart</h1>
            <svg ref={svgRef}></svg>
            <h1>Scores: {scoreData.join(',')}</h1>
            <h1>Want to improve score..</h1>
            <Link to="/user/questions"><button>Retake Test</button></Link>
        </div>
    </>
  );
};

export default chart;
