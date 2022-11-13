/* eslint-disable react/prop-types */
import { Component } from 'react';

type State={
  active:number
}

type Props={
  images:string[]
}
class Carousel extends Component<Props, State> {
  state : State = {
    active: 0,
  };

  static defaultProps = {
    images: ['https://pets-images.dev-apis.com/pets/none.jpg'],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
              data-index={index}
              key={photo}
              onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                if (!(e.target instanceof HTMLImageElement))  return;
              
                if (e.target.dataset.index) 
                  this.setState({ active: +e.target.dataset.index });
                
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
