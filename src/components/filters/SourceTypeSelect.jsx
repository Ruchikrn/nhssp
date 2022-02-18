import _ from 'lodash'
import {connect} from 'react-redux'
import { refreshSourceTypeOptions, setSourceTypeSelected } from '../../actions/autoCompleteOptions';
import LabelledSelect from './LabelledSelect';

const mapStateToProps = (state, ownProps) => {
    return {
        label: "जानकारीको श्रोत",
        options: state.autocomplete.sourceType.options,
        loading: state.autocomplete.sourceType.loading,
        value: _.has(ownProps, 'value') ? ownProps.value : state.autocomplete.sourceType.selected
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      refreshOptions: () => {
        dispatch(refreshSourceTypeOptions())
      },
      onChange: (props) => {
        if(_.has(ownProps, 'onChange')) {
          ownProps['onChange'](props)
        } 
        else {
          dispatch(setSourceTypeSelected(props))
        }
      } 
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LabelledSelect);