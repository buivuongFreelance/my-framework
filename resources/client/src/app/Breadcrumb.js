import React, {Component} from 'react';

class Breadcrumb extends Component{
	render(){
		return (
			<div className="tp-page-header">
				<div className="container">
					<div className="row">
						<div className="col-md-12 page-caption tp-breadcrumb">
							<ol className="breadcrumb">
								<li className="">
									<a>Home</a>
								</li>
								{
									this.props.values.map( (value, key) => {
										return (
											<li className="active" key={key}>
												&nbsp;/&nbsp;{value.name}
											</li>
										);
									})
								}
							</ol>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Breadcrumb;