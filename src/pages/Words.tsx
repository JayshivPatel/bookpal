import * as React from 'react';
import { Card, Text, Appbar } from 'react-native-paper';

const Words = () => {
    return (
        <Card>
            <Appbar.Header>
                <Appbar.Content title="Words" />
                <Appbar.Action icon="magnify" onPress={() => {}} />
            </Appbar.Header>
            <Card>
                <Card.Title title="Word"/> 
                <Card.Content>
                    <Text>View Words Here</Text>
                </Card.Content>
            </Card>
        </Card>
    );
};


export default Words;