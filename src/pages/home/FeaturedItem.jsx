import React, { Component } from "react";
import _ from "lodash";
import { Card, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { truncateFeatured } from "../../utils/truncate";
import strftime from 'strftime';
import { englishToNepaliNumber } from 'nepali-number';

const truncateParams = {
  length: 300,
  separator: "। ",
  omission: "। ..."
};

class FeaturedItem extends Component {
  render() {
    const data = this.props.data;
    return (
      <Card className="box-shadow mt-4">
        <div className="card-body d-flex flex-column align-items-start">
          {data.programs_detail.slice(0, 1).map((program_detail) => (
            <strong className="d-inline-block mb-2">
              {program_detail.name}
            </strong>
          ))}
          <h3 className="mb-0">
            {(data && data.title && (
              <Link
                to={`/practices/${data.id}`}
                className="card-link text-dark"
              >
                {data.title}
              </Link>
            )) || <Skeleton />}
          </h3>
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
          <div className="mb-4 text-muted" />
          <p className="card-text">
            {(data && truncateFeatured(data.description)) || (
              <Skeleton count={2} />
            )}
          </p>
          {data && (
            <Link to={`/practices/${data.id}`} className="mt-auto">
              <Button color="primary">थप जानकारी</Button>
            </Link>
          )}
        </div>
      </Card>
    );
  }
}

export default FeaturedItem;
