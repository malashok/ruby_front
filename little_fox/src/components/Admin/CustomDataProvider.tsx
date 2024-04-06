import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:3000';
const httpClient = fetchUtils.fetchJson;
const dataProvider = simpleRestProvider(apiUrl, httpClient);

const customDataProvider = {
    ...dataProvider,
    create: (resource, params) => {
        if (resource === 'users') {
            const { email, password, role } = params.data;
            const formData = new FormData();
            formData.append('user[email]', email);
            formData.append('user[password]', password);
            formData.append('user[role]', role);

            const options = {
                method: 'POST',
                body: formData,
            };

            return httpClient(`${apiUrl}/${resource}`, options)
                .then(response => {
                    const data = JSON.parse(response.body);
                    if (data && data.id && data.role) {
                        return { data };
                    } else {
                        console.error(`Unexpected response format for 'create' on ${resource}`, response);
                        return { data: {} };
                    }
                })
                .catch(error => {
                    console.error(`Failed to create user: ${error.message}`);
                    return { data: {} };
                });
        }
        return dataProvider.create(resource, params);
    },
};

export default customDataProvider;
