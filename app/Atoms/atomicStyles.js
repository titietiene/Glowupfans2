import { StyleSheet } from "react-native";

const atomicStyles = StyleSheet.create({
    headingText: {
        fontFamily: 'RCBold',
        fontSize: 24,
        color: '#000000',
        marginVertical: 25,
    },
    cardDesign: {
        width: '100%',
        height: '80%',
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 8,
    },
    inputTextBox: {
        width: '80%',
        height: 60,
        fontFamily: 'RCLight',
        borderRadius: 10,
        backgroundColor: '#CCCCCC5A',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        color: '#828282',
        marginTop: 20,
        fontSize: 14,
        textAlign: 'left',
    },
    labelText: {
        fontFamily: 'RCRegular',
        fontSize: 14,
        marginTop: 20,
        color: '#ee7271',
        textAlign: 'left',
    },
    actionButton: {
        width: '80%',
        height: 55,
        backgroundColor: '#ee7271',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    interestCard: {
        width: '80%',
        height: 55,
        backgroundColor: '#ee7271',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
});

export default atomicStyles;