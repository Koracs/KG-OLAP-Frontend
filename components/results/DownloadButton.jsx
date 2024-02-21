"use client"
export default function DownloadButton({uuid, context, width, height, force, className}) {
    const handleClick = async () => {
        // console.log(uuid, context, width, height, force);
        const response = await fetch(`/results/${uuid}/graph/api?context=${context}&width=${width}&height=${height}&force=${force}`);
        const svg = await response.json();

        const svgBlob = new Blob([svg], {type: "image/svg+xml"});
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `${uuid}_${context}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    // console.log(params, searchParams);
    return (
        <button type={"button"} className={className} onClick={handleClick}>Download SVG</button>
    )
}