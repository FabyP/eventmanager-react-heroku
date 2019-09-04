// Overview.js
import React, { Component } from "react";
import "./Overview.css";
import events from "../data/events.json";

import Header from "../header/Header";
import FilterBar from "../filterbar/FilterBar";

//Web Components
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/TextArea";


class Overview extends Component {
	state = {
		events: [...events],
		filteredEvents: [...events],
		filterType: "all",
	};

	filterPartyEvents(items) {
		return items.filter(event => (event.category === "Party"));
	}
	filterFamilyEvents(items) {
		return items.filter(event => (event.category === "Familie"));
	}
	filterMarketEvents(items) {
		return items.filter(event => (event.category === "Markt"));
	}
	filterOtherEvents(items) {
		return items.filter(event => (event.category === "Sonstiges"));
	}

	filterItems(filterType, items) {
		let filteredEvents = [];

		switch (filterType) {
			case "all":
				filteredEvents = items;
				break;
			case "party":
				filteredEvents = this.filterPartyEvents(items);
				break;
			case "family":
				filteredEvents = this.filterFamilyEvents(items);
				break;
			case "market":
				filteredEvents = this.filterMarketEvents(items);
				break;
			case "other":
				filteredEvents = this.filterOtherEvents(items);
				break;
			default:
				filteredEvents = items;
				break;
		}

		return filteredEvents;

	}

	applyFilter(filterType) {

		const events = this.filterItems(filterType, this.state.events);
		this.setState({
			...this.state,
			filteredEvents: events,
			filteredType: filterType,
		});
	}

	createEvent(entry) {
		const newItems = [...this.state.events, { key: (this.state.events.length + 1), ...entry }];

		this.setState({
			...this.state,
			events: newItems,
			filteredEvents: this.filterItems(this.state.filterType, newItems),
		});
	}

	//Search
	filterVisibleItemsByText(text) {
		const filteredByType = this.filterItems(this.state.filterType, this.state.events); // filter items based on current filter type
		const items = filteredByType.filter(item => item.name.toLowerCase().startsWith(text)); // filter items based on starting text
	
		this.setState({
			...this.state,
			filteredEvents: items, // update state of filtered items
		});
	}
	filter(value) {
		this.filterVisibleItemsByText(value);
	}

	//sortAsc
	sortAsc() {
		const sortedItems = this.state.filteredEvents.sort((a,b) => {
			function parseDate(input) {
				var parts = input.match(/(\d+)/g);
				// note parts[1]-1
				return new Date(parts[2], parts[1]-1, parts[0]);
			}
			let dateA = parseDate(a.date), dateB = parseDate(b.date);
			console.log(dateA);
			return dateA - dateB;
		});

		this.setState({
			...this.state,
			filteredEvents: sortedItems,
		});
	}

	

	//sortDesc
	sortDesc() {
		const sortedItems = this.state.filteredEvents.sort((a,b) => {
			function parseDate(input) {
				var parts = input.match(/(\d+)/g);
				// note parts[1]-1
				return new Date(parts[2], parts[1]-1, parts[0]);
			}
			let dateA = parseDate(a.date), dateB = parseDate(b.date);
			console.log(dateA);
			return dateB - dateA;
		});

		this.setState({
			...this.state,
			filteredEvents: sortedItems,
		});
	}

	render() {
		return (
			<div className="overview-page">

				<Header
					events={this.state.events}
					partyCount={this.filterPartyEvents(this.state.events).length}
					familyCount={this.filterFamilyEvents(this.state.events).length}
					marketCount={this.filterMarketEvents(this.state.events).length}
					otherCount={this.filterOtherEvents(this.state.events).length}
					tabPress={this.applyFilter.bind(this)} // Event listener when a tab is pressed
				/>

				<main className="overview-page-content">

					<FilterBar
						createEvent={this.createEvent.bind(this)}
						filter={this.filter.bind(this)}
						sortAsc={this.sortAsc.bind(this)}
						sortDesc={this.sortDesc.bind(this)}
					/>

					<ui5-table>
						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Event</ui5-label>
						</ui5-table-column>
						<ui5-table-column slot="columns" min-width="900" popin-text="Datum" demand-popin>
							<ui5-label class="table-column-header-content">Datum</ui5-label>
						</ui5-table-column>
						<ui5-table-column slot="columns" min-width="900" demand-popin>
							<ui5-label class="table-column-header-content">Uhrzeit</ui5-label>
						</ui5-table-column>
						<ui5-table-column slot="columns" min-width="600" popin-text="Ort" demand-popin>
							<ui5-label class="table-column-header-content">Ort</ui5-label>
						</ui5-table-column>

						{
							this.state.filteredEvents.map((item) =>
								<ui5-table-row key={item.key}>
									<ui5-table-cell>
										<ui5-label class="table-cell-content"><b>{item.name}</b></ui5-label>
									</ui5-table-cell>
									<ui5-table-cell>
										<span className="table-cell-content">{item.date}</span>
									</ui5-table-cell>
									<ui5-table-cell>
										<span className="table-cell-content">{item.time}</span>
									</ui5-table-cell>
									<ui5-table-cell>
										<span className="table-cell-content">{item.location}</span>
									</ui5-table-cell>
								</ui5-table-row>)
						}
					</ui5-table>
				</main>
			</div>
		)
	}
}

export default Overview;