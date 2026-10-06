export type StageId = 1 | 2 | 3 | 4 | 5 | 6;

export interface StageInfo {
  id: StageId;
  numberStr: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  detailedExplanation: string;
  biologicalSignificance: string;
  nextStageHint: string;
  chemicalEquation?: string;
  keyMolecules: string[];
}

export type SelectedEntityId = 
  | 'outer_membrane'
  | 'intermembrane_space'
  | 'inner_membrane'
  | 'cristae'
  | 'matrix'
  | 'substrates'
  | 'tca_cycle'
  | 'complex_i'
  | 'complex_ii'
  | 'coq'
  | 'complex_iii'
  | 'cytochrome_c'
  | 'complex_iv'
  | 'oxygen_reduction'
  | 'atp_synthase'
  | 'proton_gradient'
  | 'atp_generation';

export interface BiologicalEntity {
  id: SelectedEntityId;
  name: string;
  nameEn: string;
  location: string;
  function: string;
  bulletPoints?: string[];
  stoichiometry?: string;
  prostheticGroups?: string;
  clinicalOrInhibitorNote?: string;
  chemicalFormula?: string;
}

export type InhibitorType = 'none' | 'rotenone' | 'antimycin_a' | 'cyanide' | 'oligomycin' | 'dnp';

export interface InhibitorInfo {
  id: InhibitorType;
  name: string;
  nameEn: string;
  target: string;
  effect: string;
  description: string;
}
