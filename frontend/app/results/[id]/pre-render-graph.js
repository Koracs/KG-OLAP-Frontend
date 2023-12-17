"use server"
import * as d3 from "d3";
import jsdom from "jsdom";
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


    const {JSDOM} = jsdom;

    const {document} = (new JSDOM('')).window;
    global.document = document;

    var body = d3.select(document).select("body");

    const nodes = graphData.nodes;
    const links = graphData.links;
    const width = 640;
    const height = 500;
    const svg = body.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");



    const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-80))
        .force("link", d3.forceLink(links).distance(20).strength(1).iterations(10))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .stop();

    const loading = svg.append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .text("Simulating. One moment please…");

    // Run the simulation to its end, then draw.
    simulation.tick(Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())));

    loading.remove();

    svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 4.5);


    fs.writeFileSync("test3.svg", svg.node().innerHTML)
    console.log("Pre-render graph successfully.")
    return body.node().innerHTML;
}