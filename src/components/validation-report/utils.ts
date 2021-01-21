import type { ValidationResult, GroupedValidationResults } from '../../types';
import { Severity } from '../../types/enums';

export const isError = ({ resultSeverity }: ValidationResult) =>
  resultSeverity === Severity.VIOLATION;

export const isWarning = ({ resultSeverity }: ValidationResult) =>
  resultSeverity === Severity.WARNING;

export const isTip = ({ resultSeverity }: ValidationResult) =>
  resultSeverity === Severity.INFO;

export const groupValidationResults = (results: ValidationResult[]) =>
  results.reduce(
    (previous, current) => ({
      ...previous,
      [current.entityId]: {
        entityId: current.entityId,
        entityType: current.entityType,
        entries: {
          ...previous?.[current.entityId]?.entries,
          [current.resultPath]: [
            ...(previous?.[current.entityId]?.entries?.[current.resultPath] ??
              []),
            current
          ]
        }
      }
    }),
    {} as Record<string, GroupedValidationResults>
  );
