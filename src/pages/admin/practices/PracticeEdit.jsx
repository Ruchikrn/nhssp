import React, { Component } from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  NavItem,
  NavLink,
  Nav,
  TabPane
} from "reactstrap";
import PracticeForm from "./PracticeForm";
import PracticeAction from "./PracticeAction";
import PracticeFilesForm from "./PracticeFilesForm";

class PracticeEdit extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <h5 className="mb-0">
              Edit पहल
              <span className="float-right">
                <PracticeAction
                  data={this.props.data}
                  action="set_for_homepage"
                  onSuccess={() => null}
                >
                  <Button color="secondary mr-2" outline>
                    Set for homepage
                  </Button>
                </PracticeAction>
                <PracticeAction
                  data={this.props.data}
                  action="reject"
                  onSuccess={this.props.fetchData}
                >
                  <Button
                    color="secondary mr-2"
                    outline
                    disabled={this.props.data.status === "rejected"}
                  >
                    Reject
                  </Button>
                </PracticeAction>
                <PracticeAction
                  data={this.props.data}
                  action="approve"
                  onSuccess={this.props.fetchData}
                >
                  <Button
                    color="secondary"
                    outline
                    disabled={this.props.data.status === "approved"}
                  >
                    Approve
                  </Button>
                </PracticeAction>
              </span>
            </h5>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Detail
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Files
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="mt-2" activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <PracticeForm data={this.props.data} />
              </TabPane>
              <TabPane tabId="2">
                <PracticeFilesForm data={this.props.data} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default PracticeEdit;
