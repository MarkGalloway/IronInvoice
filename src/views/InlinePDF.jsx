import React from 'react';
import styled from 'styled-components';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';

import InvoicePDF from './InvoicePDF';

const InlinePDF = props => {
  return (
    <Layout>
      <PDFViewer width="595" height="900" frameBorder="0">
        <InvoicePDF {...props} />
      </PDFViewer>
      <PDFDownloadLink document={<InvoicePDF {...props} />}>
        {({ loading }) =>
          loading ? null : (
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudDownloadIcon />}
            >
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </Layout>
  );
};

export default InlinePDF;

const Layout = styled.section`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    align-self: center;

    margin-top: 1em;
  }
`;
