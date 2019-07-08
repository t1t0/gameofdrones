import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table, Form, FormGroup, Label, Input } from 'reactstrap';

class ConfigModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          moves:[]
        };
    
        this.toggle = this.toggle.bind(this);
        this.handleRulesChange = this.handleRulesChange.bind(this);
        this.loadRules = this.loadRules.bind(this);
     }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    handleRulesChange(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }

    loadRules(){
        fetch('/api/rules/')
        .then(res => res.json())
        .then(data => {
            this.setState({moves: data});
            console.log(this.state.moves);
        })
      }

    componentDidMount(){
        this.loadRules();
    }

    render(){
        return (
            <div>
                <Button color="warning" onClick={this.toggle}>Game Rules</Button>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className}`} centered>
                    <ModalHeader toggle={this.toggle}>Game Rules</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Move</th>
                                    <th>Kills</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.moves.map(moves =>{
                                    return (
                                        <tr key={moves._id}>
                                            <td><Input type="text" name="moves.move" value={moves.move} onChange={this.handleRulesChange} /></td>
                                            <td><Input type="text" name="moves.kills" value={JSON.stringify(moves.kills)} onChange={this.handleRulesChange}/></td>
                                            <td></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default ConfigModal;
