/// <reference lib="dom" />

export function isMobile(window: Window): boolean {
  return window.matchMedia('(max-width: 700px)').matches;
}
