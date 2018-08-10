import React, { Component } from 'react'
import { Image, StyleSheet, SectionList, TouchableOpacity, Text, View } from 'react-native'
import GlobalStyles from '../global/styles'
import GlobalStrings from '../global/strings'
import GlobalColors from '../global/colors'
import { queryAllStudents } from '../database/allSchemas';

export default class SectionWiseStudents extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: GlobalStrings.sectionStudents,
            headerTitleStyle: GlobalStyles.toolBarStyle,
            headerStyle: {
                backgroundColor: GlobalColors.blue.light,
            },
            headerRight: (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ padding: 5 }}
                    onPress={() =>
                        navigation.navigate("AddStudent")
                    }
                >

                    <Image style={{ height: 25, width: 25 }} source={require('../images/add_student_1.png')} />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            refreshing: false,
            showIndicator: true,
        };
    }

    componentWillMount() {
        this.getAllStudents();
    }

    getAllStudents = () => {
        queryAllStudents().then((students) => {
            //this.setState({ students, refreshing: false, showIndicator: false });
            this.convertIntoSectionWise(students);
        }).catch((error) => {
            this.setState({ students: [], refreshing: false });
            alert(error);
        });
    }

    convertIntoSectionWise(allStudents) {
        // alert(allStudents.length)

        // var data = allStudents.services.map(function (item) {
        //     return {
        //         title: item.class,
        //         label: item.name
        //     };
        // });

        var sectionedStudents = [];

        for (let i = 0; i < allStudents.length; i++) {
            const key = allStudents[i].stClass;
            for (let j = i; j < allStudents.length; j++) {
                if (key == allStudents[j].stClass) {
                    if (sectionedStudents.length == 0) {
                        const oneStudent = {
                            class: key,
                            data: [
                                allStudents[j]
                            ]
                        }
                        sectionedStudents.push(oneStudent);
                    } else {
                        status = false;
                        for (let k = 0; k < sectionedStudents.length; k++) {
                            const addedKey = sectionedStudents[k].class;
                            if (!this.isIdExists(sectionedStudents, allStudents[i].studentId)) {
                                if (addedKey == key) {
                                    status = true;
                                    sectionedStudents[k].data.push(allStudents[j]);
                                }
                            } else {
                                status = true;
                            }
                        }
                        if (!status) {
                            const oneStudent = {
                                class: key,
                                data: [
                                    allStudents[j]
                                ]
                            }
                            sectionedStudents.push(oneStudent);
                        }
                    }
                }
            }
        }
        console.log(sectionedStudents);
        this.setState({
            sections: sectionedStudents
        });
    }

    isIdExists(sectionedStudents, id) {
        for (let i = 0; i < sectionedStudents.length; i++) {
            for (let j = 0; j < sectionedStudents[i].data.length; j++) {
                if (id == sectionedStudents[i].data[j].studentId) {
                    return true;
                }
            }
        }
        return false;
    }

    renderItem({ item, index, section }) {
        return (
            <View style={{ margin: 10 }}>
                <Text>Student : {index}</Text>
                <Text>{item}</Text>
            </View>
        );
    }


    _renderSectionHeader = ({ section }) => {
        return (
            <View>
                <Text style={{
                    margin: 10,
                    fontWeight: 'bold',
                    textAlign: 'center', padding: 10,
                    borderRadius: 5,
                    backgroundColor: GlobalColors.gray.default,
                }}>{section.stName}</Text>
            </View>
        )
    }
    // sections={[
    //     { title: 'Title1', data: ['item1', 'item2'] },
    //     { title: 'Title2', data: ['item3', 'item4'] },
    //     { title: 'Title3', data: ['item5', 'item6'] },
    // ]}

    actionEdit = (item) => {
        this.props.navigation.navigate('AddStudent', {
            student: item,
            status: 'edit'
        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}>
                <CustomStatusBar />
                <SectionList renderItem=
                    {({ item, index }) => {
                        return (
                            <SectionRows
                                onPress={this.actionEdit}
                                item={item} index={index}>
                            </SectionRows>
                        );
                    }
                    }
                    sections={this.state.sections}
                    renderSectionHeader={({ section }) => {
                        return (
                            <SectionHeaderClass title={section.class}>
                            </SectionHeaderClass>
                        );

                    }}
                    // ItemSeparatorComponent=
                    // {() =>
                    //     <View style={{ height: 1, backgroundColor: 'grey' }}>
                    //     </View>
                    // }

                    keyExtractor={(item, index) => item + index}
                >
                </SectionList>

            </View>
        );
    }
}

class SectionRows extends Component {
    render() {
        return (
            <View style={{ margin: 10, borderRadius: 5, padding: 5, flex: 1, borderWidth: 1, borderColor: GlobalColors.gray.default }}>

                <Text style=
                    {styles.studentRowStyle}>{GlobalStrings.studentId} : {this.props.item.studentId}</Text>

                <Text style=
                    {styles.studentRowStyle}>{GlobalStrings.name} : {this.props.item.stName}</Text>

                <Text style=
                    {styles.studentRowStyle}>{GlobalStrings.phoneNo} : {this.props.item.stPhone}</Text>

                <Text style=
                    {styles.studentRowStyle}>{GlobalStrings.gender} : {this.props.item.stGender}</Text>

                <Text style=
                    {styles.studentRowStyle}>{GlobalStrings.dob} : {this.props.item.stDOJ}</Text>

                <Text style=
                    {styles.studentRowStyle}>{GlobalStrings.email}  : {this.props.item.stRefEmail}</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        padding: 10,
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
                    }}

                    onPress={() => this.props.onPress(this.props.item)}
                >

                    <Image style={{ height: 20, width: 20 }} source={require('../images/edit.png')} />
                </TouchableOpacity>
            </View>
        );
    }

    actionEdit = (item) => {
        this.props.navigation.navigate('AddStudent');
    }

}

class SectionHeaderClass extends Component {
    render() {
        return (
            <View style={{
                borderRadius: 5,
                flex: 1,
                justifyContent: 'center',
                backgroundColor: GlobalColors.gray.default,
                padding: 5,
                margin: 10
            }}>
                <Text style=
                    {{
                        textAlign: 'center',
                        fontSize: 15,
                        color: GlobalColors.white.default,

                    }}> {this.props.title} </Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    studentRowStyle: {
        fontSize: 12,
        color: GlobalColors.black.default,
        textAlign: 'left',
    }
});


// render()
//     {
//         return(
//             <View 
//             style = {{
//                 flex:1
//             }}>
//                 <SectionList renderItem = 
//                 {({item,index}) => 
//                 {
//                     return(
//                     <View>
//                     <Text>
//                         {item.key}
//                         </Text>
//                         <Text>
//                         {item.value}
//                         </Text>
//                         </View>
//                     );
//                     /*return(
//                         <SectionRows item = {item} index = {index}>
//                             </SectionRows>
//                     );*/
//                 }
//                 }
//                 sections = {this.state.allDataValues}
//                 renderSectionHeader = {({section}) =>
//                 {
//                    /* return(
//                         <SectionHeaderClass title = {section.key}>
//                             </SectionHeaderClass>
//                     ); */

//                     return(
//                     <View>
//                     <Text>
//                         {section.key}
//                         </Text>
//                         </View>
//                     );

//                 }}
//                 ItemSeparatorComponent = 
//                 { () =>
//                         <View style = {{height : 1, backgroundColor :'grey'}}>
//                         </View>
//                 }
//                  >
//                 </SectionList>

//             </View>
//         );