import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

// interface IState {
//     activities: IActivity[];
// }
const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
        null
    );
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState("");

    useEffect(() => {
        agent.Activities.list()
            .then(response => {
                let activities: IActivity[] = [];
                response.forEach(activity => {
                    activity.date = activity.date.split(".")[0];
                    activities.push(activity);
                });
                setActivities(activities);
            })
            .then(() => setLoading(false));
    }, []);
    if (loading) return <LoadingComponent content="Loading activities ..." />;
    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(d => d.id === id)[0]);
        setEditMode(false);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };
    const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.create(activity)
            .then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
            })
            .then(() => setSubmitting(false));
    };
    const handleEditActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.edit(activity)
            .then(() => {
                setActivities([
                    ...activities.filter(d => d.id !== activity.id),
                    activity
                ]);
                setSelectedActivity(activity);
                setEditMode(false);
            })
            .then(() => setSubmitting(false));
    };
    const handleDeleteActivity = (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        setTarget(event.currentTarget.name);
        setSubmitting(true);
        agent.Activities.delete(id)
            .then(() => {
                setActivities([...activities.filter(d => d.id !== id)]);
            })
            .then(() => setSubmitting(false));
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
                    submitting={submitting}
                    target={target}
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
