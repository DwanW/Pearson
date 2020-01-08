import './graph.css';
import * as d3 from 'd3';
import React,{useEffect} from 'react';

function Graph(props) {
    useEffect(()=>{
        const data = props.data;
        drawGraph(data);
        const child = document.getElementById("graph").childElementCount;

         return () => {
            if(child >0){
                const graphs = document.getElementById("graph");
                graphs.childNodes[0].remove()
            }
        }
    }, [props.data])

    const drawGraph = (data) => {
        const svgWidth = 400;
        const svgHeight = 300;
        const padding = 35;

        const xScale = d3.scaleLinear().domain([0, d3.max(data, (d)=> d[0])]).range([padding, svgWidth - padding]);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, (d)=> d[1])]).range([svgHeight-padding, padding]);

        const svg = d3.select("p").append("svg").attr("width", svgWidth).attr("height", svgHeight);

        svg.selectAll("circle").data(data).enter().append("circle").attr("cx", (d)=> xScale(d[0])).attr("cy", (d)=> yScale(d[1])).attr("r", (d)=> 5).attr("class","dot").append("title").text((d)=>d[0] + " ," + d[1]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g").attr("transform", "translate(0," + (svgHeight - padding) + ")").call(xAxis);
        svg.append("g").attr("transform", "translate("+ padding + ",0)").call(yAxis);
    }

    return (
        <p id="graph"></p>
    )
}

export default Graph;
