import {connect} from 'react-redux';
import {RootState} from '../../../../store';
import AddBankForm from '../../components/AddBankForm';
import {optionsActions} from '../../../../features/options';

const mapStateToProps = ({options}: RootState) => {
  return {
    countries: options.countries.list,
    banks: options.banks.list,
    states: options.states.list,
  };
};

const mapDispatchToProps = {
  onGetBanks: optionsActions.banksGet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBankForm);
