import { PresetsManager } from "./features/presets/components/presets"
import {render} from "react-dom"
import {createRoot} from "react-dom/client"

const mapGenieContainerElement = document.querySelector(
  ".panel"
);

const mapGenieHookElement = document.querySelector(
  "#sidebar-categories-wrapper"
);


const rootElement = document.createElement("div");

mapGenieContainerElement?.insertBefore(rootElement, mapGenieHookElement);



// const contentElement = document.createElement("div");
// rootElement.appendChild(contentElement);

export const root = createRoot(rootElement)
root.render(<PresetsManager/>)








