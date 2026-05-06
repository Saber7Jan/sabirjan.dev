// src/fetch-shim.ts
export default typeof window !== 'undefined' ? window.fetch : null;
