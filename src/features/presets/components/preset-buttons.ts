import { div, button } from "../../../core/ui/components";
import { recordValues } from "../../../core/utility/record";
import { Presets, Preset } from "../types";

type PresetButtonsProps = {
  presets: Presets;
  activePreset: Preset | undefined;
  onPresetSelected: (Preset) => void;
};

export function presetButtons(props: PresetButtonsProps) {
  const { presets, activePreset, onPresetSelected } = props;
  return div(
    recordValues(presets).map((preset) =>
      presetButton({
        preset,
        isActive: preset.name == activePreset?.name,
        onClick: (preset) => onPresetSelected(preset),
      })
    )
  );
}

type PresetButtonProps = {
  preset: Preset;
  isActive: boolean;
  onClick: (Preset) => void;
};

function presetButton(props: PresetButtonProps) {
  const { preset, isActive, onClick } = props;
  const { name, selections } = preset;
  return button(name, {
    onClick: () => {
      onClick(preset);
    },
    color: isActive ? "green" : "black",
  });
}
