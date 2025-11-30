import React, { useState, useContext } from 'react';
import { GestionaleContext } from '../context/GestionaleContext';
import { AuthContext } from '../lib/auth';
import type { StageBatchInput, ScrapDetails } from '../types';
import { supabase } from '../lib/supabase';

export const FinishingProcessing: React.FC = () => {
  const { addStageBatch } = useContext(GestionaleContext);
  const { user } = useContext(AuthContext);
  
  const [form, setForm] = useState({
    lotCode: '',
    variety: '',
    inputWeight: '',
    outputWeight: '',
    scrapWeight: '',
    scrapBiomass: '',
    scrapMould: '',
    scrapWood: '',
    residualWeight: '',
    qualityGrade: '',
    status: 'Completato' as 'Completato' | 'In lavorazione',
    operatorName: '',
    operatorEmail: user?.email || '',
    notes: '',
  });

  const [distribution, setDistribution] = useState({
    grandi: '',
    medi: '',
    mini: '',
    trinciato: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDistributionChange = (cat: string, value: string) => {
    setDistribution(prev => ({ ...prev, [cat]: value }));
  };

  const validateAndSave = async () => {
    const input = parseFloat(form.inputWeight);
    const output = parseFloat(form.outputWeight);
    const scrap = parseFloat(form.scrapWeight);
    const residual = parseFloat(form.residualWeight);

    const expected = output + scrap + residual;
    const diff = Math.abs(expected - input);
    const tolerance = input * 0.02;

    if (diff > tolerance) {
      alert(`⚠️ Weight mismatch!\nInput: ${input}kg\nExpected: ${expected}kg`);
      return;
    }

    const biomass = parseFloat(form.scrapBiomass) || 0;
    const mould = parseFloat(form.scrapMould) || 0;
    const wood = parseFloat(form.scrapWood) || 0;
    const scrapSum = biomass + mould + wood;

    if (Math.abs(scrapSum - scrap) > 0.1) {
      alert(`⚠️ Scrap mismatch! Sum: ${scrapSum}kg, Total: ${scrap}kg`);
      return;
    }

    const grandi = parseFloat(distribution.grandi) || 0;
    const medi = parseFloat(distribution.medi) || 0;
    const mini = parseFloat(distribution.mini) || 0;
    const trinciato = parseFloat(distribution.trinciato) || 0;
    const distSum = grandi + medi + mini + trinciato;

    if (Math.abs(distSum - output) > 0.1) {
      alert(`⚠️ Distribution mismatch! Total: ${distSum}kg, Expected: ${output}kg`);
      return;
    }

    const scrapDetails: ScrapDetails = {
      biomassa: biomass || undefined,
      muffa: mould || undefined,
      rami: wood || undefined,
    };

    const batch: StageBatchInput = {
      stageKey: 'rifinitura',
      lotCode: form.lotCode,
      variety: form.variety,
      inputWeight: input,
      outputWeight: output,
      scrapWeight: scrap,
      scrapDetails,
      residualWeight: residual,
      buckets: { grandi, medi, mini, trinciato },
      qualityGrade: (form.qualityGrade as 'A' | 'B' | 'C' | undefined),
      status: form.status,
      operatorName: form.operatorName || user?.email || 'Unknown',
      operatorEmail: form.operatorEmail,
      notes: form.notes,
    };

    try {
      await addStageBatch(batch);

      const { error } = await supabase.from('processing_runs').insert([
        {
          stage: 'rifinitura',
          lot_code: form.lotCode,
          variety: form.variety,
          input_weight_kg: input,
          output_weight_kg: output,
          scrap_weight_kg: scrap,
          scrap_biomassa_kg: biomass,
          scrap_muffa_kg: mould,
          scrap_rami_kg: wood,
          residual_weight_kg: residual,
          total_output_kg: output,
          buckets: { grandi, medi, mini, trinciato },
          quality_grade: form.qualityGrade || null,
          status: form.status,
          operator_name: form.operatorName,
          operator_email: form.operatorEmail,
          diff_kg: 0,
          notes: form.notes,
        },
      ]);

      if (error) throw error;

      alert('✅ Batch saved!');
      setForm({
        lotCode: '',
        variety: '',
        inputWeight: '',
        outputWeight: '',
        scrapWeight: '',
        scrapBiomass: '',
        scrapMould: '',
        scrapWood: '',
        residualWeight: '',
        qualityGrade: '',
        status: 'Completato',
        operatorName: '',
        operatorEmail: user?.email || '',
        notes: '',
      });
      setDistribution({ grandi: '', medi: '', mini: '', trinciato: '' });
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error saving batch');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sala Rifinitura (Final Processing)</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Lot Code"
          value={form.lotCode}
          onChange={(e) => handleFormChange('lotCode', e.target.value)}
          className="px-3 py-2 border rounded bg-gray-900 text-white"
        />
        <input
          type="text"
          placeholder="Variety"
          value={form.variety}
          onChange={(e) => handleFormChange('variety', e.target.value)}
          className="px-3 py-2 border rounded bg-gray-900 text-white"
        />
      </div>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-lg font-bold mb-4">📊 Weights (kg)</h3>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Input</label>
            <input type="number" step="0.001" value={form.inputWeight} onChange={(e) => handleFormChange('inputWeight', e.target.value)} className="w-full px-2 py-1 border rounded bg-gray-900 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Output</label>
            <input type="number" step="0.001" value={form.outputWeight} onChange={(e) => handleFormChange('outputWeight', e.target.value)} className="w-full px-2 py-1 border rounded bg-gray-900 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Scrap</label>
            <input type="number" step="0.001" value={form.scrapWeight} onChange={(e) => handleFormChange('scrapWeight', e.target.value)} className="w-full px-2 py-1 border rounded bg-gray-900 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Residual</label>
            <input type="number" step="0.001" value={form.residualWeight} onChange={(e) => handleFormChange('residualWeight', e.target.value)} className="w-full px-2 py-1 border rounded bg-gray-900 text-white text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-lg font-bold mb-4">♻️ Scrap Details (kg)</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Biomassa</label>
            <input type="number" step="0.001" value={form.scrapBiomass} onChange={(e) => handleFormChange('scrapBiomass', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Muffa</label>
            <input type="number" step="0.001" value={form.scrapMould} onChange={(e) => handleFormChange('scrapMould', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rami</label>
            <input type="number" step="0.001" value={form.scrapWood} onChange={(e) => handleFormChange('scrapWood', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-lg font-bold mb-4">📦 Category Distribution (kg)</h3>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Grandi</label>
            <input type="number" step="0.001" value={distribution.grandi} onChange={(e) => handleDistributionChange('grandi', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Medi</label>
            <input type="number" step="0.001" value={distribution.medi} onChange={(e) => handleDistributionChange('medi', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mini</label>
            <input type="number" step="0.001" value={distribution.mini} onChange={(e) => handleDistributionChange('mini', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trinciato</label>
            <input type="number" step="0.001" value={distribution.trinciato} onChange={(e) => handleDistributionChange('trinciato', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Quality Grade (A/B/C)</label>
          <select value={form.qualityGrade} onChange={(e) => handleFormChange('qualityGrade', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white">
            <option value="">-- None --</option>
            <option value="A">A (Excellent)</option>
            <option value="B">B (Good)</option>
            <option value="C">C (Standard)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={form.status} onChange={(e) => handleFormChange('status', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white">
            <option value="Completato">✅ Completato</option>
            <option value="In lavorazione">🔄 In lavorazione</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Operator Name</label>
          <input type="text" value={form.operatorName} onChange={(e) => handleFormChange('operatorName', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" placeholder="Name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Operator Email</label>
          <input type="email" value={form.operatorEmail} onChange={(e) => handleFormChange('operatorEmail', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" placeholder="Email" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea value={form.notes} onChange={(e) => handleFormChange('notes', e.target.value)} className="w-full px-3 py-2 border rounded bg-gray-900 text-white" placeholder="Optional notes..." rows={3} />
      </div>

      <button onClick={validateAndSave} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded">
        💾 Save Batch
      </button>
    </div>
  );
};

export default FinishingProcessing;
