export interface Shareholder {
  shareholder: string;
  percentage: string;
}

export interface Company {
  id: string;
  name: string;
  marketCap: string;
  shares: Shareholder[];
}

export interface IndustryGroup {
  title: string;
  companies: Company[];
}

export interface CorporateDataMap {
  [key: string]: IndustryGroup;
}

export interface ParticipationTier {
  name: string;
  ownership: number; // percentage of parent ownership
  assets: number; // asset value in billions
  controlledByParent: boolean;
}

export interface SimulationLog {
  year: number;
  realValue: number;
  virtualValue: number;
  bubbleRisk: number;
  status: "Ổn định" | "Cảnh báo" | "VỠ BONG BÓNG";
}
