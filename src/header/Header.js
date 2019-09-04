import React, { Component } from "react";

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.tabContainer = React.createRef(); // creates a referebce for the tab container
    }

    componentDidMount() {
        this.tabContainer.current.addEventListener("itemSelect", event => {
            const filterType = event.detail.item.getAttribute("data-filter-type");
        
            this.props.tabPress(filterType);
        });
    }

    render() {
        return (
            <header className="overview-page-header">
                <div className="overview-page-header-bar">

                    <ui5-title>Übersicht Veranstaltungen</ui5-title>

                </div>

                <ui5-tabcontainer
                    ref={this.tabContainer}
                    class="overview-page-header-menu"
                    fixed
                    collapsed
                >
                    <ui5-tab data-filter-type="all" text="Alle" additional-text={this.props.events.length}></ui5-tab>
                    <ui5-tab data-filter-type="party" text="Party" additional-text={this.props.partyCount}></ui5-tab>
                    <ui5-tab data-filter-type="family" text="Familie" additional-text={this.props.familyCount}></ui5-tab>
                    <ui5-tab data-filter-type="market" text="Markt" additional-text={this.props.marketCount}></ui5-tab>
                    <ui5-tab data-filter-type="other" text="Sonstige" additional-text={this.props.otherCount}></ui5-tab>
                </ui5-tabcontainer>
            </header>
        )
    }
}

export default Header;