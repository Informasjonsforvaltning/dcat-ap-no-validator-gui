import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ValidationReport } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  validationReport: ValidationReport | null;
  validatorActions: typeof actions;
  isValidating: boolean;
  errorOccured: boolean;
}

const withValidator = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    validationReport:
      state.ValidatorReducer.get('validationReport')?.toJS() ?? null,
    isValidating: state.ValidatorReducer.get('isValidating') ?? false,
    errorOccured: state.ValidatorReducer.get('errorOccured') ?? false
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    validatorActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withValidator;
