import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Definition, ValidationReport } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  shapesCollection: Definition[] | null;
  shapesError: Error | null;
  ontologyCollection: Definition[] | null;
  ontologyError: Error | null;
  validationReport: ValidationReport | null;
  validationError: Error | null;
  validatorActions: typeof actions;
  isValidating: boolean;
  isFetchIngShapes: boolean;
  isFetchIngOntologies: boolean;
}

const withValidator = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    validationReport:
      state.ValidatorReducer.get('validationReport')?.toJS() ?? null,
    validationError:
      state.ValidatorReducer.get('validationError')?.toJS() ?? null,
    isValidating: state.ValidatorReducer.get('isValidating') ?? false,
    shapesCollection:
      state.ValidatorReducer.get('shapesCollection')?.toJS() ?? null,
    shapesError: state.ValidatorReducer.get('shapesError')?.toJS() ?? null,
    isFetchingShapes: state.ValidatorReducer.get('isFetchingShapes') ?? false,
    ontologyCollection:
      state.ValidatorReducer.get('ontologyCollection')?.toJS() ?? null,
    ontologyError: state.ValidatorReducer.get('ontologyError')?.toJS() ?? null,
    isFetchingOntologies:
      state.ValidatorReducer.get('isFetchingOntologies') ?? false
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    validatorActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withValidator;
