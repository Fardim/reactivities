import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
    setEditMode: (editMode: boolean) => void;
    selectedActivity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
    setEditMode,
    selectedActivity,
    createActivity,
    editActivity
}) => {
    const initializeForm = () => {
        if (selectedActivity) {
            return selectedActivity;
        } else {
            return {
                id: "",
                title: "",
                description: "",
                category: "",
                date: "",
                city: "",
                venue: ""
            };
        }
    };
    const [activity, setActivity] = useState<IActivity>(initializeForm!);
    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };
    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // console.log(event.target.value);
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="Title"
                    placeholder="Title"
                    value={activity.title}
                    name="title"
                    onChange={handleInputChange}
                />
                <Form.TextArea
                    label="Description"
                    placeholder="Description"
                    value={activity.description}
                    name="description"
                    onChange={handleInputChange}
                />
                <Form.Input
                    label="Category"
                    placeholder="Category"
                    value={activity.category}
                    name="category"
                    onChange={handleInputChange}
                />
                <Form.Input
                    type="datetime-local"
                    label="Date"
                    placeholder="Date"
                    value={activity.date}
                    name="date"
                    onChange={handleInputChange}
                />
                <Form.Input
                    label="City"
                    placeholder="City"
                    value={activity.city}
                    name="city"
                    onChange={handleInputChange}
                />
                <Form.Input
                    label="Venue"
                    placeholder="Venue"
                    value={activity.venue}
                    name="venue"
                    onChange={handleInputChange}
                />
                <Button
                    floated="right"
                    type="submit"
                    content="Submit"
                    positive
                ></Button>
                <Button
                    floated="right"
                    type="button"
                    content="cancel"
                    onClick={() => setEditMode(false)}
                ></Button>
            </Form>
        </Segment>
    );
};
