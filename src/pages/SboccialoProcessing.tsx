import React, { useState } from 'react';

interface SubBatch {
  id: string;
  parentBatch: string;
  weight_in: number;
  weight_to_beta: number;
  scrap: number;
  status: 'in-progress' | 'completed';
}

const SboccialoProcessing: React.FC = () => {
  // Mock incoming batches
  const mockIncoming = [
    { id: 'IN-1', code: 'GREZZO-001', weight: 2000 },
    { id: 'IN-2', code: 'GREZZO-002', weight: 1500 },
  ];

  const [selected, setSelected] = useState<string>('');
  const [weightToBeta, setWeightToBeta] = useState('');
  const [scrap, setScrap] = useState('');
  const [subbatches, setSubbatches] = useState<SubBatch[]>([]);

  const handleCreateSubbatch = () => {
    if (!selected || !weightToBeta) return;
    const parent = mockIncoming.find(m => m.id === selected)!;
    const sb: SubBatch = {
      id: `SB-${Date.now()}`,
      parentBatch: parent.code,
      weight_in: parent.weight,
      weight_to_beta: parseFloat(weightToBeta),
      scrap: parseFloat(scrap) || 0,
      status: 'in-progress',
    };
    setSubbatches([sb, ...subbatches]);
    setWeightToBeta('');
    setScrap('');
  };

  const markCompleted = (id: string) => {
    setSubbatches(subbatches.map(s => s.id === id ? { ...s, status: 'completed' } : s));
  };

  return (
    <div>
      <h2>Sala Sbocciolo</h2>

      <div className="form-group">
        <label>Seleziona lotto ingresso</label>
        <select className="form-select" value={selected} onChange={e => setSelected(e.target.value)}>
          <option value="">-- seleziona --</option>
          {mockIncoming.map(m => (
            <option key={m.id} value={m.id}>{m.code} ({m.weight} g)</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Peso verso Beta (g)</label>
          <input className="form-input" type="number" value={weightToBeta} onChange={e => setWeightToBeta(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Scarto (g)</label>
          <input className="form-input" type="number" value={scrap} onChange={e => setScrap(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={handleCreateSubbatch}>Crea Sottolotto</button>
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h3>Sottolotti creati</h3>
        {subbatches.length === 0 ? (
          <p className="empty-state">Nessun sottolotto</p>
        ) : (
          <div>
            {subbatches.map(sb => (
              <div key={sb.id} style={{ padding: 10, borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{sb.id}</strong> — {sb.parentBatch} — {sb.weight_to_beta}g → Beta — Scarto: {sb.scrap}g
                </div>
                <div>
                  {sb.status === 'in-progress' && <button className="btn btn-secondary" onClick={() => markCompleted(sb.id)}>Segna completato</button>}
                  {sb.status === 'completed' && <span style={{ color: '#10b981' }}>Completato</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SboccialoProcessing;
