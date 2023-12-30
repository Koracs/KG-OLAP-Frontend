"use client"
import {useRef, useState, useEffect} from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader'

export default function SvgViewer({svg}) {
    const Viewer = useRef(null);
    const [tool, setTool] = useState(TOOL_NONE)
    const [value, setValue] = useState(INITIAL_VALUE)

    useEffect(() => {
        Viewer.current.fitToViewer();
    }, []);

    /* Read all the available methods in the documentation */
    const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1)
    const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200)
    const _fitToViewer1 = () => Viewer.current.fitToViewer()

    /* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
    const _zoomOnViewerCenter2 = () => setValue(zoomOnViewerCenter(value, 1.1))
    const _fitSelection2 = () => setValue(fitSelection(value, 40, 40, 200, 200))
    const _fitToViewer2 = () => setValue(fitToViewer(value))

    return (
        <div>
            <h1>ReactSVGPanZoom</h1>
            <ReactSvgPanZoomLoader svgXML={svg} render= {(content) => (
            <ReactSVGPanZoom
                ref={Viewer}
                width={640} height={500}
                tool={tool} onChangeTool={setTool}
                value={value} onChangeValue={setValue}
                onZoom={e => console.log('zoom')}
                onPan={e => console.log('pan')}
                onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                SVGStyle={{overflow: 'visible', BackgroundColor: 'green'}}
                className={"svgViewer"}
            >
                <svg width={640} height={500}>
                    {content}
                </svg>
            </ReactSVGPanZoom>
            )}/>
        </div>
    )
}