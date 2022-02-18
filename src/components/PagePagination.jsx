import React, { Component } from 'react'
import _ from 'lodash'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PagePagination extends Component {
    hasPrevious = () => {
        return this.props.pages && this.props.page !== 1;
    }
    hasNext = () => {
        return this.props.pages && this.props.page !== this.props.pages;
    }
    render() {
        var {onPageChange, page, pages} = this.props;
        return (
            <Pagination size="sm" aria-label="Page navigation" >
                <PaginationItem disabled={!this.hasPrevious()}>
                    <PaginationLink previous onClick={() => onPageChange(page - 1)} />
                </PaginationItem>

                {_.range(1, pages + 1).map(i => (
                    <PaginationItem key={i} active={page === i}>
                        <PaginationLink onClick={() => onPageChange(i)}>{i}</PaginationLink>
                    </PaginationItem>
                ))}
                
                <PaginationItem disabled={!this.hasNext()}>
                    <PaginationLink next onClick={() => onPageChange(page + 1)} />
                </PaginationItem>
            </Pagination>
        )
    }
}

export default PagePagination
