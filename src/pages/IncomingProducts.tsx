import React, { useState } from 'react';

interface Batch {
  id: string;
  supplier: string;
  variety: string;
  weight_gross: number;
  weight_net?: number;
  date: string;
}

const IncomingProducts: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [supplier, setSupplier] = useState('');
  const [variety, setVariety] = useState('');
  const [weightGross, setWeightGross] = useState('');

  const handleAdd = () => {
    if (!supplier || !variety || !weightGross) return;
    const newBatch: Batch = {
      id: `IN-${Date.now()}`,
      supplier,
      variety,
      weight_gross: parseFloat(weightGross),
      date: new Date().toLocaleDateString('it-IT'),
    };
    setBatches([newBatch, ...batches]);
    setSupplier('');
    setVariety('');
    setWeightGross('');
  };

  return (
    <div>
      <h2>Ingresso Grezzo</h2>

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <input placeholder="Fornitore" value={supplier} onChange={e => setSupplier(e.target.value)} className="form-input" />
        <input placeholder="Varietà" value={variety} onChange={e => setVariety(e.target.value)} className="form-input" />
        <input placeholder="Peso lordo (g)" value={weightGross} onChange={e => setWeightGross(e.target.value)} className="form-input" type="number" />
        <button className="btn btn-primary" onClick={handleAdd}>Registra Lotto</button>
      </div>

      <section style={{ marginTop: 18 }}>
        <h3>Ultimi lotti registrati</h3>
        {batches.length === 0 ? (
          <p className="empty-state">Nessun lotto registrato</p>
        ) : (
          <ul>
            {batches.map(b => (
              <li key={b.id} style={{ padding: 8, borderBottom: '1px solid #374151' }}>
                <strong>{b.id}</strong> — {b.supplier} — {b.variety} — {b.weight_gross} g — {b.date}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default IncomingProducts;
