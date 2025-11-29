import React from 'react';

const Accounting: React.FC = () => {
  return (
    <div>
      <h2>Contabilità</h2>
      <p>Area base per la contabilità. Qui aggiungeremo report e gestione aziende.</p>

      <section style={{ marginTop: 12 }}>
        <h3>Riepilogo contabile (mock)</h3>
        <ul>
          <li>Fatture emesse (mese): 12</li>
          <li>Totale vendite (mese): € 8.450</li>
          <li>Centri di costo configurati: 3</li>
        </ul>
      </section>
    </div>
  );
};

export default Accounting;
