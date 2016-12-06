import React, {Component} from 'react';

import Modal from 'react-modal';

const styles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	content: {
		outline: 'none'
	}
}

class ModalComponent extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<Modal
				isOpen={this.props.modal}
				className="Modal__Bootstrap modal-dialog"
				style={styles}
          		closeTimeoutMS={150}>
				<div className="modal-content">
					{this.props.children}
				</div>
			</Modal>
		);
	};
};

export default ModalComponent;