import { PresetsManager } from "../../features/presets/components/presets";
import { createRoot } from "react-dom/client";


const presets = createReactApp(<PresetsManager/>)
injectPresetsApp(presets)

function createReactApp(rootComponent: JSX.Element) {
  const rootElement = document.createElement("div");
  const root = createRoot(rootElement);
  root.render(<PresetsManager />);
  return rootElement;
}

function injectPresetsApp(presetsContainer: HTMLElement) {
  const mapGenieContainerElement = document.querySelector(".panel");

  const mapGenieContainerInsertPoint = document.querySelector(
    "#sidebar-categories-wrapper"
  );

  mapGenieContainerElement?.insertBefore(
    presetsContainer,
    mapGenieContainerInsertPoint
  );

}
