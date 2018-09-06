import React, { Component } from "react"

class PlayersList extends Component {
    render () {
        return (
            <ul>
                { this.props.items.map((item, i) => {
                    return <li key={item} onClick={ this.props.handleSelect.bind(null, item) }>
                        { item }
                    </li>
                })}
            </ul>
        )
    }
}

export default PlayersList
