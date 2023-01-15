export type Bindable<T> = {
    value: T
  };
  
  export function bindable<T>(initalValue?: T) {
    return {
      value: initalValue,
    };
  }
  