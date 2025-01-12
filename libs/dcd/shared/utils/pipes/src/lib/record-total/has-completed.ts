interface hasCompletedProps {
  state: unknown;
  objectives: { complete: boolean }[];
  intervalObjectives: { complete: boolean }[];
}
export const hasCompleted = (value: hasCompletedProps): boolean => {
  if (value === undefined || value.state === undefined) {
    return false;
  }
  // return value.objectives[value.objectives.length -1]?.complete;
  if (value.objectives) {
    return value.objectives.every((x) => x.complete);
  }
  if (value.intervalObjectives) {
    return value.intervalObjectives.every((x) => x.complete);
  }
  return false;
};
