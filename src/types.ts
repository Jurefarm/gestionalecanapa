export type ProductCategory = 'large' | 'medium' | 'small' | 'trim' | 'waste' | 'mould';

export interface CategoryWeight {
  large?: number;
  medium?: number;
  small?: number;
  trim?: number;
  waste?: number;
  mould?: number;
}

export interface Lot {
  id: string;
  code: string;
  supplier: string;
  variety: string;
  weight: number;
  date: string;
  categoryWeights?: CategoryWeight;
}

export interface StageBatchInput {
  stageKey: string;
  lotCode: string;
  variety: string;
  inputWeight: number;
  buckets: { [key: string]: number };
  categoryWeights?: CategoryWeight;
}

export interface StageBatch {
  id: string;
  stageKey: string;
  lotCode: string;
  variety: string;
  inputWeight: number;
  totalOutput: number;
  buckets: { [key: string]: number };
  date: string;
  categoryWeights?: CategoryWeight;
}

export interface SubLot {
  id: string;
  parentLotId: string;
  code: string;
  category: ProductCategory;
  weight: number;
  createdAt: string;
  status: 'active' | 'finished' | 'scrap';
}

export interface NewSubLotInput {
  parentLotId: string;
  code: string;
  category: ProductCategory;
  weight: number;
}

export interface ProcessingRun {
  id: string;
  created_at: string;
  stage: string;
  lot_code: string;
  variety: string;
  input_weight_kg: number;
  total_output_kg: number;
  buckets: Record<string, number>;
  diff_kg: number;
  operator_email: string;
  notes?: string;
}

export interface FinishedProduct {
  id: string;
  name: string;
  description: string;
  baseWeight: number;
}

export interface Company {
  id: string;
  name: string;
  role: 'supplier' | 'customer';
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Variety {
  id: string;
  name: string;
  description?: string;
}
