import { useState } from 'react';
import { AlertTriangle, Loader2, Save } from 'lucide-react';
import { STAGE_BUCKETS, STAGE_LABELS } from '../lib/processConfig';
import type { StageKey } from '../lib/processConfig';
import { supabase } from '../lib/supabase';

interface StageProcessingFormProps {
  stageKey: StageKey;
}

export const StageProcessingForm = ({ stageKey }: StageProcessingFormProps) => {
  const [lotCode, setLotCode] = useState('');
  const [variety, setVariety] = useState('');
  const [inputWeight, setInputWeight] = useState(0);
  const [buckets, setBuckets] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const stageBuckets = STAGE_BUCKETS[stageKey];
  const stageLabel = STAGE_LABELS[stageKey];

  // Initialize buckets
  const handleInitialize = () => {
    const newBuckets: Record<string, number> = {};
    Object.keys(stageBuckets).forEach((key) => {
      newBuckets[key] = 0;
    });
    setBuckets(newBuckets);
  };

  // Calculate totals
  const totalOutput = Object.values(buckets).reduce((sum, val) => sum + (val || 0), 0);
  const diff = inputWeight - totalOutput;
  const diffPerc = inputWeight > 0 ? (diff / inputWeight) * 100 : 0;
  const isBalanced = Math.abs(diffPerc) <= 2;

  // Handle save
  const handleSave = async () => {
    if (!lotCode || !variety || inputWeight <= 0) {
      setMessage('⚠️ Compila tutti i campi obbligatori');
      return;
    }

    if (!isBalanced) {
      setMessage('⚠️ Bilancio non bilanciato (tolleranza: ±2%)');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Prova a salvare su Supabase
      const { error } = await supabase.from('processing_runs').insert([
        {
          stage: stageKey,
          lot_code: lotCode,
          variety,
          input_weight_kg: inputWeight,
          total_output_kg: totalOutput,
          buckets,
          diff_kg: diff,
          operator_email: localStorage.getItem('userEmail') || 'unknown',
        },
      ]);

      if (error) {
        console.error('Supabase error:', error);
        setMessage('💾 Salvato localmente (Supabase non disponibile)');
      } else {
        setMessage('✅ Salvato su Supabase!');
      }

      // Reset form
      setTimeout(() => {
        setLotCode('');
        setVariety('');
        setInputWeight(0);
        setBuckets({});
        setMessage('');
      }, 2000);
    } catch (err) {
      console.error('Save error:', err);
      setMessage('❌ Errore nel salvataggio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-emerald-400">{stageLabel}</h1>

      {/* Lotto Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Codice Lotto
          </label>
          <input
            type="text"
            value={lotCode}
            onChange={(e) => setLotCode(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            placeholder="es. LOT-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Varietà
          </label>
          <input
            type="text"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            placeholder="es. Amnesia"
          />
        </div>
      </div>

      {/* Input Weight */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Peso Ingresso (kg)
        </label>
        <input
          type="number"
          value={inputWeight}
          onChange={(e) => setInputWeight(parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
          placeholder="0"
        />
      </div>

      {/* Initialize Button */}
      {Object.keys(buckets).length === 0 && (
        <button
          onClick={handleInitialize}
          className="w-full mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm"
        >
          Inizializza Campi
        </button>
      )}

      {/* Buckets */}
      {Object.entries(stageBuckets).map(([key, bucket]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {bucket.label}
          </label>
          <input
            type="number"
            value={buckets[key] || 0}
            onChange={(e) =>
              setBuckets({ ...buckets, [key]: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            placeholder="0"
          />
        </div>
      ))}

      {/* Balance Info */}
      {inputWeight > 0 && (
        <div className={`p-4 rounded mb-6 border ${isBalanced ? 'border-green-600 bg-green-900/20' : 'border-red-600 bg-red-900/20'}`}>
          <p className="text-sm text-gray-300">
            Ingresso: <strong>{inputWeight.toFixed(2)} kg</strong>
          </p>
          <p className="text-sm text-gray-300">
            Uscita: <strong>{totalOutput.toFixed(2)} kg</strong>
          </p>
          <p className={`text-sm font-bold ${isBalanced ? 'text-green-400' : 'text-red-400'}`}>
            Differenza: {diff.toFixed(2)} kg ({diffPerc.toFixed(1)}%)
          </p>
          {!isBalanced && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
              <AlertTriangle size={16} />
              Bilancio non bilanciato (tolleranza: ±2%)
            </div>
          )}
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="p-3 mb-4 bg-blue-900/30 border border-blue-600 rounded text-sm text-blue-300">
          {message}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading || !isBalanced || !lotCode || !variety || inputWeight <= 0}
        className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded font-medium flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {loading ? 'Salvataggio...' : 'Salva'}
      </button>
    </div>
  );
};
