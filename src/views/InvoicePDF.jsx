import React from 'react';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import {
  calculateLineItemTotal,
  calculateSubTotal,
  calculateTax,
  calculateTotal,
  parseValue,
} from '../utils';

// const hyphenationCallback = word => word;

// Font.registerHyphenationCallback(hyphenationCallback);

const styles = StyleSheet.create({
  Page: {
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 14,
    padding: '120 40',
  },
  Banner: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 100,
    padding: '20 20',
    backgroundColor: '#2196f3',
  },
  Header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FontBold: {
    fontFamily: 'Helvetica-Bold',
  },
  HeaderBranding: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    fontSize: 38,
  },
  HeaderImage: {
    width: 96,
    height: 96,
    display: 'block',
    marginLeft: -10,
  },
  HeadingSummary: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minWidth: 100,
    fontSize: 12,
  },
  HeadingSummaryColumn: {
    paddingRight: 25,
  },
  HeaderTextItem: {
    marginBottom: 5,
  },
  Body: {
    flexDirection: 'column',
  },
  BodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    color: '#000',
    marginBottom: 20,
  },
  BillTo: {
    marginRight: 40,
  },
  Description: {
    width: 250,
  },
  Table: {
    display: 'table',
    width: 'auto',
    borderWidth: 0,
  },
  TableRow: {
    margin: 'auto',
    flexDirection: 'row',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#999',
    fontSize: 10,
  },
  TableRowHeader: {
    margin: 'auto',
    flexDirection: 'row',
    fontSize: 14,
    borderWidth: 0,
  },
  TableColumn: {
    width: '25%',
    // borderRightWidth: 2,
    // borderRightColor: '#FFF',
  },
  TableCell: {
    padding: '10 10',
    color: '#000',
  },
  TableCellHeader: {
    padding: '10 10',
    backgroundColor: '#333',
  },
  TextRight: {
    textAlign: 'right',
  },
  SubTotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '20 10',
    color: '#000',
    fontSize: 10,
  },
  SubTotalRowItem: {
    paddingBottom: '10 0',
  },
  TotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '10 10',
    fontSize: 14,
    backgroundColor: '#333',
  },
  TotalRowValue: {
    textAlign: 'right',
    width: 150,
  },
  Footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
  },
  FooterTextItem: {
    marginBottom: 10,
  },
  FooterPageNumbers: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
});

const InvoicePDF = ({ lineItems, taxRate, description }) => {
  return (
    <Document>
      <Page style={styles.Page} size="A4" wrap>
        <View fixed style={{ ...styles.Banner, ...styles.Header }}>
          <View style={{ ...styles.HeaderBranding, ...styles.FontBold }}>
            <Image
              style={styles.HeaderImage}
              src="https://images.squarespace-cdn.com/content/5387d935e4b040c8980c5e52/1504153099642-QW1AFPLS5DVCH4DGW2KR/IronSight-logo-white-bg-web-thicker-road-line.png"
            />
            <Text>IronInvoice</Text>
          </View>
          <View style={styles.HeadingSummary}>
            <View style={styles.HeadingSummaryColumn}>
              <Text style={styles.HeaderTextItem}>Invoice Number</Text>
              <Text style={styles.HeaderTextItem}>Invoice Date</Text>
              <Text style={styles.HeaderTextItem}>Due Date</Text>
              <Text>Balance Due</Text>
            </View>
            <View style={styles.HeadingSummaryColumn}>
              <Text style={styles.HeaderTextItem}>0001</Text>
              <Text style={styles.HeaderTextItem}>Oct 21, 2019</Text>
              <Text style={styles.HeaderTextItem}>Oct 28, 2019</Text>
              <Text>{`$${calculateTotal(
                calculateSubTotal(lineItems),
                taxRate,
              ).toFixed(2)}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.Body}>
          <View style={styles.BodyHeader}>
            <View style={styles.BillTo}>
              <Text style={styles.FontBold}>Mad Mike's Oil Emporium</Text>
              <Text>24 Gateway Avenue</Text>
              <Text>Calgary, AB T6E 2E2</Text>
              <Text>Canada</Text>
              <Text>AccountsBillable@madmikes.ca</Text>
            </View>
            <View style={styles.Description}>
              <Text>{description}</Text>
            </View>
          </View>

          <View style={styles.Table}>
            <View style={styles.TableRowHeader}>
              <View style={styles.TableColumn}>
                <Text style={styles.TableCellHeader}>Description</Text>
              </View>
              <View style={styles.TableColumn}>
                <Text
                  style={{ ...styles.TableCellHeader, ...styles.TextRight }}
                >
                  Unit Cost
                </Text>
              </View>
              <View style={styles.TableColumn}>
                <Text
                  style={{ ...styles.TableCellHeader, ...styles.TextRight }}
                >
                  Quantity
                </Text>
              </View>
              <View style={styles.TableColumn}>
                <Text
                  style={{ ...styles.TableCellHeader, ...styles.TextRight }}
                >
                  Line Total
                </Text>
              </View>
            </View>
            {lineItems.map(lineItem => (
              <View key={lineItem.id} style={styles.TableRow}>
                <View style={styles.TableColumn}>
                  <Text style={styles.TableCell}>{lineItem.description}</Text>
                </View>
                <View style={styles.TableColumn}>
                  <Text style={{ ...styles.TableCell, ...styles.TextRight }}>
                    {`$${parseValue(lineItem.unitCost).toFixed(2)}`}
                  </Text>
                </View>
                <View style={styles.TableColumn}>
                  <Text style={{ ...styles.TableCell, ...styles.TextRight }}>
                    {parseValue(lineItem.quantity)}
                  </Text>
                </View>
                <View style={styles.TableColumn}>
                  <Text style={{ ...styles.TableCell, ...styles.TextRight }}>
                    {`$${calculateLineItemTotal(lineItem).toFixed(2)}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.SubTotalRow}>
            <View>
              <Text style={styles.SubTotalRowItem}>Sub Total</Text>
              <Text>Tax ({`${(taxRate || 0).toFixed(2)}%`})</Text>
            </View>
            <View>
              <Text
                style={{ ...styles.TotalRowValue, ...styles.SubTotalRowItem }}
              >
                {`$${calculateSubTotal(lineItems).toFixed(2)}`}
              </Text>
              <Text style={styles.TotalRowValue}>{`$${calculateTax(
                calculateSubTotal(lineItems),
                taxRate,
              ).toFixed(2)}`}</Text>
            </View>
          </View>
          <View style={styles.TotalRow}>
            <Text>Balance Due</Text>
            <Text style={styles.TotalRowValue}>{`$${calculateTotal(
              calculateSubTotal(lineItems),
              taxRate,
            ).toFixed(2)}`}</Text>
          </View>
        </View>
        <View fixed style={{ ...styles.Banner, ...styles.Footer }}>
          <Text
            style={{
              ...styles.HeadingSummaryColumn,
              ...styles.FooterPageNumbers,
            }}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber}`}
          />
          <View style={styles.HeadingSummary}>
            <View style={styles.HeadingSummaryColumn}>
              <Text style={styles.FooterTextItem}>Frank Jesperson</Text>
              <Text style={styles.FooterTextItem}>FrankyJ@ironsight.ca</Text>
              <Text>+15557801234</Text>
            </View>
            <View style={styles.HeadingSummaryColumn}>
              <Text style={styles.FooterTextItem}>Startup Edmonton</Text>
              <Text style={styles.FooterTextItem}>Edmonton, AB</Text>
              <Text>Canada</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
