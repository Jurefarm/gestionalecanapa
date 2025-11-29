import React from 'react';

const Dashboard: React.FC = () => {
  // Mock summary data
  const stats = {
    incomingBatches: 12,
    inSbocciolo: 3,
    inBeta: 4,
    inFinishing: 2,
    finishedBatches: 5,
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Riepilogo rapido dello stato di produzione</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
        <StatCard label="Ingressi in attesa" value={stats.incomingBatches} />
        <StatCard label="In Sbocciolo" value={stats.inSbocciolo} />
        <StatCard label="In Beta" value={stats.inBeta} />
        <StatCard label="In Rifinitura" value={stats.inFinishing} />
        <StatCard label="Lotti Finiti" value={stats.finishedBatches} />
      </div>

      <section style={{ marginTop: 20 }}>
        <h3>Avvisi</h3>
        <ul>
          <li>2 lotti fermi in Sbocciolo da più di 48h</li>
          <li>Resa media Beta sotto target per varietà X</li>
        </ul>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div style={{ minWidth: 160, padding: 12, borderRadius: 8, background: '#021024', border: '1px solid #1f2937' }}>
    <div style={{ color: '#9ca3af', fontSize: 12 }}>{label}</div>
    <div style={{ color: '#e5e7eb', fontSize: 20, fontWeight: 700 }}>{value}</div>
  </div>
);

export default Dashboard;
