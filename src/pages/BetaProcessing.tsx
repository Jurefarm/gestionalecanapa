import React, { useState } from 'react';

interface SubBatch {
  id: string;
  code: string;
  weight_in: number;
}

const BetaProcessing: React.FC = () => {
  // Mock sottolotti provenienti da Sbocciolo
  const mockSubbatches: SubBatch[] = [
    { id: 'SB-1', code: 'SB-001', weight_in: 850 },
    { id: 'SB-2', code: 'SB-002', weight_in: 620 },
  ];

  const [selected, setSelected] = useState('');
  const [processedWeight, setProcessedWeight] = useState('');
  const [scarto, setScarto] = useState('');
  const [records, setRecords] = useState<any[]>([]);

  const handleProcess = () => {
    if (!selected || !processedWeight) return;
    const sb = mockSubbatches.find(s => s.id === selected)!;
    const rec = {
      id: `BPR-${Date.now()}`,
      subbatch: sb.code,
      processed: parseFloat(processedWeight),
      scrap: parseFloat(scarto) || 0,
      date: new Date().toLocaleString('it-IT'),
    };
    setRecords([rec, ...records]);
    setProcessedWeight('');
    setScarto('');
  };

  return (
    <div>
      <h2>Sala Beta</h2>

      <div className="form-group">
        <label>Seleziona sottolotto da Sbocciolo</label>
        <select className="form-select" value={selected} onChange={e => setSelected(e.target.value)}>
          <option value="">-- seleziona --</option>
          {mockSubbatches.map(s => (
            <option key={s.id} value={s.id}>{s.code} ({s.weight_in} g)</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Peso prodotto (g)</label>
          <input className="form-input" type="number" value={processedWeight} onChange={e => setProcessedWeight(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Scarto (g)</label>
          <input className="form-input" type="number" value={scarto} onChange={e => setScarto(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={handleProcess}>Registra</button>
        </div>
      </div>

      <section style={{ marginTop: 16 }}>
        <h3>Registrazioni Beta</h3>
        {records.length === 0 ? (
          <p className="empty-state">Nessuna registrazione</p>
        ) : (
          <div>
            {records.map(r => (
              <div key={r.id} style={{ padding: 10, borderBottom: '1px solid #374151' }}>
                <strong>{r.subbatch}</strong> — {r.processed} g — scarto {r.scrap} g — {r.date}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BetaProcessing;
