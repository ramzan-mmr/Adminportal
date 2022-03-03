import React from 'react';
import '@grapecity/activereports/styles/ar-js-viewer.css';
import { Viewer } from '@grapecity/activereports-react';
import { PdfExport, HtmlExport, XlsxExport, Core } from '@grapecity/activereports';

const HospitalReports = () => {
    return (
        <div id='viewer-host'>
            <Viewer
                report={{ Uri: "hospitalReport.rdlx-json" }} 
                sidebarVisible={true} 
                toolbarVisible zoom='100%' />
        </div>
    );
};

export default HospitalReports;