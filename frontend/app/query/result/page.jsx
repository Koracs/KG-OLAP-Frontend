"use client"

import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";
import ForceGraph from 'react-force-graph-2d';

export default function QueryPage() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/query")
        }
    });

    const triples = [
        {subject: "aircraft:44088b", predicate: "rdf:type", object: "voc:Aircraft"},
        {subject: "aircraft:44088b", predicate: "voc:icao24", object: "440389"},
        {subject: "aircraft:44088b", predicate: "voc:hasModel", object: "model:EuroFox"},
        {subject: "aircraft:440412", predicate: "rdf:type", object: "voc:Aircraft"},
        {subject: "aircraft:440412", predicate: "voc:icao24", object: "440412"},
        {subject: "aircraft:440412", predicate: "voc:hasModel", object: "model:RV9A"},
        {subject: "aircraft:440412", predicate: "voc:hasOwner", object: "owner:Galactic"},
        {subject: "aircraft:440959", predicate: "rdf:type", object: "voc:Aircraft"},
        {subject: "aircraft:440959", predicate: "voc:hasManufacturer", object: "manufacturer:PIPER"},
        {subject: "manufacturer:PIPER", predicate: "voc:hasOwner", object: "owner:Jeff Bezos"},
        {subject: "aircraft:440959", predicate: "voc:hasOwner", object: "owner:Private"},
        {subject: "owner:Private", predicate: "rdf:type", object: "voc:Owner"},
        {subject: "owner:Private", predicate: "voc:owner", object: "Private Owner"},
        {subject: "aircraft:444530", predicate: "rdf:type", object: "voc:Aircraft"},
        {subject: "aircraft:444530", predicate: "voc:icao24", object: "444530"},
        {subject: "aircraft:444530", predicate: "voc:hasOwner", object: "owner:Private"},
        {subject: "aircraft:440412", predicate: "voc:hasModel", object: "model:Synthesis25"},
        {subject: "model:Synthesis25", predicate: "rdf:type", object: "voc:Model"},
        {subject: "model:Synthesis25", predicate: "voc:model", object: "Synthesis 25"},
        {subject: "model:Synthesis25", predicate: "voc:typecode", object: "PARA"},
    ];

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

    return (
        <>
            <h1>Query Result</h1>
            <ForceGraph
                graphData={graphData}
                nodeLabel="id"
                nodeAutoColorBy="group"
                linkLabel="predicate"
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.id;
                    const fontSize = 6;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    ctx.fillText(label, node.x, node.y);

                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                }}
                linkDirectionalArrowLength={5}
                linkDirectionalArrowRelPos={1}
                linkCanvasObjectMode={() => 'after'}
                linkCanvasObject={(link, ctx) => {
                    const MAX_FONT_SIZE = 5;
                    const LABEL_NODE_MARGIN =3;

                    const start = link.source;
                    const end = link.target;

                    // ignore unbound links
                    if (typeof start !== 'object' || typeof end !== 'object') return;

                    // calculate label positioning
                    const textPos = Object.assign(...['x', 'y'].map(c => ({
                        [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                    })));

                    const relLink = { x: end.x - start.x, y: end.y - start.y };

                    const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;

                    let textAngle = Math.atan2(relLink.y, relLink.x);
                    // maintain label vertical orientation for legibility
                    if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
                    if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

                    const label = `${link.predicate}`;

                    // estimate fontSize to fit in link length
                    ctx.font = '1px Sans-Serif';
                    const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    // draw text label (with background rect)
                    ctx.save();
                    ctx.translate(textPos.x, textPos.y);
                    ctx.rotate(textAngle);

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillStyle = 'darkgrey';
                    ctx.fillText(label, 0, 0);
                    ctx.restore();
                }}
            />
        </>
    );
}