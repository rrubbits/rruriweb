import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchEvents, pastEvents, upcomingEvents } from '../actions';

const navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE',
}

class CustomToolbar extends Component {

    onClickAllEvents() {
        this.props.fetchEvents();
    };

    onClickPastEvents() {
        this.props.pastEvents();
    };
    
    onClickUpcomingEvents() {
        this.props.upcomingEvents();
    };

    render() {
        let { localizer: { messages }, label } = this.props;
        return(
            // rbc-toolbar 
            <div className="inline-flex space-x-3 w-full p-2">
                <span className="text-blue-500 hover:bg-slate-200 px-2">
                    <button type="button" className="btn btn-control" onClick={this.navigate.bind(null, navigate.TODAY)}><i className="fa fa-arrow-left"></i>今月</button>
                </span>
                <span className="flex-1 flex justify-center space-x-2">
                    <span className="text-blue-500 hover:bg-slate-200">
                        <button type="button" className="btn btn-control px-2" onClick={this.navigate.bind(null, navigate.PREVIOUS)}><i className="fa fa-arrow-left"></i>{"<"}</button>
                    </span>
                    <span className="text-center">{label}</span>
                    <span className="text-blue-500 hover:bg-slate-200">
                        <button type="button" className="btn btn-control px-2" onClick={this.navigate.bind(null, navigate.NEXT)}>{">"}<i className="fa fa-arrow-right"></i></button>
                    </span>
                </span>
                {/* rbc-toolbar-label  */}
                {/* <span className="rbc-btn-group">
                    <button type="button" className="btn btn-control" onClick={(e) => this.onClickAllEvents()}>All</button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-past" onClick={(e) => this.onClickPastEvents()}>Past</button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-upcoming" onClick={(e) => this.onClickUpcomingEvents()}>Upcoming</button>
                </span> */}
            </div>
        )
    }
    navigate = action => {
        this.props.onNavigate(action)
    }
}

// function mapStateToProps(state) {
//     return {
//         events: state.events
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ 
//         fetchEvents,
//         pastEvents, 
//         upcomingEvents 
//     }, dispatch);
// }

export default CustomToolbar //connect(mapStateToProps, mapDispatchToProps)(CustomToolbar);