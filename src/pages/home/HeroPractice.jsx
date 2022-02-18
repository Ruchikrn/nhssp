import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { hidden } from 'ansi-colors';
import { truncateHero } from '../../utils/truncate';
import strftime from 'strftime';
import {
  englishToNepaliNumber
} from 'nepali-number';

const truncateParams = {
  length: 250, separator: '।', omission: '। ...'
}

const style = {
  minHeight: '380px',
}

class HeroPractice extends Component {
  render() {
    const data = this.props.data;
    return (
      <div
        style={style}
        className="jumbotron p-3 p-md-5 text-dark rounded featured-jumbotron mb-0"
      >
        <div className="col-md-12 px-0">
          <h1 className="display-6">
            {data ? (
              <Link
                to={`/practices/${data.id}`}
                className="card-link text-dark"
              >
                {data.title}
              </Link>
            ) : (
              <Skeleton />
            )}
          </h1>
          <span className="date my-2 text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="16px"
              height="16px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            &nbsp;
            {data ? (
              englishToNepaliNumber(
                strftime('%Y-%m-%d', new Date(data.created_at))
              )
            ) : (
              <Skeleton />
            )}
          </span>
          <p className="lead my-3">
            {data ? truncateHero(data.description) : <Skeleton count={7} />}
          </p>
          <p className="lead mb-0">
            {data ? (
              <Link
                to={`/practices/${data.id}`}
                className=" text-dark font-weight-bold"
              >
                क्रमश ...
              </Link>
            ) : (
              <></>
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default HeroPractice;