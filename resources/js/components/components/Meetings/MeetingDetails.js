import React, { Component } from "react";
import axios from "axios";
import SingleMeetingDetails from "./SingleMeetingDetails.js";

class MeetingDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meetingData: [],
            meetingID: ""
        };
    }

    async componentDidMount() {
        var meetingId = this.props.match.params.id;

        this.setState({ meetingID: meetingId });

        const getMeeting = await axios.get(
            `http://127.0.0.1:8000/api/meeting/${meetingId}`
        );

        const meeting = getMeeting.data[0];

        let meetingObject = {
            id: meeting.id,
            title: meeting.title,
            description: meeting.description,
            author: meeting.author,
            lattitude: meeting.lattitude,
            longitude: meeting.longitude,
            category: meeting.category,
            limit: meeting.limit,
            date: meeting.date,
            time: meeting.time
        };

        this.setState(prevState => ({
            meetingData: [...prevState.meetingData, meetingObject]
        }));
    }

    render() {
        return (
            <div>
                {this.state.meetingData.map((item, i) => {
                    return (
                        <SingleMeetingDetails
                            key={i}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            author={item.author}
                            lattitude={item.lattitude}
                            longitude={item.longitude}
                            category={item.category}
                            limit={item.limit}
                            date={item.date}
                            time={item.time}
                            meetingId={this.state.meetingID}
                            showAlertSuccess={this.props.showAlertSuccess}
                            showAlertWarning={this.props.showAlertWarning}
                        />
                    );
                })}
            </div>
        );
    }
}
export default MeetingDetails;
