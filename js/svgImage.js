var React = require('react');
class SvgImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    $.get(this.props.url, (svg) => {
      this.setState({icon: svg.documentElement.outerHTML});
    });

  }
  createInnerHtml() {
    return {
      __html: this.state.icon
    };
  }
  render() {
    return ("<div dangerouslySetInnerHTML="+{this.createInnerHtml()}+"></div>");
  }
}

class Widget extends React.Component {
  render() {
    return ("<SvgImage url='img/circular.svg'></SvgImage>");
  }
}
