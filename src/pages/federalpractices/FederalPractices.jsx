import React, { Component } from 'react';
import { FederalPracticesBreadcrumb } from '../../components/Breadcrumbs';
import Axios from 'axios';
import _ from 'lodash';
import Skeleton from 'react-loading-skeleton';
import { CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

class FederalPractices extends Component {
  state = {
    loading: false,
    publishedPractices: [],
    draftPractices: [],
    data: [],
  };
  fetchData = () => {
    this.setState({ loading: true });
    //api/federalpractices/
    Axios.get('/api/practices/?page_size=1000').then((res) => {
      const data = res.data.results;
      const publishedPractices = _.filter(res.data.results, { draft: false });
      const draftPractices = _.filter(res.data.results, { draft: true });
      this.setState({ loading: false, publishedPractices, draftPractices, data });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { loading, draftPractices, publishedPractices, data } = this.state;
    console.log(data, 'data');
    if (loading) return <div>Loading..</div>;
    return (
      <div>
        <FederalPracticesBreadcrumb />
        <div className="mt-2">
          {/* <h1 className="h3">पारित भएका दस्ताबेजहरु</h1> */}
          <hr />

          {this.state.loading && <Skeleton count={5} />}
          <ol style={{ listStyle: 'devanagari' }}>
            {data.map((practice) => (
              <li key={practice.id}>
                {/* <a target="_blank" href={practice.url}>
                  {practice.title}
                </a> */}
                <CardHeader className="text-primary">
                  <h2 className="h5">
                    <Link to={`/practices/${practice.id}`}>{practice.title}</Link>

                    <br />
                  </h2>
                </CardHeader>
              </li>
            ))}
          </ol>
        </div>
        {/* <div className="mt-4">
          <h1 className="h3">मस्यौदाका रुपमा रहेका दस्ताबेजहरु</h1>
          <hr />
          {this.state.loading && <Skeleton count={5} />}

          <ol style={{ listStyle: 'devanagari' }}>
            {draftPractices.map((practice) => (
              <li key={practice.id}>{practice.title}</li>
            ))}
          </ol>
        </div> */}
      </div>
    );
  }
}

export default FederalPractices;
