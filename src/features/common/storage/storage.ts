export const storage = {
  save(key: string, data: any) {
    localStorage.setItem(`mapgenie-tools:${key}`, JSON.stringify(data));
  },
  load<T = unknown>(key: string) : T | undefined {
    const data = localStorage.getItem(`mapgenie-tools:${key}`);
    if (!data) return undefined;
    return JSON.parse(data);
  },
  remove(key: string){
    localStorage.removeItem(`mapgenie-tools:${key}`);
  }
};
