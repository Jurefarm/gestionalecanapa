// Product categories
export type ProductCategory = 'grandi' | 'medi' | 'mini' | 'trinciato' | 'biomassa' | 'muffa';
export type QualityGrade = 'A' | 'B' | 'C';
export type ProcessingStatus = 'Completato' | 'In lavorazione';

// Scrap details - separate tracking for waste materials
export interface ScrapDetails {
  biomassa?: number;  // Biomass waste (kg)
  muffa?: number;     // Mould waste (kg)
  rami?: number;      // Wood/branch waste (kg)
}

// Category weight tracking
export interface CategoryWeight {
  grandi?: number;
  medi?: number;
  mini?: number;
  trinciato?: number;
  biomassa?: number;
  muffa?: number;
}

// Lot - incoming material batch
export interface Lot {
  id: string;
  code: string;
  supplier: string;
  variety: string;
  weight: number;
  date: string;
  categoryWeights?: CategoryWeight;
}

// Input for creating a new batch in a processing stage
export interface StageBatchInput {
  stageKey: string;
  lotCode: string;
  variety: string;
  inputWeight: number;
  outputWeight: number;
  scrapWeight: number;
  scrapDetails: ScrapDetails;  // NEW: separated scrap subcategories
  residualWeight: number;
  buckets: { [key: string]: number };
  categoryWeights?: CategoryWeight;
  qualityGrade?: QualityGrade;  // NEW: A/B/C quality
  status: ProcessingStatus;      // NEW: Completato or In lavorazione
  operatorName: string;          // NEW: operator tracking
  operatorEmail: string;         // NEW: operator email for audit
  notes?: string;
}

// Batch - processed output
export interface StageBatch {
  id: string;
  stageKey: string;
  lotCode: string;
  variety: string;
  inputWeight: number;
  outputWeight: number;
  scrapWeight: number;
  scrapDetails: ScrapDetails;    // NEW: separated scrap subcategories
  residualWeight: number;
  totalOutput: number;
  buckets: { [key: string]: number };
  categoryWeights?: CategoryWeight;
  qualityGrade?: QualityGrade;   // NEW: quality marking
  status: ProcessingStatus;       // NEW: status state
  operatorName: string;           // NEW: who processed
  operatorEmail: string;          // NEW: operator audit
  date: string;
  notes?: string;
}

// Sub-lot - individual product subdivision
export interface SubLot {
  id: string;
  parentLotId: string;
  code: string;
  category: ProductCategory;
  weight: number;
  createdAt: string;
  status: 'active' | 'finished' | 'scrap';
}

// New sub-lot creation input
export interface NewSubLotInput {
  parentLotId: string;
  code: string;
  category: ProductCategory;
  weight: number;
}

// Processing run - database record
export interface ProcessingRun {
  id: string;
  created_at: string;
  stage: string;
  lot_code: string;
  variety: string;
  input_weight_kg: number;
  output_weight_kg: number;
  scrap_weight_kg: number;
  scrap_biomassa_kg?: number;   // NEW: biomass scrap detail
  scrap_muffa_kg?: number;       // NEW: mould scrap detail
  scrap_rami_kg?: number;        // NEW: wood scrap detail
  residual_weight_kg: number;
  total_output_kg: number;
  buckets: Record<string, number>;
  category_weights?: Record<string, number>;
  quality_grade?: QualityGrade;  // NEW: quality
  status: ProcessingStatus;       // NEW: processing status
  operator_name: string;          // NEW: operator name
  operator_email: string;         // NEW: operator email
  diff_kg: number;
  notes?: string;
}

// Material movement - transfer between stages
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

// Finished product
export interface FinishedProduct {
  id: string;
  name: string;
  description: string;
  baseWeight: number;
}

// Auth context
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Utility: category availability
export interface CategoryAvailability {
  category: ProductCategory;
  available: number;
  processed: number;
  pending: number;
}
