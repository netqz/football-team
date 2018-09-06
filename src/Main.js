import React, { Component } from "react"
import PlayersList from "./PlayersList"

class Main extends Component {
    constructor () {
        super()
        this.state = { player: '', playersOnBench: [], playersOnField: [], selected: '', classHandler: ''}
    }

    componentDidMount () {
        const remove = document.getElementById('remove')
        const putOnField = document.getElementById('put-on-field')
        const putOnBench = document.getElementById('put-on-bench')

        remove.disabled = true
        putOnBench.disabled = true
        putOnField.disabled = true
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

        const remove = document.getElementById('remove')
        remove.disabled = true

        this.setState({ playersOnBench: dropPlayer })
    }

    handleChange (event) {
        const player = event.target.value
        this.setState({ player: player })
    }

    handleSelect (_player, event) {
        const classHandler = event.target

        if(this.state.classHandler) {
            this.state.classHandler.classList.remove('active-player')
        }

        classHandler.classList.add('active-player')
        this.setState({ classHandler: event.target })

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

    swapPlaces (newPosition, oldPosition, direction) {
        if (this.state.selected) {
            const player = this.state.selected
            const newPlayers = newPosition.concat(player)
            const dropPlayer = oldPosition.filter((_player) => {
                return _player !== player
            })

            if (direction) {
                this.setState({ selected: '', playersOnField: newPlayers, playersOnBench: dropPlayer })
            } else {
                this.setState({ selected: '', playersOnBench: newPlayers, playersOnField: dropPlayer })
            }

            const remove = document.getElementById('remove')
            const putOnField = document.getElementById('put-on-field')
            const putOnBench = document.getElementById('put-on-bench')

            remove.disabled = true
            putOnBench.disabled = true
            putOnField.disabled = true

        } else {
            return
        }
    }

    render () {
        return (
            <div>
                <section>
                    <div className="players-list">
                        <div className="bench-header">
                            <form onSubmit={this.handleAdd.bind(this)}>
                                <input placeholder="Enter new player ..." onChange={this.handleChange.bind(this)} value={this.state.player}/>
                                <button className="add">
                                    Add
                                </button>
                            </form>
                            <button id="remove" onClick={this.handleDelete.bind(this)} className="remove">
                                Remove
                            </button>
                        </div>
                        <PlayersList
                            items={ this.state.playersOnBench }
                            handleSelect = { this.handleSelect.bind(this) }
                        />
                    </div>
                    <div className="button-wrapper">
                        <button id="put-on-field" onClick={this.swapPlaces.bind(this, this.state.playersOnField, this.state.playersOnBench, true)} />
                        <button id="put-on-bench" onClick={this.swapPlaces.bind(this, this.state.playersOnBench, this.state.playersOnField, false)} />
                    </div>
                    <div className="players-list">
                        <PlayersList
                            items={ this.state.playersOnField }
                            handleSelect = { this.handleSelect.bind(this) }
                        />
                    </div>
                </section>
            </div>
        )
    }
}

export default Main
