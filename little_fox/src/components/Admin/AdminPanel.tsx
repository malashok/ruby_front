import React from 'react';
import { Admin, Resource, ReferenceField, NumberInput, List, ImageField, Datagrid, ReferenceInput, SelectInput, TextField, Create, EditButton, DeleteButton, Edit, SimpleForm, TextInput, DeleteWithConfirmButton } from 'react-admin';
import customDataProvider from "./CustomDataProvider";

const CourseList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <ReferenceField label="Faculty" source="faculty_id" reference="faculties">
                <TextField source="name" />
            </ReferenceField>
            <EditButton resource="courses" />
            <DeleteButton resource="courses" />
        </Datagrid>
    </List>
);

const CourseDelete = (props) => (
    <DeleteWithConfirmButton {...props} />
);

const CourseEdit = (props) => (
    <Edit {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <ReferenceInput label="Faculty" source="faculty_id" reference={FacultyResource.name}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

const CourseCreate = (props) => (
    <Create {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <ReferenceInput label="Faculty" source="faculty_id" reference={FacultyResource.name}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);


const FacultyList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton resource="faculties" />
            <DeleteButton resource="faculties" />
        </Datagrid>
    </List>
);

const FacultyDelete = (props) => (
    <DeleteWithConfirmButton {...props} />
);

const FacultyEdit = (props) => (
    <Edit {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

const FacultyCreate = (props) => (
    <Create {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

const UserList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="role" />
            <EditButton resource="users" />
            <DeleteButton resource="users" />
        </Datagrid>
    </List>
);

const UserDelete = (props) => (
    <DeleteWithConfirmButton {...props} />
);

const UserEdit = (props) => (
    <Edit {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="email" />
            <SelectInput source="role" choices={[
                { id: 'student', name: 'student' },
                { id: 'admin', name: 'admin' },
            ]} />
        </SimpleForm>
    </Edit>
);

const UserCreate = (props) => (
    <Create {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="password" type="password" />
            <SelectInput source="role" choices={[
                { id: 'student', name: 'student' },
                { id: 'admin', name: 'admin' },
            ]} />
        </SimpleForm>
    </Create>
);

const StudentList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="course_num" />
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <EditButton resource="students" />
            <DeleteButton resource="students" />
        </Datagrid>
    </List>
);

const StudentDelete = (props) => (
    <DeleteWithConfirmButton {...props} />
);

const StudentEdit = (props) => (
    <Edit {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput
                source="course_num"
                min={1}
                max={5}
            />
            <ReferenceInput label="User" source="user_id" reference={UserResource.name}>
                <SelectInput optionText="email" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

const StudentCreate = (props) => (
    <Create {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput
                source="course_num"
                min={1}
                max={5}
            />
            <ReferenceInput label="User" source="user_id" reference={UserResource.name}>
                <SelectInput optionText="email" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

const TeacherList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton resource="teachers" />
            <DeleteButton resource="teachers" />
        </Datagrid>
    </List>
);

const TeacherDelete = (props) => (
    <DeleteWithConfirmButton {...props} />
);

const TeacherEdit = (props) => (
    <Edit {...props} redirect="list" >
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

const TeacherCreate = (props) => (
    <Create {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

const CourseResource = {
    name: 'courses',
    list: CourseList,
    edit: CourseEdit,
    create: CourseCreate,
    remove: CourseDelete,
};

const FacultyResource = {
    name: 'faculties',
    list: FacultyList,
    edit: FacultyEdit,
    create: FacultyCreate,
    remove: FacultyDelete,
};

const UserResource = {
    name: 'users',
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    remove: UserDelete,
};

const StudentResource = {
    name: 'students',
    list: StudentList,
    edit: StudentEdit,
    create: StudentCreate,
    remove: StudentDelete,
};

const TeacherResource = {
    name: 'teachers',
    list: TeacherList,
    edit: TeacherEdit,
    create: TeacherCreate,
    remove: TeacherDelete,
};

const AdminPanel = () => (
    <>
    <Admin basename="/admin" dataProvider={customDataProvider} >
        <Resource {...CourseResource} />
        <Resource {...FacultyResource} />
        <Resource {...UserResource} />
        <Resource {...StudentResource} />
        <Resource {...TeacherResource} />
    </Admin>
    </>
)
export default AdminPanel;
