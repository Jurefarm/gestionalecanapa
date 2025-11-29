import React, { useState } from 'react';

interface FinishedProduct {
  id: string;
  code: string;
  name: string;
  format_grams: number;
}

interface ProcessingRecord {
  id: string;
  batch_code: string;
  scrap_weight: number;
  residual_weight: number;
  finished_products: FinishedProductRecord[];
  notes: string;
  timestamp: string;
}

interface FinishedProductRecord {
  product_id: string;
  product_name: string;
  quantity: number;
  total_weight: number;
}

const FinishingProcessing: React.FC = () => {
  // Mock data - in produzione verrà da Supabase
  const mockBatchesFromBeta = [
    { id: '1', code: 'BETA-001', weight_after_beta: 850, source_batch: 'GREZZO-001' },
    { id: '2', code: 'BETA-002', weight_after_beta: 620, source_batch: 'GREZZO-002' },
    { id: '3', code: 'BETA-003', weight_after_beta: 1200, source_batch: 'GREZZO-003' },
  ];

  const mockFinishedProducts: FinishedProduct[] = [
    { id: 'fp-1', code: 'FP-005G', name: 'Fiore 5g', format_grams: 5 },
    { id: 'fp-2', code: 'FP-010G', name: 'Fiore 10g', format_grams: 10 },
    { id: 'fp-3', code: 'FP-025G', name: 'Fiore 25g', format_grams: 25 },
    { id: 'fp-4', code: 'FP-100G', name: 'Fiore 100g', format_grams: 100 },
    { id: 'fp-5', code: 'TRIM-100G', name: 'Trim 100g', format_grams: 100 },
  ];

  // State per il form
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [scrapWeight, setScrapWeight] = useState<string>('');
  const [residualWeight, setResidualWeight] = useState<string>('');
  const [finishedProducts, setFinishedProducts] = useState<FinishedProductRecord[]>([]);
  const [currentProductId, setCurrentProductId] = useState<string>('');
  const [currentQuantity, setCurrentQuantity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Storico processing
  const [processingHistory, setProcessingHistory] = useState<ProcessingRecord[]>([]);

  // Calcoli utili
  const selectedBatchData = mockBatchesFromBeta.find(b => b.id === selectedBatch);
  const totalScrap = parseFloat(scrapWeight) || 0;
  const totalResidual = parseFloat(residualWeight) || 0;
  const totalFinishedWeight = finishedProducts.reduce((sum, fp) => sum + fp.total_weight, 0);
  const totalWeightUsed = totalScrap + totalResidual + totalFinishedWeight;
  const availableWeight = selectedBatchData ? selectedBatchData.weight_after_beta : 0;
  const weightBalance = availableWeight - totalWeightUsed;

  // Aggiungi prodotto finito
  const handleAddFinishedProduct = () => {
    if (!currentProductId || !currentQuantity) return;
    
    const product = mockFinishedProducts.find(p => p.id === currentProductId);
    if (!product) return;

    const totalWeight = parseInt(currentQuantity) * product.format_grams;

    const newProduct: FinishedProductRecord = {
      product_id: currentProductId,
      product_name: product.name,
      quantity: parseInt(currentQuantity),
      total_weight: totalWeight,
    };

    setFinishedProducts([...finishedProducts, newProduct]);
    setCurrentProductId('');
    setCurrentQuantity('');
  };

  // Rimuovi prodotto finito
  const handleRemoveFinishedProduct = (index: number) => {
    setFinishedProducts(finishedProducts.filter((_, i) => i !== index));
  };

  // Completa elaborazione
  const handleCompleteProcessing = () => {
    if (!selectedBatch || weightBalance < 0) {
      alert('Controlla i dati: batch selezionato e bilancia dei pesi devono essere corretti');
      return;
    }

    const record: ProcessingRecord = {
      id: `RIF-${Date.now()}`,
      batch_code: selectedBatchData?.code || '',
      scrap_weight: totalScrap,
      residual_weight: totalResidual,
      finished_products: finishedProducts,
      notes: notes,
      timestamp: new Date().toLocaleString('it-IT'),
    };

    setProcessingHistory([record, ...processingHistory]);

    // Reset form
    setSelectedBatch('');
    setScrapWeight('');
    setResidualWeight('');
    setFinishedProducts([]);
    setNotes('');
  };

  return (
    <div className="finishing-container">
      <h2>Sala Rifinitura / Confezionamento</h2>

      <div className="finishing-grid">
        {/* Sezione Sinistra: Registrazione Rifinitura */}
        <div className="finishing-form-section">
          <h3>Registra Rifinitura</h3>

          {/* Selezione Batch da Beta */}
          <div className="form-group">
            <label htmlFor="batch-select">
              Lotto da Beta
              <span className="required">*</span>
            </label>
            <select
              id="batch-select"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="form-select"
            >
              <option value="">-- Seleziona --</option>
              {mockBatchesFromBeta.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.code} ({batch.weight_after_beta}g)
                </option>
              ))}
            </select>
          </div>

          {selectedBatchData && (
            <div className="batch-info-box">
              <p>
                <strong>Peso disponibile:</strong> {selectedBatchData.weight_after_beta}g
              </p>
              <p>
                <strong>Origine:</strong> {selectedBatchData.source_batch}
              </p>
            </div>
          )}

          {/* Pesi Scarto e Residuo */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="scrap">Scarto Rifinitura (g)</label>
              <input
                id="scrap"
                type="number"
                min="0"
                value={scrapWeight}
                onChange={(e) => setScrapWeight(e.target.value)}
                className="form-input"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="residual">Residuo Non Lavorato (g)</label>
              <input
                id="residual"
                type="number"
                min="0"
                value={residualWeight}
                onChange={(e) => setResidualWeight(e.target.value)}
                className="form-input"
                placeholder="0"
              />
            </div>
          </div>

          {/* Prodotti Finiti */}
          <div className="form-group">
            <h4>Prodotti Finiti</h4>

            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="product-select">Prodotto</label>
                <select
                  id="product-select"
                  value={currentProductId}
                  onChange={(e) => setCurrentProductId(e.target.value)}
                  className="form-select"
                >
                  <option value="">-- Seleziona --</option>
                  {mockFinishedProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.format_grams}g)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex-0">
                <label htmlFor="quantity">Quantità (pz)</label>
                <input
                  id="quantity"
                  type="number"
                  min="0"
                  value={currentQuantity}
                  onChange={(e) => setCurrentQuantity(e.target.value)}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddFinishedProduct}
              >
                Aggiungi
              </button>
            </div>

            {finishedProducts.length > 0 && (
              <div className="products-list">
                {finishedProducts.map((product, index) => (
                  <div key={index} className="product-item">
                    <div className="product-info">
                      <strong>{product.product_name}</strong>
                      <span className="product-qty">
                        {product.quantity} pz = {product.total_weight}g
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => handleRemoveFinishedProduct(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note */}
          <div className="form-group">
            <label htmlFor="notes">Note</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
              placeholder="Note della rifinitura..."
              rows={3}
            />
          </div>

          {/* Bilancia Pesi */}
          <div className={`weight-balance ${weightBalance === 0 ? 'balanced' : weightBalance > 0 ? 'surplus' : 'deficit'}`}>
            <p>
              <strong>Scarto:</strong> {totalScrap}g | <strong>Residuo:</strong> {totalResidual}g | <strong>Finito:</strong> {totalFinishedWeight}g
            </p>
            <p>
              <strong>Peso Totale Usato:</strong> {totalWeightUsed}g / {availableWeight}g
            </p>
            <p className="balance-indicator">
              {weightBalance > 0 ? `Differenza: +${weightBalance}g (surplus)` : weightBalance < 0 ? `Differenza: ${weightBalance}g (deficit)` : 'Bilancia perfetta ✓'}
            </p>
          </div>

          {/* Pulsante Salva */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCompleteProcessing}
            disabled={!selectedBatch}
          >
            Completa Elaborazione Rifinitura
          </button>
        </div>

        {/* Sezione Destra: Storico Elaborazioni */}
        <div className="finishing-history-section">
          <h3>Storico Elaborazioni</h3>

          {processingHistory.length === 0 ? (
            <p className="empty-state">Nessuna elaborazione registrata</p>
          ) : (
            <div className="history-list">
              {processingHistory.map((record) => (
                <div key={record.id} className="history-item">
                  <div className="history-header">
                    <strong>{record.batch_code}</strong>
                    <span className="history-id">{record.id}</span>
                  </div>

                  <div className="history-details">
                    <p>
                      <strong>Data:</strong> {record.timestamp}
                    </p>
                    <p>
                      <strong>Scarto:</strong> {record.scrap_weight}g
                    </p>
                    <p>
                      <strong>Residuo:</strong> {record.residual_weight}g
                    </p>

                    {record.finished_products.length > 0 && (
                      <div className="finished-products-summary">
                        <strong>Prodotti Finiti:</strong>
                        <ul>
                          {record.finished_products.map((product, idx) => (
                            <li key={idx}>
                              {product.product_name}: {product.quantity} pz ({product.total_weight}g)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {record.notes && (
                      <p>
                        <strong>Note:</strong> {record.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishingProcessing;
