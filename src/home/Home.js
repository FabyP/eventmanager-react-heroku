// Home.js
import React, { Component } from "react";
import data from "./data.json";
//import { Link } from 'react-router-dom';

class Home extends Component {

	constructor(props) {
		super(props);

		this.featuredCardsRefs = [];
		this.listCardsRefs = [];
		this._navToOverview = this.navToOverview.bind(this);
		this._navList = this._navList.bind(this);
		this.state = { data };
		//this.linkList = React.createRef();
		//this.handleListClick = this.handleListClick.bind(this);
	}

	// Bind for the "headerClick" event of the ui5-card
	componentDidMount() {
		const listRef = this.listCardsRefs[0];
		const eventCardRef = this.featuredCardsRefs[0];
		//console.log(listRef)

		//this.linkList.addEventListener("itemClick", this.handleListClick);

		if (eventCardRef) {
			eventCardRef.addEventListener("headerClick", this._navToOverview);
		}
		if (listRef) {
			listRef.addEventListener("itemClick", this._navList);
		}
	}

	/*handleListClick(event){
		console.log(event)
			var clickedItems = event.detail.clickedItems;
	
			alert("The selected item:  " + clickedItems[0].textContent);
		
	}*/

	/*onItemClicked() {
		//this.props.history.push("/home");
	}*/

	_navList(event) {
		//console.log(event.detail.item.id);
		//console.log(event.detail.item.attributes.dataid.value);
		let key = event.detail.item.attributes.dataid.value - 1;
		//console.log(key);
		//console.log(data.quicklinks[0].items[key].link);
		let link = data.quicklinks[0].items[key].link;
		if (key <= 1) {
			this.props.history.push(link);
		}
		else {
			window.open(link, '_blank', 'noopener noreferrer');
		}

		//console.log(.attributes.id);
		//console.log(event.target);
		//this.props.history.push("/overview");
		//alert('hello');
		//const selectedIndex = event.target.options.selectedIndex;
		//console.log(event.detail.item.getAttribute('data-key'));
	}

	// Change the hash and let the router switch the views
	navToOverview() {
		this.props.history.push("/overview");
	}

	render() {
		const data = this.state.data;

		return (
			<div className="app-content">
				{/* Featured */}
				<ui5-title level="H1">Featured</ui5-title>
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
							ref={ref => this.listCardsRefs[index] = ref}
							key={dataObj.key}
							heading={dataObj.heading}
							status={dataObj.status}
							class="ui5card">
							<ui5-list separators="None">
								{dataObj.items.map(item =>
									<ui5-li
										key={item.key}
										dataid={item.key}
										icon={item.icon}
										description={item.title}
										role="button">
									</ui5-li>
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