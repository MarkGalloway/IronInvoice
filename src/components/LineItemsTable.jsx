import React from 'react';
import MaterialTable from 'material-table';

import { calculateLineItemTotal } from '../utils';

const COLUMNS = [
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

const LineItemsTable = ({
  lineItems,
  setLineItems,
  addLineItem,
  updateLineItem,
  removeLineItem,
}) => (
  <MaterialTable
    columns={COLUMNS}
    style={{ boxShadow: 'none', marginBottom: 0 }}
    data={lineItems}
    title="Line Items"
    editable={{
      onRowAdd: async newData => addLineItem(newData),
      onRowUpdate: async (newData, { id }) => updateLineItem(id, newData),
      onRowDelete: async ({ id }) => removeLineItem(id),
    }}
  />
);

export default LineItemsTable;
