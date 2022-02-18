import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class SubmittedPage extends Component {
  render() {
    var state = this.props.location.state;
    var submissionNumber = state ? state.id : "";
    return (
      <div className="text-center mt-4">
        <span className="display-1 mt-4">धन्यवाद</span>
        <br />
        <br />
        <span className="display-4 mt-4">
          तपाइले दिनुभएको जानकारी हामीलाई प्राप्त भयो ।
        </span>
        <br />
        <br />
        <span className="mt-4">
          <Link
            to="/practices"
            className="btn btn-outline btn-outline-secondary"
          >
            प्रकाशित पहलहरु हेर्नुहोस्{" "}
          </Link>
        </span>
      </div>
    );
  }
}

export default SubmittedPage;
