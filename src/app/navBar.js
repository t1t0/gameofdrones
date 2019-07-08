import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import HelpModal from './helpModal';
import ScoreModal from './scoresModal';
import ConfigModal from './configModal';

class MainNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar expand="md" className="red-bbt">
            <NavbarBrand href='/' className="brand">Game of Drones</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem className="navbar-items-margin">
                    <HelpModal />
                </NavItem>
                <NavItem className="navbar-items-margin">
                    <ScoreModal/>
                </NavItem>
                {/*<NavItem className="navbar-items-margin">
                    <ConfigModal/>
                  </NavItem>*/}
                </Nav>
            </Collapse>
        </Navbar>
    )
  }
}

export default MainNavBar;