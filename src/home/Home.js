// Home.js
import React, { Component } from "react";
import data from "./data.json";
import { Link } from 'react-router-dom';

class Home extends Component {

	constructor(props) {
		super(props);

		this.featuredCardsRefs = [];
		this._navToOverview = this.navToOverview.bind(this);
		this.state = { data };
		this.linkList = React.createRef();
	}

	// Bind for the "headerClick" event of the ui5-card
	componentDidMount() {
		const eventCardRef = this.featuredCardsRefs[0];

		//this.linkList.current.addEventListener("itemClick", this.onItemClicked);

		if (eventCardRef) {
			eventCardRef.addEventListener("headerClick", this._navToOverview);
		}
	}

	/*onItemClicked(){
		this.props.history.push("/other");
	}*/

	// Change the hash and let the router switch the views
	navToOverview() {
		this.props.history.push("/overview");
	}

	render() {
		const data = this.state.data;

		return (
			<div className="app-content">
				{/* Featured */}
				<ui5-title level="H3">Featured</ui5-title>
				<section className="section">
					{data.featured.map((dataObj, index) =>
						<ui5-card
							ref={ref => this.featuredCardsRefs[index] = ref}
							key={dataObj.key}
							heading={dataObj.heading}
							subtitle={dataObj.subtitle}
							status={dataObj.status}
							class="ui5card"
							header-interactive>
							<ui5-timeline>
								{dataObj.items.map(item =>
									<ui5-timeline-item
										key={item.key}
										icon={item.icon}
										title-text={item.title}
										subtitle-text={item.subtitle}
										class="ui5list-item">
										<div>{item.location}</div>
									</ui5-timeline-item>
								)}
							</ui5-timeline>
						</ui5-card>
					)}
					{data.quicklinks.map((dataObj, index) =>
						<ui5-card
							key={dataObj.key}
							heading={dataObj.heading}
							status={dataObj.status}
							class="ui5card">
							<ui5-list separators="None" ref={this.linkList}>
								{dataObj.items.map(item =>
									<Link to='https://react.semantic-ui.com/'>
										<ui5-li
											key={item.key}
											icon={item.icon}
											description={item.title}>
										</ui5-li>
									</Link>
								)}
							</ui5-list>
						</ui5-card>
					)}

				</section>
			</div>
		);
	}
}

export default Home;