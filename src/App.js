import React, { useState } from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import InlinePDF from './views/InlinePDF';
import {
  calculateLineItemTotal,
  parseValue,
  calculateSubTotal,
  calculateTotal,
} from './utils';
import { useDebounce } from './hooks';

const TEST_DATA = [
  {
    id: 654,
    description: 'Computer Programming',
    unitCost: 56,
    quantity: 35.8,
  },
  {
    id: 655,
    description: 'Massage',
    unitCost: 75.5,
    quantity: 1,
  },
];

function App() {
  const [description, setDescription] = useState('For services rendered.');
  const [taxRate, setTaxRate] = useState(0.0);
  const [lineItems, setLineItems] = useState(TEST_DATA);

  const debouncedDescription = useDebounce(description, 500);
  const debouncedTaxRate = useDebounce(taxRate, 500);

  const lineItemColumns = [
    { title: 'Description', field: 'description' },
    { title: 'Unit Cost', field: 'unitCost', type: 'numeric' },
    { title: 'Quantity', field: 'quantity', type: 'numeric' },
    {
      title: 'Total',
      field: 'total',
      type: 'numeric',
      editable: 'never',
      render: rowData => (
        <span>{`$${calculateLineItemTotal(rowData).toFixed(2)}`}</span>
      ),
    },
  ];

  return (
    <Main>
      <h1>IronInvoice: Invoice Creation Tool</h1>
      <Layout>
        <EditorSection>
          <TextField
            label="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            margin="normal"
          />
          <TextField
            label="Tax Rate"
            type="number"
            value={taxRate}
            onChange={event => setTaxRate(parseFloat(event.target.value))}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
          <MaterialTable
            columns={lineItemColumns}
            style={{ boxShadow: 'none', marginBottom: 0 }}
            data={lineItems}
            title="Line Items"
            editable={{
              onRowAdd: async newData => {
                const newLineItem = {
                  id: Date.now(),
                  description: newData.description,
                  unitCost: parseValue(newData.unitCost),
                  quantity: parseValue(newData.quantity),
                };
                setLineItems([...lineItems, newLineItem]);
              },
              onRowUpdate: async (newData, oldData) => {
                setLineItems(
                  lineItems.map(item =>
                    item.id === oldData.id
                      ? { ...newData, id: oldData.id }
                      : item,
                  ),
                );
              },
              onRowDelete: async oldData =>
                setLineItems(lineItems.filter(item => item.id !== oldData.id)),
            }}
          />
          <TextField
            label="Subtotal"
            value={calculateSubTotal(lineItems).toFixed(2)}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Total"
            value={calculateTotal(
              calculateSubTotal(lineItems),
              taxRate,
            ).toFixed(2)}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </EditorSection>
        <InlinePDF
          lineItems={lineItems}
          description={debouncedDescription}
          taxRate={debouncedTaxRate}
        />
      </Layout>
    </Main>
  );
}

export default App;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 1em 2em 1em;

  & > h1 {
    align-self: center;
    margin-bottom: 2em;
  }
`;

const Layout = styled.div`
  display: flex;
`;

const EditorSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin-right: 4em;
  & > * {
    margin-bottom: 2em !important;
  }
`;
