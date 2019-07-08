import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import MainNavBar from './navBar';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            modalPlayers: false,
            btnActive: '',
            player1Name:'',
            player2Name:'',
            player1Score:0,
            player2Score:0,
            player1move:'paper',
            player2move:'paper',
            gamestarted: false,
            gamefinished: false,
            winner:'',
            looser:'',
            round: 0,
            showscore: false,
            showround: false,
            modalPlayer1Move: false,
            modalPlayer2Move: false,
            modalRoundResult: false,
            moves:[
                { _id: 0, move: "paper", kills: ["rock", "spock"] },
                { _id: 1, move: "rock", kills: ["lizard", "scissor"]},
                { _id: 2, move: "scissor", kills: ["paper", "lizard"]},
                { _id: 3, move: "lizard", kills: ["spock", "paper"]},
                { _id: 4, move: "spock", kills: ["rock", "scissor"]},
            ]
        };

        this.togglePlayers = this.togglePlayers.bind(this);
        this.gameStart = this.gameStart.bind(this);
        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.toggleAllModals = this.toggleAllModals.bind(this);
        this.toggleModalP1M = this.toggleModalP1M.bind(this);
        this.toggleModalP2M = this.toggleModalP2M.bind(this);
        this.toggleModalRoundResult = this.toggleModalRoundResult.bind(this);
        this.handleP1Move = this.handleP1Move.bind(this);
        this.handleP2Move = this.handleP2Move.bind(this);
        this.handleRounds = this.handleRounds.bind(this);
        this.restartRound = this.restartRound.bind(this);
        this.verifyBattle = this.verifyBattle.bind(this);
        this.gameFinished = this.gameFinished.bind(this);
    }
    
    //Game Functions
    gameStart(e){
        this.setState({
            modalPlayers: false,
            btnActive: 'd-none',
            gamestarted: true,
            modalPlayer1Move: true,
            showscore: true,
            showround: true,
            round: this.state.round + 1
        }, () =>{
            console.log(`Game: ${this.state.player1Name} Vs ${this.state.player2Name}`);
        })
    }
    gameFinished(e){
        let winner = this.state.winner;
        alert("The Winner of the game is " + winner);
        let looser = this.state.looser;
        console.log('The winner is ' + winner);
        console.log('And the looser is ' + looser);
        fetch('/api/players/')
        .then(res => res.json())
        .then(data => {
            console.log("actions in winner commented for now");
            let players = data;
            let player = players.find(player => player.name == winner);
            if(!player){
                console.log("adding new Player to score table");
                fetch('/api/players/', {
                    method: 'POST',
                    body: JSON.stringify({ name: winner, wons: 1, losts: 0 }),
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
            }else{
                console.log("Editing winner data in score table");
                let wons = player.wons + 1;
                fetch(`/api/players/${player._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({name: player.name, wons: wons, losts: player.losts}),
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
            }
        });
        fetch('/api/players/')
        .then(res => res.json())
        .then(data => {
            let players = data;
            let player = players.find(player => player.name == looser);
            if(!player){
                console.log("adding new Player to score table");
                fetch('/api/players/', {
                    method: 'POST',
                    body: JSON.stringify({ name: looser, wons: 0, losts: 1 }),
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
            }else{
                console.log("Editing looser data in score table");
                let losts = player.losts + 1;
                fetch(`/api/players/${player._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({name: player.name, wons: player.wons, losts: losts}),
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
            }
        })
        .then(data2 =>{
            alert("Score Table Registry Updated");
            window.location.href = "/";
        });
        
    }

    handleRounds(){
        if(this.state.gamestarted == true){
            this.setState({ round: this.state.round + 1 });
        }else{
            this.setState({ round: 0 });
        }
    }

    restartRound(){
        if(this.state.player1Score === 3){
            this.setState({
                winner: this.state.player1Name,
                looser: this.state.player2Name,
            }, () => {
                this.gameFinished();
            });
        }else{
            if(this.state.player2Score === 3){
                this.setState({
                    winner: this.state.player2Name,
                    looser: this.state.player1Name,
                }, () => {
                    this.gameFinished();
                });
            }else{
                this.setState({
                    modalPlayers: false,
                    btnActive: 'd-none',
                    gamestarted: true,
                    modalPlayer1Move: true,
                    showscore: true,
                    showround: true,
                    round: this.state.round + 1,
                    player1move: 'paper',
                    player2move: 'paper'
                }, () =>{
                    console.log(`Game: ${this.state.player1Name} Vs ${this.state.player2Name}`);
                });
            }
        }
    }

    handlePlayerChange(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }

    handleP1Move(e){   
        const {name, value} = e.target;
        this.setState({
            [name] : value
        }, ()=>{
            console.log(this.state.player1move);
        });
        
    }

    handleP2Move(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value
        }, ()=>{
            console.log(this.state.player2move);
        });
    }

    verifyBattle(){
        this.toggleModalP2M();
        //find the values of tha move made by player 1
        let obj1 = this.state.moves.find(obj1 => obj1.move == this.state.player1move);
        //Store the kills values of the move made by player 1 in an array
        let killsp1 = obj1.kills;
        let movep1 = this.state.player1move;
        let movep2 = this.state.player2move;
        this.toggleAllModals();
        //If both players move are the same is a tie
        if(movep1 === movep2){
            alert("Is a Tie");
            this.restartRound();
        }else{
            //check if the selection made by player 2 is inside player 1 move kills
            let check1 = killsp1.includes(movep2);
            if(check1){
                //if is inside the players 1 move kills, player 1 wins
                alert(this.state.player1Name + ' Wins')
                this.setState({
                    player1Score: this.state.player1Score + 1
                },()=>{
                    this.restartRound();
                });
            }else{
                //check if the selection made by player 1 is inside player 2 move kills
                let obj2 = this.state.moves.find(obj2 => obj2.move == this.state.player2move);
                let killsp2 = obj2.kills;
                let check2 = killsp2.includes(movep1);
                if(check2){
                    //if is inside the players 1 move kills, player 2 wins
                    alert(this.state.player2Name + ' Wins')
                    this.setState({
                        player2Score: this.state.player2Score + 1
                    },()=>{
                        this.restartRound();
                    });
                }else{
                    //If both selection didn' match any of the previous criteria then we have a login error and the game must finish
                    alert('A logic Error exist in the rules config. Game Finished')
                    
                    this.gameFinished();
                }
            }
        }
    }

    togglePlayers() {
        this.setState(prevState => ({
          modalPlayers: !prevState.modalPlayers
        }));
        if(!this.state.modalPlayers) { 
            this.setState({btnActive: 'd-none'});
        } else {
            this.setState({btnActive: ''})
        }
    }

    toggleModalP1M() {
        this.setState(prevState => ({
            modalPlayer1Move: !prevState.modalPlayer1Move
        }));
        if(this.state.modalPlayer1Move){
            this.setState({
                modalPlayer2Move : true
            });
        }
    }

    toggleModalP2M() {
        this.setState(prevState => ({
            modalPlayer2Move: !prevState.modalPlayer2Move
        }));
    }

    toggleModalRoundResult() {
        this.setState(prevState => ({
            modalRoundResult: !prevState.modalRoundResult
        }));
    }
    toggleAllModals(){
        this.setState({
            modalPlayers: false,
            modalPlayer1Move: false,
            modalPlayer2Move: false,
            modalRoundResult: false,
        });
    }

    render(){ return (
        <div className="full-height">
            <MainNavBar/>
            <Container fluid className="container-height">
                <Row className="full-height">
                    <Col xs="12" md="3" className="flex flex-middle">
                        <div className={`score-table-container ${this.state.showscore ? '' : 'd-none'}`}>
                        <Row className="scoretable scoretable-1">
                            <Col xs="12" className="text-center scoretable-player">{this.state.player1Name}</Col>
                            <Col xs="12" className="text-center scoretable-score">{this.state.player1Score}</Col>
                        </Row>
                        </div>
                    </Col>
                    <Col xs="12" md="6" className="full-height">
                        <Row className="full-height">
                            <Col xs="12">
                                <div className={`round-box ${this.state.showround ? '' : 'd-none'}`}>
                                    <h1 className="text-center scoretable-score">Round {this.state.round}</h1>
                                </div>
                            </Col>
                            <Col xs="12" className="full-height flex flex-bottom flex-center">
                                <Button color="warning" size="lg" ref="start-button" className={`start-button ${this.state.btnActive}`} onClick={this.togglePlayers}>New Game</Button>
                                <Modal isOpen={this.state.modalPlayers} toggle={this.togglePlayers} className={`${this.props.className}`} centered>
                                    <ModalHeader toggle={this.togglePlayers}>Players</ModalHeader>
                                    <ModalBody>
                                        <Form>
                                        <FormGroup>
                                            <Label for="player1">Player 1</Label>
                                            <Input type="text" name="player1Name" placeholder="" onChange={this.handlePlayerChange} value={this.state.player1Name}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="player2">Player 2</Label>
                                            <Input type="text" name="player2Name" placeholder=""  onChange={this.handlePlayerChange} value={this.state.player2Name}/>
                                        </FormGroup>
                                        </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="warning" onClick={this.gameStart}>Start Game</Button>{' '}
                                        <Button color="dark" onClick={this.togglePlayers}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" md="3" className="flex flex-middle flex-right">
                        <div className={`score-table-container ${this.state.showscore ? '' : 'd-none'}`}>
                            <Row className="scoretable scoretable-2">
                                <Col xs="12" className="text-center scoretable-player">{this.state.player2Name}</Col>
                                <Col xs="12" className="text-center scoretable-score">{this.state.player2Score}</Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={this.state.modalPlayer1Move} className={this.props.className} centered backdrop>
                <ModalHeader>{this.state.player1Name}'s' Move</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Move</Label>
                        <Input type="select" name="player1move" onChange={this.handleP1Move}>
                            {
                                this.state.moves.map(moves =>{
                                    return (
                                        <option key={moves._id} value={moves.move}>{moves.move}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModalP1M}>Make move</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalPlayer2Move} className={this.props.className} centered backdrop>
                <ModalHeader>{this.state.player2Name}'s' Move</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Move</Label>
                        <Input type="select" name="player2move" onChange={this.handleP2Move}>
                            {
                                this.state.moves.map(moves =>{
                                    return (
                                        <option key={moves._id} value={moves.move}>{moves.move}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.verifyBattle}>Make move</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalRoundResult} className={this.props.className} centered backdrop>
                <ModalHeader toggle={this.toggleModalRoundResult}></ModalHeader>
                <ModalBody>
                    <h2>{this.state.roundResult}</h2>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModalRoundResult}>Accept</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}

export default App;