import _ from 'lodash'
import {connect} from 'react-redux'
import { refreshLocalBodyOptions, setLocalBodySelected } from '../../actions/autoCompleteOptions';
import LabelledSelect from './LabelledSelect';
import { getFilteredLocalBodies } from '../../selectors';

const mapStateToProps = (state, ownProps) => {
    var selectedDistricts = _.has(ownProps, 'selectedDistricts') ? ownProps.selectedDistricts : state.autocomplete.district.selected;
    return {
        label: 'स्थानिय तह',
        options: getFilteredLocalBodies(state, selectedDistricts),
        loading: state.autocomplete.localBody.loading,
        value: _.has(ownProps, 'value') ? ownProps.value : state.autocomplete.localBody.selected
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      refreshOptions: () => {
        dispatch(refreshLocalBodyOptions())
      },
      onChange: (props) => {
        if(_.has(ownProps, 'onChange')) {
          ownProps['onChange'](props)
        } 
        else {
          dispatch(setLocalBodySelected(props))
        }
      } 
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LabelledSelect);