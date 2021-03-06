/*
Mr Nguyen Duc Hoang
https://www.youtube.com/c/nguyenduchoang
Email: sunlight4d@gmail.com
Realm database Schemas
*/
import Realm from 'realm';
export const STUDENT_SCHEMA = "Student";
export const ADMIN_SCHEMA = "Admin";
//export const TODO_SCHEMA = "Todo";
// Define your models and their properties
// export const TodoSchema = {
//     name: TODO_SCHEMA,
//     primaryKey: 'id',
//     properties: {
//         id: 'int',    // primary key
//         name: { type: 'string', indexed: true },
//         done: { type: 'bool', default: false },
//     }
// };
export const StudentSchema = {
    name: STUDENT_SCHEMA,
    primaryKey: 'studentId',
    properties: {
        studentId: 'int',    // primary key
        stName: 'string',
        stPhone: 'string',
        stClass: 'string',
        stRefEmail: 'string',
        stGender: 'string',
        stDOJ: 'string',
        stAddress: 'string'
    }
};

export const AdminSchema = {
    name: ADMIN_SCHEMA,
    primaryKey: 'adminUserName',
    properties: {
        adminId: 'int',
        adminName: 'string',
        adminUserName: 'string',
        adminEmail: 'string',
        adminPassword: 'string'
    }
};

const databaseOptions = {
    path: 'College.realm',
    schema: [StudentSchema, AdminSchema], //Must be an array
    schemaVersion: 4, //optional  
    migration: (oldRealm, newRealm) => {
        // only apply this change if upgrading to schemaVersion 1
        if (oldRealm.schemaVersion < 3) {
            const oldObjects = oldRealm.objects(STUDENT_SCHEMA);
            const newObjects = newRealm.objects(STUDENT_SCHEMA);

            // loop through all objects and set the name property in the new schema
            for (let i = 0; i < oldObjects.length; i++) {
                newObjects[i].stRefEmail = '';
                newObjects[i].stDOJ = '';
                newObjects[i].stAddress = '';
            }
        }
    }
};

export const insertNewstudent = newStudent => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(STUDENT_SCHEMA, newStudent);
            resolve(newStudent);
        });
    }).catch((error) => reject(error));
});


export const insertNewAdmin = newAdmin => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            newAdmin.adminId = realm.objects(ADMIN_SCHEMA).length;
            realm.create(ADMIN_SCHEMA, newAdmin);
            resolve(newAdmin);
        });
    }).catch((error) => reject(error));
});

export const updateStudent = student => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingStudent = realm.objectForPrimaryKey(STUDENT_SCHEMA, student.studentId);
            updatingStudent.stName = student.stName;
            updatingStudent.stPhone = student.stPhone;
            updatingStudent.stClass = student.stClass;
            updatingStudent.stGender = student.stGender;
            updatingStudent.stRefEmail = student.stRefEmail;
            updateStudent.stDOJ = student.stDOJ;
            updateStudent.stAddress = student.stAddress;
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const deleteStudent = studentId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingStudent = realm.objectForPrimaryKey(STUDENT_SCHEMA, studentId);
            realm.delete(deletingStudent);
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const deleteAllStudents = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allStudents = realm.objects(STUDENT_SCHEMA);
            realm.delete(allStudents);
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const queryAllStudents = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allStudents = realm.objects(STUDENT_SCHEMA);
        resolve(allStudents);
    }).catch((error) => {
        reject(error);
    });;
});

export default new Realm(databaseOptions);