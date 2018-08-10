import GlobalColors from './colors';
import GlobalTypography from './typography';

export default GlobalStyles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalColors.white.default
    },
    contentMainHeading: Object.assign({}, GlobalTypography.heading3, {
        color: GlobalColors.black.absolute,
        padding: 10,
        textAlign: 'center'
    }),
    textInput: {
        height: 40,
        width: "80%",
        margin: 10,
        borderWidth: 1,
        borderColor: GlobalColors.black.default,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        paddingRight: 10,
        // placeholderTextColor: GlobalColors.white.whitePlaceHolder,
        backgroundColor: GlobalColors.white.default,
        color: GlobalColors.black.default
    }, textInputAddress: {
        height: 100,
        textAlignVertical: 'top',
        width: '100%',
        height: '100%',
    }, textInputPassword: {
        secureTextEntry: true
    },
    buttonStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: GlobalColors.white.default,
        textAlign: 'center',
        width: '80%',
        borderWidth: 1,
        padding: 5,
        marginBottom: 50,
        borderRadius: 5,
        borderColor: GlobalColors.blue.light,
        backgroundColor: GlobalColors.blue.dark,
    }, buttonUndefinedwidht: {
        width: undefined,
        marginLeft: 15,
        height: undefined,
        fontWeight: 'normal',
        marginBottom: 0
    }, buttonTextStyle: {
        color: GlobalColors.white.default,
        fontSize: 16,
        fontWeight: 'bold'
    },
    toolBarStyle: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }, circle: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100 / 2,
        borderWidth: 2,
        borderColor: GlobalColors.black.default,
        backgroundColor: GlobalColors.white.default
    }, item: {
        color: GlobalColors.black.default,
        paddingLeft: 10,
        textAlign: 'left',
        fontSize: 16
    }, itemCenter: Object.assign({}, this.item, {
        padding: 10,
        color: GlobalColors.white.default,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }),
    //  itemCenter: {
    //     color: GlobalColors.white.default,
    //     padding: 10,
    //     textAlign: 'center',
    //     fontSize: 16
    // },
    floatingParent: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    floatingActionButton: {
        height: 40,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: GlobalColors.blue.light,
        borderRadius: 100,
    }, rightImageButton: {
        width: '100%',
        flex: 1,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }, activityIndicator: {
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
    }, wrapper: {
        backgroundColor: '#33cc33',
        marginTop: 50,
    },
    listMenu: {
        color: 'white',
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
    }, textInputIconParent: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        width: '80%',
        borderColor: GlobalColors.black.default,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        marginBottom: 20,
    }, textInputWithIcon: {
        paddingLeft: 10,
        width: "100%"
    }
};