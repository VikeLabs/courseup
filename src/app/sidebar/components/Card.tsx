import React, {Component} from "react"
import styled from "styled-components";
interface Inputs {
   code: string
   title: string
   subject: string
}
interface StateVar {
  is_white: boolean
}


const Button = styled.button`
  width: 250px;
  height: 97px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  border: none;
  border-radius: 12px;
  margin: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  word-wrap: break-word;
`
const Title = styled.h1`
  width: 110px;
  height: 24px;
  position: static;
  text-align: left;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.85);
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
`
const Subtitle = styled.h2`
  width: 192px;
  height: 35px;
  display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
  position: static;
  text-align: left;
  padding: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.45);
  text-overflow: ellipsis;
  flex: none;
  overflow: hidden;
`


class Card extends Component<Inputs, StateVar> {
  constructor(props:Inputs) {
    super(props);
    this.state = {
      is_white: true
    }
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
      this.setState({is_white: !this.state.is_white})
  }
  render() {
    let bgColor = this.state.is_white ? "white" : "orange"
    return (
      <div>
        <Button style={{background: bgColor}} onClick={this.changeColor}>
          <Title>{this.props.title} {this.props.code}</Title>
          <Subtitle>{this.props.subject}</Subtitle>
        </Button>
      </div>
    );
  }
}

export default Card
