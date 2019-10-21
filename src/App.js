import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import InlinePDF from './components/InlinePDF';
import LineItemsTable from './components/LineItemsTable';
import MonetaryDisplayField from './components/MonetaryDisplayField';
import PercentInput from './components/PercentInput';
import { calculateSubTotal, calculateTotal, parseValue } from './utils';
import { useDebounce } from './hooks';

const SEED_DATA = [
  {
    id: 1,
    description: 'Computer Programming',
    unitCost: 56,
    quantity: 35.8,
  },
];

function App() {
  const [description, setDescription] = useState('For services rendered.');
  const [taxRate, setTaxRate] = useState(0.0);
  const [lineItems, setLineItems] = useState(SEED_DATA);

  const debouncedDescription = useDebounce(description, 500);
  const debouncedTaxRate = useDebounce(taxRate, 500);

  const addLineItem = newData => {
    const newLineItem = {
      id: Date.now(),
      description: newData.description,
      unitCost: parseValue(newData.unitCost),
      quantity: parseValue(newData.quantity),
    };
    setLineItems([...lineItems, newLineItem]);
  };

  const updateLineItem = (id, updateData) =>
    setLineItems(
      lineItems.map(item => (item.id === id ? { ...updateData, id } : item)),
    );

  const removeLineItem = id =>
    setLineItems(lineItems.filter(item => item.id !== id));

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
          <PercentInput
            label="Tax Rate"
            value={taxRate}
            onChange={value => setTaxRate(parseFloat(value))}
          />
          <LineItemsTable
            lineItems={lineItems}
            setLineItems={setLineItems}
            addLineItem={addLineItem}
            updateLineItem={updateLineItem}
            removeLineItem={removeLineItem}
          />
          <MonetaryDisplayField
            label="Subtotal"
            value={calculateSubTotal(lineItems)}
          />
          <MonetaryDisplayField
            label="Total"
            value={calculateTotal(calculateSubTotal(lineItems), taxRate)}
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
