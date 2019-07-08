import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

class ScoreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      scores: []
    };

    this.toggle = this.toggle.bind(this);
    this.loadScores = this.loadScores.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  loadScores(){
    fetch('/api/players/')
    .then(res => res.json())
    .then(data => {
        this.setState({scores: data});
        console.log(this.state.scores);
    })
  }
  
  componentDidMount(){
    this.loadScores();
}

  render() {
    return (
        <div>
            <Button color="warning" onClick={this.toggle}>Best Scores</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={`${this.props.className}`} centered>
                <ModalHeader toggle={this.toggle}>10 Best Scores</ModalHeader>
                <ModalBody>
                    <Table hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Wons</th>
                                <th>Losts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.scores.map(score =>{
                                    return (
                                        <tr key={score._id}>
                                            <td scope="row">{score.name}</td>
                                            <td>{score.wons}</td>
                                            <td>{score.losts}</td>
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

export default ScoreModal;