import React, { Component } from "react";
import HomePageSearch from "./HomePageSearch";
import HeroPractice from "./HeroPractice";
import FeaturedItems from "./FeaturedItems";
import axios from "axios";
import GuidedTour from "./GuidedTour";
import InfiniteFeaturedItems from "./InfiniteFeaturedItems";

class HomePage extends Component {
  state = {
    heroPractice: null,
    featuredItems: []
  };
  async componentDidMount() {
    await axios.get('/api/homepage/').then((res) => {
      this.setState({
        heroPractice: res.data.hero_practice,
        featuredItems: res.data.featured_practices,
      });
    });
  }
  render() {
    return (
      <div>
        <GuidedTour />
        <div className="d-flex justify-content-around flex-wrap flex-md-nowrap">
          <div className="md-sticky-filter  align-self-top mr-md-4 col-md-4 card card-body homepagesearch">
            <HomePageSearch />
          </div>
          <div className="align-self-stretch" style={{ width: "100%" }}>
            <HeroPractice data={this.state.heroPractice} />
          </div>
        </div>
        <InfiniteFeaturedItems />
        <div className="mb-4" />
      </div>
    );
  }
}

export default HomePage;
