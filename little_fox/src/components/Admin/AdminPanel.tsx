import React from 'react';
import {useNavigate} from "react-router-dom";
import { Admin, Resource, NumberInput, List, ImageField, Datagrid, ReferenceInput, SelectInput, TextField, Create, EditButton, DeleteButton, Edit, SimpleForm, TextInput, DeleteWithConfirmButton } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
const dataProvider = simpleRestProvider('http://localhost:3000');

const CourseList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <EditButton basePath="courses" />
            <DeleteButton basePath="courses" />
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
        </SimpleForm>
    </Edit>
);

const CourseResource = {
    name: 'courses',
    list: CourseList,
    edit: CourseEdit,
    // create: GenreCreate,
    remove: CourseDelete,
};

const AdminPanel = () => (
    <>
    <Admin basename="/admin" dataProvider={dataProvider} >
        <Resource {...CourseResource} />

    </Admin>
    </>
)
export default AdminPanel;
