import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const pxToMm = (px) => {
    return Math.floor(px/document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
    return document.getElementById('myMm').offsetHeight*mm;
};

const range = (start, end) => {
    return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
};


const PrintButton = ({id, label}) => (
    <div className="tc mb4 mt2">
        <div id="myMm" style={{height: "1mm"}} />
            <div
                className="pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
                onClick={() => {
                    const input = document.getElementById(id);
                    const inputHeightMm = pxToMm(input.offsetHeight);
                    const a4WidthMm = 210;
                    const a4HeightMm = 297;
                    const a4HeightPx = mmToPx(a4HeightMm);
                    const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;
                    console.log({
                        input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages),
                        comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
                    });


                    html2canvas(input)
                        .then((canvas) => {
                            const imgData = canvas.toDataURL('image/png');
                            let pdf;

                            // Document of a4WidthMm wide and inputHeightMm high
                            if (inputHeightMm > a4HeightMm) {
                                // elongated a4 (system print dialog will handle page breaks)
                                pdf = new jsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]);
                            } else {
                                // standard a4
                                pdf = new jsPDF();
                            }

                            pdf.addImage(imgData, 'PNG', 25, 10);
                            pdf.save(`${id}.pdf`);
                        });
                }} >

                {label}
        </div>
    </div>
);

export default PrintButton;