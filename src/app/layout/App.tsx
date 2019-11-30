import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

// interface IState {
//     activities: IActivity[];
// }
const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
        null
    );
    const [editMode, setEditMode] = useState<boolean>(false);
    useEffect(() => {
        axios
            .get<IActivity[]>("https://localhost:5001/activities")
            .then(response => {
                let activities: IActivity[] = [];
                response.data.forEach(activity => {
                    activity.date = activity.date.split(".")[0];
                    activities.push(activity);
                });
                setActivities(activities);
            });
    }, []);
    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(d => d.id === id)[0]);
        setEditMode(false);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };
    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };
    const handleEditActivity = (activity: IActivity) => {
        setActivities([
            ...activities.filter(d => d.id !== activity.id),
            activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
    };
    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(d => d.id !== id)]);
    };
    // readonly state: IState = {
    //     activities: []
    // };

    // componentDidMount() {
    //     axios
    //         .get<IActivity[]>("https://localhost:5001/activities")
    //         .then(response => {
    //             this.setState({
    //                 activities: response.data
    //             });
    //         });
    // }
    return (
        <React.Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: "7em" }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity!}
                    selectActivity={handleSelectActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
                {/* <List>
                    {activities.map(activity => (
                        <List.Item key={activity.id}>
                            {activity.title}
                        </List.Item>
                    ))}
                </List> */}
            </Container>
        </React.Fragment>
    );
};

export default App;
