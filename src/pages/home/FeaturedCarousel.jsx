import React, { Component } from 'react';
import _ from 'lodash';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import FeaturedItem from './FeaturedItem';

class FeaturedCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = _.range(0, this.props.items.length - 1, 2).map((index) => {
      let firstPair = this.props.items[index];
      let secondPair = null;
      if (index + 1 < this.props.items.length) {
        secondPair = this.props.items[index + 1]
      }
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={firstPair.id}
        >
          <div className="card-deck">
            <FeaturedItem key={firstPair.id} data={firstPair}/>
            {secondPair ? <FeaturedItem key={secondPair.id} data={secondPair}/> : <></>}
          </div>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={_.range(0, this.props.items.length, 2)} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default FeaturedCarousel;