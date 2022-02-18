import _ from 'lodash'
import {connect} from 'react-redux'
import { refreshDistrictOptions, setDistrictAndDependants } from '../../actions/autoCompleteOptions';
import LabelledSelect from './LabelledSelect';
import { getFilteredDistricts } from '../../selectors';

const mapStateToProps = (state, ownProps) => {
    var selectedProvinces = _.has(ownProps, 'selectedProvinces') ? ownProps.selectedProvinces : state.autocomplete.province.selected;
    return {
        label: "जिल्ला",
        options: getFilteredDistricts(state, selectedProvinces),
        loading: state.autocomplete.district.loading,
        value: _.has(ownProps, 'value') ? ownProps.value : state.autocomplete.district.selected
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      refreshOptions: () => {
        dispatch(refreshDistrictOptions())
      },
      onChange: (props) => {
        if(_.has(ownProps, 'onChange')) {
          ownProps['onChange'](props)
        } 
        else {
          dispatch(setDistrictAndDependants(props))
        }
      } 
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LabelledSelect);