export interface HudToolSpec {
  label: string;
  icon: string;
  run: () => void;
  keycombo?: string;
  keyhint?: string;
  active?: boolean;
  position?: string;
  gap?: number;
}
