import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js'

class Query extends Component {
	componentDidMount(){
		this.props.dispatch(getGraph("{goldberg(id: 2) {id, character, actor}}"))
	}
	render(){
		let dispatch = this.props.dispatch;
		let fetchInProgress = String(this.props.store.get('fetching'));
		let queryText;
		let goldberg = this.props.store.get('data').toObject();
		let goldDiv = goldberg ? (
			 <div>
				<h3>{ goldberg.character }</h3>
				<h3>{ goldberg.role }</h3>
				<h3>{ goldberg.traits}</h3>
			</div>
		) : ''
		return (
			<div>
				<p>Fetch in progress: {fetchInProgress}</p>
					{goldDiv}
				<input ref={node => {queryText = node}}></input>
				<button onClick={() => {
					dispatch(getGraph(`{goldberg(id: ${queryText.value}) {id, character, actor}}`))
				}}>
					Query
				</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		store: state
	}
}

export const QueryContainer = connect(
	mapStateToProps
)(Query);