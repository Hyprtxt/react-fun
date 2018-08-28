import React from "react";
import PropTypes from "prop-types";
import "./hyperspace.css";
import AnimeJS from "animejs";

class Hyperspace extends React.Component {
  constructor(props) {
    super(props);
    this.state;
    this.myRef = React.createRef();
  }

  componentDidMount() {
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
    const numberOfEls = 50;
    const duration = 2000;
    const midScreenX = window.innerWidth / 2;
    const midScreenY = window.innerHeight / 2;
    const radius = Math.sqrt(midScreenX * midScreenX + midScreenY * midScreenY);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfEls; i++) {
      const hue = hueCounter();
      // const angle = Math.round(360 / numberOfEls * i);
      const angle = Math.random() * Math.PI * 2;
      const el = document.createElement("div");
      el.appendChild(document.createTextNode("☺"));
      el.classList.add("particule");
      el.style.color = `hsl(${hue}, 100%, 50%)`;
      AnimeJS({
        targets: el,
        fontSize: ["10px", "230px"],
        left: [`${midScreenX}px`, `${Math.cos(angle) * radius + midScreenX}px`],
        top: [`${midScreenY}px`, `${Math.sin(angle) * radius + midScreenY}px`],
        delay: (duration / numberOfEls) * i,
        duration,
        easing: "easeInExpo",
        loop: true
      });
      fragment.appendChild(el);
    }
    this.myRef.current.appendChild(fragment);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return false;
  }

  // componentWillUnmount() {
  //   console.log( this.myRef.current )
  //   const { theAnimation } = this;
  // }

  render() {
    const { children } = this.props;
    return <div ref={this.myRef}>{children}</div>;
  }
}

Hyperspace.propTypes = {
  children: PropTypes.any
};

Hyperspace.defaultProps = {
  children: []
};

export default Hyperspace;
