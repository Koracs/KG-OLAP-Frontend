"use server"
import * as d3 from "d3";
import fs from "fs";

export default async function preRenderGraph(triples) {
    const graphData = triplesToGraph(triples);

    function filterNodesById(nodes, id) {
        return nodes.filter(function (n) {
            return n.id === id;
        });
    }

    function triplesToGraph(triples) {
        //Graph
        var graph = {nodes: [], links: []};

        //Initial Graph from triples
        triples.forEach(function (triple) {
            var subjId = triple.subject;
            var predId = triple.predicate;
            var objId = triple.object;

            var subjNode = filterNodesById(graph.nodes, subjId)[0];
            var objNode = filterNodesById(graph.nodes, objId)[0];

            if (subjNode == null) {
                subjNode = {id: subjId, label: subjId, weight: 1};
                graph.nodes.push(subjNode);
            }

            if (objNode == null) {
                objNode = {id: objId, label: objId, weight: 1};
                graph.nodes.push(objNode);
            }


            graph.links.push({source: subjNode, target: objNode, predicate: predId, weight: 1});
        });

        return graph;
    }

    const nodes = graphData.nodes;
    const links = graphData.links;

    const width = 640;
    const height = 500;

    // Create a simulation for the given graph
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d) => d.id))
        .force("charge", d3.forceManyBody().strength(-5))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))

    // Create an SVG element
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])

    //add coordinate system
    // svg.append("path")
    //     .attr("stroke", "#000")
    //     .attr("stroke-width", 1)
    //     .attr("d", "M 0,0 L640,0")
    // svg.append("path")
    //     .attr("stroke", "#000")
    //     .attr("stroke-width", 1)
    //     .attr("d", "M 0,0 L0,500")


    // Run the simulation to its end, then draw.
    simulation.tick(Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())));
    simulation.stop();

    // Draw the links
    svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    // Draw the nodes
    svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 4)
        .attr("onmouseover", "this.style.strokeWidth='2px'")
        .attr("onmouseout", "this.style.strokeWidth='1px'")
        .append('svg:title')
        .text((d) => d.label)


    //fs.writeFileSync("test3.svg", body.node().innerHTML)
    console.log("Pre-render graph successfully.")
    //console.log(svg.node().getBoundingClientRect())
    // svg.node().getBBox()
    return svg.node().outerHTML;
}