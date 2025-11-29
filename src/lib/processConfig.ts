export type StageKey = 'sbocciolo' | 'beta' | 'rifinitura';
export type Direction = 
  | 'grandi_to_beta' 
  | 'grandi_to_rifinitura' 
  | 'mix_med_mini_to_beta' 
  | 'trim_finito' 
  | 'scarti' 
  | 'muffa';
export type MaterialKind = 'fiori_grandi' | 'fiori_medi' | 'fiori_mini' | 'trinciato_finito' | 'scarti' | 'muffa' | 'pali';

export interface StageBucket {
  label: string;
  direction: Direction;
  materialKind: MaterialKind;
  color: string;
}

export const STAGE_LABELS: Record<StageKey, string> = {
  sbocciolo: 'Sala Sbocciolo',
  beta: 'Sala Beta',
  rifinitura: 'Sala Rifinitura',
};

export const STAGE_BUCKETS: Record<StageKey, Record<string, StageBucket>> = {
  sbocciolo: {
    grandi_to_beta: {
      label: 'Fiori Grandi → Beta',
      direction: 'grandi_to_beta',
      materialKind: 'fiori_grandi',
      color: 'emerald',
    },
    grandi_to_rifinitura: {
      label: 'Fiori Grandi → Rifinitura',
      direction: 'grandi_to_rifinitura',
      materialKind: 'fiori_grandi',
      color: 'emerald',
    },
    mix_med_mini_to_beta: {
      label: 'Medi/Mini → Beta',
      direction: 'mix_med_mini_to_beta',
      materialKind: 'fiori_medi',
      color: 'amber',
    },
    trim_finito: {
      label: 'Trinciato Finito',
      direction: 'trim_finito',
      materialKind: 'trinciato_finito',
      color: 'violet',
    },
    scarti: {
      label: 'Scarti',
      direction: 'scarti',
      materialKind: 'scarti',
      color: 'gray',
    },
    muffa: {
      label: 'Muffa',
      direction: 'muffa',
      materialKind: 'muffa',
      color: 'red',
    },
  },
  beta: {
    grandi_to_rifinitura: {
      label: 'Fiori Grandi → Rifinitura',
      direction: 'grandi_to_rifinitura',
      materialKind: 'fiori_grandi',
      color: 'emerald',
    },
    mix_med_mini_to_beta: {
      label: 'Mix Medi/Mini',
      direction: 'mix_med_mini_to_beta',
      materialKind: 'fiori_medi',
      color: 'amber',
    },
    trim_finito: {
      label: 'Trinciato Finito',
      direction: 'trim_finito',
      materialKind: 'trinciato_finito',
      color: 'violet',
    },
    scarti: {
      label: 'Scarti',
      direction: 'scarti',
      materialKind: 'scarti',
      color: 'gray',
    },
    muffa: {
      label: 'Muffa',
      direction: 'muffa',
      materialKind: 'muffa',
      color: 'red',
    },
  },
  rifinitura: {
    trim_finito: {
      label: 'Trinciato Finito',
      direction: 'trim_finito',
      materialKind: 'trinciato_finito',
      color: 'violet',
    },
    scarti: {
      label: 'Scarti',
      direction: 'scarti',
      materialKind: 'scarti',
      color: 'gray',
    },
    muffa: {
      label: 'Muffa',
      direction: 'muffa',
      materialKind: 'muffa',
      color: 'red',
    },
  },
};
