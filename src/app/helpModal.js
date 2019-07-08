import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class HelpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
     }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
     }

    render(){
        return (
            <div>
                <Button className="btnHelpModal" color="warning" onClick={this.toggle}>Help</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className}`} centered>
                    <ModalHeader toggle={this.toggle}>Help</ModalHeader>
                    <ModalBody className="modalHelBody">
                        <p>Start the game by click on the New Game button, then introduce the players name and hit the button Start Game.</p>
                        <p>For the Moves, the rules are pretty simple, Rock beats Scissor, Scissor beats Paper and Paper beats Rock. For more complex rules here it is an explanation from Dr. Sheldon Cooper.</p>
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/tnQOl9TtktM" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default HelpModal;