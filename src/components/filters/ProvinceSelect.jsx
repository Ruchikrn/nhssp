import _ from 'lodash'
import {connect} from 'react-redux'
import { refreshProvinceOptions, setProvinceAndDependants } from '../../actions/autoCompleteOptions';
import LabelledSelect from './LabelledSelect';

// const datall = {
//   count: 7,
//   next: null,
//   previous: null,
//   results: [
//     {
//       id: 1,
//       name: 'प्रदेश नम्बर १',
//     },
//     {
//       id: 4,
//       name: 'गण्डकी प्रदेश',
//     },
//     {
//       id: 6,
//       name: 'कर्णाली प्रदेश',
//     },
//     {
//       id: 7,
//       name: 'सुदूरपश्चिम प्रदेश',
//     },
//     {
//       id: 2,
//       name: 'मदेश प्रदेश',
//     },
//     {
//       id: 5,
//       name: 'लुम्बिनी  प्रदेश',
//     },
//     {
//       id: 3,
//       name: 'बागमती  प्रदेश',
//     },
//   ],
// };

// let sortedProvince = datall.results.slice().sort((a,b) => parseFloat(a.id) - parseFloat(b.id));
const mapStateToProps = (state, ownProps) => {
  let sorted = state.autocomplete.province.options.sort((a, b) => (a.id > b.id ? 1 : -1));
//console.log('sortedProvince', sorted);
    return {
        label: "प्रदेश",
        options: sorted,
        // options: datall.results,
        loading: state.autocomplete.province.loading,
        value: _.has(ownProps, 'value') ? ownProps.value : state.autocomplete.province.selected
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      refreshOptions: () => {
        dispatch(refreshProvinceOptions())
      },
      onChange: (props) => {
        if(_.has(ownProps, 'onChange')) {
          ownProps['onChange'](props)
        } 
        else {
          dispatch(setProvinceAndDependants(props))
        }
      } 
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LabelledSelect);