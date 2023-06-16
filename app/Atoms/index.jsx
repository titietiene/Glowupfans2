import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import atomicStyles from "./atomicStyles";

const Heading = ({ children, className }) => {
    return (
        <Text style={atomicStyles.headingText}>
            {children}
        </Text>
    );
}

const LabelText = ({ children, styles }) => {
    return (
        <Text style={{ ...atomicStyles.labelText, ...styles }}>
            {children}
        </Text>
    );
}

const InputField = ({ children, inputType, ...others }) => {
    return (
        <TextInput
            secureTextEntry={inputType === 'password'}
            style={atomicStyles.inputTextBox}
            placeholderTextColor="#8282828A"
            {...others}
        >
            {children}
        </TextInput>
    );
}

const ActionButton = ({ children, customStyles, ...others }) => {
    return (
        <TouchableOpacity
            style={{ ...atomicStyles.actionButton, ...customStyles }}
            {...others}
        >
            {children}
        </TouchableOpacity>

    );
}

const CardLayout = ({ children, ...customStyles }) => {
    return (
        <View
            style={{
                ...atomicStyles.cardDesign,
                ...customStyles
            }}
        >
            {children}
        </View>
    );
};

const InterestCard = ({ children, ...customStyles }) => {
    return (
        <View
            style={{
                ...atomicStyles.interestCard,
                ...customStyles
            }}
        >
            {children}
        </View>
    );
};

const ErrorMessage = ({ error }) => {
    return <>{error ? <Text style={{ color: "#bd4147", fontFamily:'RCRegular', textAlign:'left', width:'80%' }}> {error}</Text> : null}</>;
};

export {
    Heading,
    CardLayout,
    InputField,
    LabelText,
    ActionButton,
    InterestCard,
    ErrorMessage
};