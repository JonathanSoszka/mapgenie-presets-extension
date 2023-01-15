export type Selection = {
  name: string;
  clickableElementId: string;
};

export type Preset = {
  name: string;
  selections: Selection[];
};

export type Presets = Record<string, Preset>;
