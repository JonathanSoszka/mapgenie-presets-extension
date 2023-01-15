import { Bindable } from "./reactivity";

// UI LIB
export function div(children?: (HTMLElement | undefined)[]) {
  const div = document.createElement("div");
  if (children) {
    for (const child of children) {
      if (child) div.appendChild(child);
    }
  }
  return div;
}

export function p(text: string) {
  const p = document.createElement("p");
  p.innerHTML = text;
  return p;
}

type ButtonOptions = {
  onClick?: GlobalEventHandlers["onclick"];
  color?: string;
};
export function button(text: string, options?: ButtonOptions) {
  const button = document.createElement("button");
  button.innerHTML = text;

  if (!options) return button;

  if (options.onClick) {
    button.addEventListener("click", options.onClick);
  }

  if (options.color) {
    button.style.color = options.color;
  }

  return button;
}

export function input(placeholder, { bindTo }: { bindTo: Bindable<any> }) {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  input.addEventListener("change", function (e) {
    bindTo.value = this.value;
  });
  return input;
}

export function renderIf(
  condition: boolean | object | number | string | undefined | null,
  element: HTMLElement,
  elseElement?: HTMLElement
) {
  if (condition) {
    return element;
  }

  if (elseElement) return elseElement;
}
