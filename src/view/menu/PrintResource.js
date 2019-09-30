import React from 'react';
import Page from "../component/printer/Page";
import PrintPreview from "./PrintPreview";

const PrintResouce = ({id, data, page}) => (
    <Page id={id}>
        <PrintPreview data={data} page={page} />
    </Page>
);

export default PrintResouce;