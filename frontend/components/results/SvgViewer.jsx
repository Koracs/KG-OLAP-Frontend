"use client"
import {useRef, useState, useEffect} from 'react';
import {
    INITIAL_VALUE,
    ReactSVGPanZoom,
    TOOL_NONE,
    fitSelection,
    zoomOnViewerCenter,
    fitToViewer
} from 'react-svg-pan-zoom';
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader'

export default function SvgViewer({svg}) {
    const Viewer = useRef(null);
    const [tool, setTool] = useState(TOOL_NONE)
    const [value, setValue] = useState(INITIAL_VALUE)

    useEffect(() => {
        Viewer.current.fitToViewer();
    }, []);

    //hides warming message about default props from react-svg-pan-zoom
    const error = console.error;
    console.error = (...args) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <>
            <ReactSvgPanZoomLoader svgXML={svg} render={(content) => (
                <ReactSVGPanZoom
                    ref={Viewer}
                    width={640} height={500}
                    tool={tool} onChangeTool={setTool}
                    value={value} onChangeValue={setValue}
                    SVGBackground={"transparent"}
                    background={"transparent"}
                    className={"svgViewer"}
                    detectAutoPan={false}
                >
                    <svg width={640} height={500}>
                        {content}
                    </svg>
                </ReactSVGPanZoom>
            )}/>
        </>
    )
}