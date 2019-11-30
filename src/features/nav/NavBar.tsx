import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface Iprops {
    openCreateForm: () => void;
}
export const NavBar: React.FC<Iprops> = ({ openCreateForm }) => {
    return (
        <div>
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item name="home" header>
                        <img
                            src="/assets/logo.png"
                            alt="logo"
                            style={{ marginRight: "10px" }}
                        />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name="Activities" />
                    <Menu.Item>
                        <Button
                            positive
                            content="Create Activity"
                            onClick={openCreateForm}
                        ></Button>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    );
};
