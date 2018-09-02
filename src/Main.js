import React, { Component } from "react"

class Main extends Component {
    constructor () {
        super()
        this.state = { player: '', playersOnBench: [], playersOnField: [], selected: ''}
    }

    handleAdd (event) {
        event.preventDefault()

        if (this.state.player) {
            const player = this.state.player
            const newPlayers = this.state.playersOnBench.concat(player)

            for (let i = 0; i < this.state.playersOnBench.length; ++i) {
                if (player === this.state.playersOnBench[i]) {
                    alert(player + " is already entered!")
                    return
                }
            }
            this.setState({ player: '', playersOnBench: newPlayers })
        } else {
            return
        }
    }

    handleDelete () {
        const player = this.state.selected
        const dropPlayer = this.state.playersOnBench.filter((_player) => {
            return _player !== player
        })

        this.setState({ playersOnBench: dropPlayer })
    }

    handleChange (event) {
        const player = event.target.value
        this.setState({ player: player })
    }

    handleSelect (_player) {
        const remove = document.getElementById('remove')
        const putOnField = document.getElementById('put-on-field')
        const putOnBench = document.getElementById('put-on-bench')

        const player = _player
        const playersOnBench = this.state.playersOnBench
        const numberOfPlayers = this.state.playersOnBench.length

        this.setState({ selected: player })

        for (let i = 0; i < numberOfPlayers; ++i) {
            if(player === playersOnBench[i]) {
                remove.disabled = false
                putOnField.disabled = false
                putOnBench.disabled = true
                return
            }
        }

        remove.disabled = true
        putOnField.disabled = true
        putOnBench.disabled = false
    }

    putOnField () {
        if (this.state.selected) {
            const player = this.state.selected
            const newPlayers = this.state.playersOnField.concat(player)
            const dropPlayer = this.state.playersOnBench.filter((_player) => {
                return _player !== player
            })

            this.setState({ selected: '', playersOnField: newPlayers, playersOnBench: dropPlayer })
        } else {
            return
        }
    }

    putOnBench () {
        if (this.state.selected) {
            const player = this.state.selected
            const newPlayers = this.state.playersOnBench.concat(player)
            const dropPlayer = this.state.playersOnField.filter((_player) => {
                return _player !== player
            })

            this.setState({ selected: '', playersOnBench: newPlayers, playersOnField: dropPlayer })
        } else {
            return
        }
    }

    render () {
        return (
            <div>
                <h1>Football team</h1>
                <section>
                    <div className="players-list">
                        <div className="bench-header">
                            <form onSubmit={this.handleAdd.bind(this)}>
                                <input onChange={this.handleChange.bind(this)} value={this.state.player}/>
                                <button className="add">
                                    Add
                                </button>
                            </form>
                            <button id="remove" onClick={this.handleDelete.bind(this)} className="remove">
                                Remove
                            </button>
                        </div>
                        <ol>
                            { this.state.playersOnBench.map((playerOnBench, i) => {
                                return <li key={playerOnBench} onClick={(event) => {
                                        this.handleSelect(playerOnBench)
                                    }}>
                                    { playerOnBench }
                                </li>
                            })}
                        </ol>
                    </div>
                    <div className="button-wrapper">
                        <button id="put-on-field" onClick={this.putOnField.bind(this)}>Right</button>
                        <button id="put-on-bench" onClick={this.putOnBench.bind(this)}>Left</button>
                    </div>
                    <div className="players-list">
                        <ol>
                            { this.state.playersOnField.map((playerOnField, i) => {
                                return <li key={playerOnField} onClick={(event) => {
                                        this.handleSelect(playerOnField)
                                    }}>
                                    { playerOnField }
                                </li>
                            })}
                        </ol>
                    </div>
                </section>
            </div>
        )
    }
}

export default Main
