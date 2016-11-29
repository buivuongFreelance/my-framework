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

class ConfirmModal extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<Modal
				isOpen={false}
				className="Modal__Bootstrap modal-dialog modal-sm"
				style={styles}
          		closeTimeoutMS={150}>
				<div className="modal-content">
					<div className="modal-body">
						<p>Do you want to sign out ?</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">Yes</button>
						<button type="button" className="btn btn-default">No</button>
					</div>
				</div>
			</Modal>
		);
	};
};

export default ConfirmModal;