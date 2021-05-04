import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Definition, ValidationReport } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  shapes: Definition[] | null;
  shapesError: Error | null;
  ontologies: Definition[] | null;
  ontologiesError: Error | null;
  validationReport: ValidationReport | null;
  validationError: Error | null;
  validatorActions: typeof actions;
  isValidating: boolean;
  isFetchingShapes: boolean;
  isFetchingOntologies: boolean;
}

const withValidator = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    validationReport:
      state.ValidatorReducer.get('validationReport')?.toJS() ?? null,
    validationError:
      state.ValidatorReducer.get('validationError')?.toJS() ?? null,
    isValidating: state.ValidatorReducer.get('isValidating') ?? false,
    shapes: state.ValidatorReducer.get('shapes')?.toJS() ?? null,
    shapesError: state.ValidatorReducer.get('shapesError')?.toJS() ?? null,
    isFetchingShapes: state.ValidatorReducer.get('isFetchingShapes') ?? false,
    ontologies: state.ValidatorReducer.get('ontologies')?.toJS() ?? null,
    ontologiesError:
      state.ValidatorReducer.get('ontologiesError')?.toJS() ?? null,
    isFetchingOntologies:
      state.ValidatorReducer.get('isFetchingOntologies') ?? false
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    validatorActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withValidator;
