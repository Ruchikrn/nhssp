import _ from "lodash";
import { connect } from "react-redux";
import {
  refreshProgramOptions,
  setProgramSelected,
  setProgramLoading
} from "../../actions/autoCompleteOptions";
import LabelledSelect from "./LabelledSelect";
import Axios from "axios";

const mapStateToProps = (state, ownProps) => {
  return {
    label: "कार्यक्रम",
    options: state.autocomplete.program.options,
    loading: state.autocomplete.program.loading,
    value: _.has(ownProps, "value")
      ? ownProps.value
      : state.autocomplete.program.selected
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    refreshOptions: () => {
      dispatch(refreshProgramOptions());
    },
    onChange: props => {
      if (_.has(ownProps, "onChange")) {
        ownProps["onChange"](props);
      } else {
        dispatch(setProgramSelected(props));
      }
    },
    onCreateOption: inputValue => {
      dispatch(setProgramLoading());
      const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`
      };

      Axios.post(
        "/api/programs/",
        { name: _.trim(inputValue) },
        { headers }
      ).then(res => {
        dispatch(refreshProgramOptions()).then(() => {
          ownProps["onChange"]([{ ...res.data }]);
        });
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelledSelect);
