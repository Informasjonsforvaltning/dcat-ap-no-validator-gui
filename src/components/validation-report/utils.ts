import type { ValidationResult } from '../../types';
import { Vocabulary, Severity } from '../../types/enums';

export const isError = ({ resultSeverity }: ValidationResult) =>
  resultSeverity === `${Vocabulary.SHACL}${Severity.VIOLATION}`;

export const isWarning = ({ resultSeverity }: ValidationResult) =>
  resultSeverity === `${Vocabulary.SHACL}${Severity.WARNING}`;

export const isTip = ({ resultSeverity }: ValidationResult) =>
  resultSeverity === `${Vocabulary.SHACL}${Severity.INFO}`;

export const groupValidationResults = (
  results: ValidationResult[],
  defaultGroup: string
) => {
  const sortGroups = (_: any, [currentKey]: any) =>
    currentKey === defaultGroup ? -1 : 1;

  return Object.entries(
    results.reduce(
      (previous, current) => ({
        ...previous,
        [current.entityId || defaultGroup]: {
          ...previous?.[current.entityId || defaultGroup],
          [current.resultPath]: [
            ...(previous?.[current.entityId || defaultGroup]?.[
              current.resultPath
            ] ?? []),
            current
          ]
        }
      }),
      {} as Record<string, Record<string, ValidationResult[]>>
    )
  ).sort(sortGroups);
};

export const getEntityTypes = (
  validationResults: Record<string, ValidationResult[]>
) => Object.values(validationResults)[0][0].entityTypes;
