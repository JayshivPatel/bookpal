import * as React from 'react';
import { TextInput, Card, Appbar } from 'react-native-paper';

const Landing = () => {

    const [text, setText] = React.useState("");
    return (
        <Card>
            <Appbar.Header>
                <Appbar.Content title="BookPal" />
            </Appbar.Header>
            <Card>
                <Card.Title title="Add a word"/> 
                <Card.Content>
                    <TextInput
                        label="Email"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </Card.Content>
            </Card>
        </Card>
    );
};


export default Landing;