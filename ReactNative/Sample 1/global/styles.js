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
    }, textInputPassword: {
        secureTextEntry: true
    },
    buttonStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: GlobalColors.white.default,
        textAlign: 'center',
        width: '80%',
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        marginBottom: 50,
        borderRadius: 5,
        backgroundColor: GlobalColors.blue.dark,
        borderColor: GlobalColors.black.absolute
    }, buttonUndefinedwidht: {
        width: undefined,
        marginLeft: 15,
        height: undefined,
        fontWeight: 'normal',
        marginBottom: 0
    }, buttonTextStyle: {
        color: GlobalColors.white.default,
        fontSize: 16,
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
        backgroundColor: GlobalColors.cyan.default
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
    floatingActionButton: {
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
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
    }
};