import React from 'react';
import PropTypes from 'prop-types';
import './hyperspace.css';
import AnimeJS from 'animejs';

class Hyperspace extends React.Component {
  constructor(props) {
    super(props);
    // this.setRef = this.setRef.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    // const { theAnimation } = this;
    console.log('AnimeJS DidMount', this.myRef.current);
    let currentHue = 180;
    const hueCounter = () => {
      /* eslint-disable */
      currentHue++;
      if (currentHue === 360) {
        currentHue = 1;
      }
      // console.log(currentHue);
      return currentHue;
    };
    const numberOfEls = 180;
    const duration = 2000;
    const midScreenX = window.innerWidth / 2;
    const midScreenY = window.innerHeight / 2;
    // const midScreenX = 100;
    // const midScreenY = 100;
    const radius = Math.sqrt(midScreenX * midScreenX + midScreenY * midScreenY);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfEls; i++) {
      const hue = hueCounter();
      // Math.round(360 / numberOfEls * i);
      const angle = Math.random() * Math.PI * 2;
      const el = document.createElement('div');
      el.classList.add('particule');
      el.style.color = `hsl(${hue}, 100%, 50%)`;
      el.style.width = '0';
      el.style.height = '0';
      AnimeJS({
        targets: el,
        fontSize: ['10px', '230px'],
        // width: ['1px', '10px'],
        // height: ['1px', '10px'],
        left: [`${midScreenX}px`, `${Math.cos(angle) * radius + midScreenX}px`],
        top: [`${midScreenY}px`, `${Math.sin(angle) * radius + midScreenY}px`],
        delay: (duration / numberOfEls) * i,
        duration,
        easing: 'easeInExpo',
        loop: true,
      });
      fragment.appendChild(el);
    }
    this.myRef.current.appendChild(fragment);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return false;
  }

  componentWillUnmount() {
    // const { theAnimation } = this;
    // const $form = JQuery(theAnimation);
    // $form.off('submit');
  }

  // setRef(domElement) {
  //   this.theAnimation = domElement;
  // }

  render() {
    const { children } = this.props;
    return <div ref={this.myRef}>{children}</div>;
  }
}

Hyperspace.propTypes = {
  children: PropTypes.any,
  // className: PropTypes.string,
  // disabled: PropTypes.bool,
  // checked: PropTypes.bool,
  // name: PropTypes.string,
  // onChange: PropTypes.func,
};

Hyperspace.defaultProps = {
  children: [],
  // className: '',
  // disabled: false,
  // checked: true,
  // name: 'name_me',
  // onChange(e) {
  //   console.log('Hyperspace value change', e);
  // },
};

export default Hyperspace;
