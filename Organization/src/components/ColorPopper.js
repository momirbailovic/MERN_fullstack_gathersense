import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import Data from '../common/dataOrg';

import { connect } from 'react-redux'
import { colorPopClose } from '../actions';

const StyledPopper = styled(Popper)`&&{
  
  z-index: 1;
  &[x-placement*="bottom"] .arrow{

    width: 0; 
    height: 0; 
    border-left: 1em solid transparent;
    border-right: 1em solid transparent;
    border-bottom: 1em solid  #fff;
    margin-top: -0.9em;
    
    &:before {
      border-width: '0 1em 1em 1em';
      border-color: 'transparent transparent white transparent';
    }
  }

  &[x-placement*="top"] .arrow{

    bottom: 0;
    width: 0; 
    height: 0; 
    border-left: 1em solid transparent;
    border-right: 1em solid transparent;
    border-top: 1em solid  #fff;
    margin-bottom: -0.9em;

    &:before {
      border-width: 1em 1em 0 1em;
      border-color: white transparent transparent transparent;
    }
  }

  &[x-placement*="right"] .arrow{

    left: 0;
    width: 0; 
    height: 0; 
    border-top: 1em solid transparent;
    border-bottom: 1em solid transparent;
    border-right: 1em solid  #fff;
    margin-left: -0.9em;

    &:before {
      border-width: 1em 1em 1em 0;
      border-color: transparent white transparent transparent;
    }
  }

  &[x-placement*="left"] .arrow{
    
    right: 0;
    width: 0; 
    height: 0; 
    border-top: 1em solid transparent;
    border-bottom: 1em solid transparent;
    border-left: 1em solid  #fff;
    margin-right: -0.9em;

    &:before {
      border-width: 1em 0 1em 1em;
      border-color: transparent transparent transparent white;
    }
  }

  .arrow {
    position: absolute;
    font-size: 7px;
    width: 3em;
    height: 3em;

    &:before {
      content: '""',
      margin: auto;
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
    }
  }

  .popper-content-color {
    justify-content: center;
    align-items: center;
    background-color:  #fff;
    color: red;
    height: 100px;
    width: 180px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 12px;
  }

}`;


class ColorPopper extends Component {

  state = {
    anchorElement: null,
    arrowRef: null,
    open: false,
  }

  handleAnchor = event => {
    this.setState({
      anchorElement: event.currentTarget
    })
    this.setState({open: !this.state.open});
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  render() {
    if (!this.props.colorpopopen)
      return (
        <div style={{color:'red'}}>sfsdfsdfsdfsdf</div>
      );
    return (
      <div>
        <div className="inner-window">
          <Grid
            className="scroll"
            container
            alignItems="center"
            justify="center"
          >
            <div>

              {
                this.state.anchorElement &&
                <StyledPopper
                  placement="right"
                  open={this.props.colorpopopen}
                  anchorEl={this.props.anchorElement.currentTarget}
                  modifiers={{
                    flip: {
                      enabled: true,
                    },
                    arrow: {
                      enabled: true,
                      element: this.state.arrowRef,
                    },
                    preventOverflow: {
                      enabled: "true",
                      boundariesElement: 'scrollParent'
                    },
                  }}
                >
                  {
                    true &&
                    <span className="arrow" ref={this.handleArrowRef} />
                  }
                  <div className={"popper-content-color"}>
                    <div style={{display: 'flex'}}>
                      {Data.circleColor[0].svg}
                      {Data.circleColor[1].svg}
                      {Data.circleColor[2].svg}
                      {Data.circleColor[3].svg}
                    </div>
                    <div style={{display: 'flex'}}>
                     {Data.circleColor[4].svg}
                     {Data.circleColor[5].svg}
                     {Data.circleColor[6].svg}
                     {Data.circleColor[7].svg}
                    </div>
                  </div>
                </StyledPopper>
              }

              <div className={"first-row"}>
                <button onClick={this.handleAnchor}>Anchor here</button>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  colorpopopen: state.colorpopopen,
  anchorElement: state.anchorElement,
})
const mapDispatchToProps = { 
  colorPopClose: colorPopClose,
};
ColorPopper = connect(mapStateToProps, mapDispatchToProps)(ColorPopper)
export default ColorPopper
