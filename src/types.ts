// Product categories
export type ProductCategory = 'grandi' | 'medi' | 'mini' | 'trinciato' | 'biomassa' | 'muffa';
export type QualityGrade = 'A' | 'B' | 'C';
export type ProcessingStatus = 'Completato' | 'In lavorazione';

export interface ScrapDetails {
  biomassa?: number;
  muffa?: number;
  rami?: number;
}

export interface CategoryWeight {
  grandi?: number;
  medi?: number;
  mini?: number;
  trinciato?: number;
  biomassa?: number;
  muffa?: number;
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
  outputWeight: number;
  scrapWeight: number;
  scrapDetails: ScrapDetails;
  residualWeight: number;
  buckets: { [key: string]: number };
  categoryWeights?: CategoryWeight;
  qualityGrade?: QualityGrade;
  status: ProcessingStatus;
  operatorName: string;
  operatorEmail: string;
  notes?: string;
}

export interface StageBatch {
  id: string;
  stageKey: string;
  lotCode: string;
  variety: string;
  inputWeight: number;
  outputWeight: number;
  scrapWeight: number;
  scrapDetails: ScrapDetails;
  residualWeight: number;
  totalOutput: number;
  buckets: { [key: string]: number };
  categoryWeights?: CategoryWeight;
  qualityGrade?: QualityGrade;
  status: ProcessingStatus;
  operatorName: string;
  operatorEmail: string;
  date: string;
  notes?: string;
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
  output_weight_kg: number;
  scrap_weight_kg: number;
  scrap_biomassa_kg?: number;
  scrap_muffa_kg?: number;
  scrap_rami_kg?: number;
  residual_weight_kg: number;
  total_output_kg: number;
  buckets: Record<string, number>;
  category_weights?: Record<string, number>;
  quality_grade?: QualityGrade;
  status: ProcessingStatus;
  operator_name: string;
  operator_email: string;
  diff_kg: number;
  notes?: string;
}

export interface MovementInput {
  fromStage: string;
  toStage: string;
  lotCode: string;
  weight: number;
  category?: ProductCategory;
  operatorName: string;
  operatorEmail: string;
  notes?: string;
}

export interface Movement {
  id: string;
  created_at: string;
  from_stage: string;
  to_stage: string;
  lot_code: string;
  weight_kg: number;
  category?: ProductCategory;
  operator_name: string;
  operator_email: string;
  notes?: string;
}

export interface FinishedProduct {
  id: string;
  name: string;
  description: string;
  baseWeight: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface CategoryAvailability {
  category: ProductCategory;
  available: number;
  processed: number;
  pending: number;
}

export interface Company {
  id: string;
  name: string;
  role: 'supplier' | 'customer';
}

export interface Variety {
  id: string;
  name: string;
  description?: string;
}

export interface Company { id: string; name: string; role: 'supplier' | 'customer'; }
export interface Variety { id: string; name: string; description?: string; }
