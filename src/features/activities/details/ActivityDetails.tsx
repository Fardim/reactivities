import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
    selectedActivity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}
export const ActivityDetails: React.FC<IProps> = ({
    selectedActivity,
    setEditMode,
    setSelectedActivity
}) => {
    return (
        <Card fluid>
            <Image
                src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span className="date">{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        basic
                        color="blue"
                        content="Edit"
                        onClick={() => setEditMode(true)}
                    ></Button>
                    <Button
                        basic
                        color="grey"
                        content="Cancel"
                        onClick={() => setSelectedActivity(null)}
                    ></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
