
export function getActiveSelections() {
  const selectionElements = [...document.querySelectorAll(".category-visible")];
  const selections = selectionElements.map((node) => ({
    name: node?.querySelector(".title")?.textContent || "",
    clickableElementId: node.id,
  }));
  return selections;
}

export function activatePresetSelections(preset: Preset) {
  const hideAllButton = document?.querySelector(
    "#hide-all"
  ) as HTMLButtonElement;
  hideAllButton.click();

  for (const selection of preset.selections) {
    const selectionButton = document.querySelector(
      `#${selection.clickableElementId}`
    ) as HTMLButtonElement;
    selectionButton.click();
  }
}

