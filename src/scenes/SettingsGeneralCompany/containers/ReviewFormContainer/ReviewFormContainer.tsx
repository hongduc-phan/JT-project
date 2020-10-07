import {connect} from 'react-redux';
import {RootState} from '../../../../store';
import ReviewForm from '../../components/ReviewForm';

const mapStateToProp = ({companies}: RootState) => {
  return {
    company: companies.default.data,
  };
};

export default connect(
  mapStateToProp,
  null,
)(ReviewForm);
