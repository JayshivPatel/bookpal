import * as React from 'react';
import { Card, Text, Appbar } from 'react-native-paper';

const Settings = () => {
    return (
        <Card>
            <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header>
            <Card>
                <Card.Title title="Settings"/> 
                <Card.Content>
                    <Text>Change Settings Here</Text>
                </Card.Content>
            </Card>
        </Card>
    );
};


export default Settings;