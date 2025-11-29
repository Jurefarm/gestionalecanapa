import React, { useState } from 'react';

interface FinishedStock {
  id: string;
  productCode: string;
  batchCode: string;
  weight_g: number;
  qty: number;
  producedAt: string;
}

const FinishedWarehouse: React.FC = () => {
  // mock stock
  const [stock] = useState<FinishedStock[]>([
    { id: 'fs-1', productCode: 'FP-005G', batchCode: 'FIN-001', weight_g: 500, qty: 100, producedAt: '2025-11-20' },
    { id: 'fs-2', productCode: 'FP-010G', batchCode: 'FIN-002', weight_g: 500, qty: 50, producedAt: '2025-11-22' },
  ]);

  return (
    <div>
      <h2>Magazzino Prodotti Finiti</h2>
      <p>Elenco delle giacenze per prodotto e lotto</p>

      <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #374151' }}>
            <th style={{ padding: 8 }}>Prodotto</th>
            <th>Codice Lotto</th>
            <th>Qtà</th>
            <th>Peso Tot. (g)</th>
            <th>Data Produzione</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #1f2937' }}>
              <td style={{ padding: 8 }}>{s.productCode}</td>
              <td>{s.batchCode}</td>
              <td>{s.qty}</td>
              <td>{s.weight_g}</td>
              <td>{s.producedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinishedWarehouse;
