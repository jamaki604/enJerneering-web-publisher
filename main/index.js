const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { format } = require('date-fns');
const TextBoxStyle = require('../public/componentHTML/style/textBoxStyle');
const TextBoxContent = require('../public/componentHTML/content/textBoxContent');
const FooterStyle = require('../public/componentHTML/style/footerStyle');
const FooterContent = require('../public/componentHTML/content/footerContent');
require('dotenv').config();

console.log("STARTING INDEX.ts")

/// Pierson Silver Adding Content and Style Class Initializers 
let textBoxContent = null;
const textBoxStyle = new TextBoxStyle();
let footerContent = null;
const footerStyle = new FooterStyle();


// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration: SUPABASE_URL or SUPABASE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware to skip invalid or unintended requests
app.use((req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).end(); // No Content
        return;
    }
    next();
});

app.use(express.static('public'));

// Helper function to render a table row if the value is not null
const renderRow = (label, value) => {
    if (value === null || value === undefined) return '';
    return `<tr><th>${label}</th><td>${value}</td></tr>`;
};

const renderServices = (serviceData) => {
    let services = '';
    for (let index = 0; index < serviceData.length; index++) {
        services += `
        <h3>Service ${index + 1}</h3>
            <table>
                <tr><th>ID</th><td>${serviceData[index].serviceId}</td><tr>
                <tr><th>Name</th><td>${serviceData[index].serviceName}</td><tr>
                <tr><th>Description</th><td>${serviceData[index].serviceDescription}</td><tr>
            </table>
        `
    }
    return services
}

// Fetch data from Supabase
async function fetchData(projectId) {
    try {
        if (!projectId) {
            throw new Error('Invalid or missing Project ID');
        }

        console.log(`Fetching data for projectId: ${projectId}`);

        let projectData = await fetchProjectData(projectId);
        let elementData = await fetchElementData(projectId);
        let textboxData = getTextBoxData(elementData);
        let footerData = getFooterData(elementData);
        let serviceData = await getServiceData(projectId)

        return {
            projectData,
            serviceData,
            textboxData,
            footerData
        };
    } catch (error) {
        console.error(`[Fetch Data] Error for Project ID ${projectId}:`, error.message);
        return { error };
    }
}

// Refactored Helper Functions Start -- Pierson Silver

async function fetchProjectData(projectId) {
    // Fetch project data
    const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select()
        .eq('projectId', projectId)
        .single();

    console.log('Project Data:', projectData);

    if (projectError) {
        throw new Error(`Project not found for Project ID: ${projectId}`);
    }
    return projectData;
}

async function fetchElementData(projectId) {
    // Fetch textbox data (optional)
    const { data: elementData, error: elementError } = await supabase
        .from('web-elements')
        .select()
        .eq('projectId', projectId)
        .limit(1);

    console.log('Data:', elementData);

    if (elementError) {
        console.warn(`No textbox data found for Project ID: ${projectId}`);
    }
    return elementData;
}

const getTextBoxData = (elementData) => {
    let parsedTextBoxData = parseData(elementData, 'textBoxData')
    return parsedTextBoxData;
} 

const getFooterData = (elementData) => {
    let parsedFooterData = parseData(elementData, 'footerData')
    return parsedFooterData;
}

async function fetchServiceData(projectId) {
    const { data: serviceData, error: serviceError } = await supabase
            .from('services')
            .select()
            .eq('projectId', projectId);

    console.log('Data:', serviceData);

    if (serviceError) {
        console.warn(`No Service data found for Project ID: ${projectId}`);
    }
    return serviceData;
}

const getServiceData = async (projectId) => {
    let serviceData = await fetchServiceData(projectId)
    let servicesFromProject = null;
    if (serviceData && serviceData.length > 0 && serviceData) {
        servicesFromProject = serviceData.filter((service) => service.projectId === projectId);
    }
    return servicesFromProject;
}

const parseData = (data, dataRequest) => {
    let parsedData = null;
    if (data && data.length > 0 && data[0][dataRequest]) {
        try {
            parsedData = JSON.parse(data[0][dataRequest]);
            console.log('parsed data:', parsedData)
        } catch (parseError) {
            console.error('Failed to parse data:', parseError.message);
        }
    }
    return parsedData;
}

// Refactored Helper Functions End -- Pierson Silver

// Dynamic route for project display
app.get('/:projectId', async (req, res) => {
    const projectId = req.params.projectId;

    console.log(`Received request for projectID: ${projectId}`);

    if (!projectId || projectId === 'null') {
        res.status(400).send('<h1>Invalid Project Request</h1>');
        return;
    }

    const fetchResult = await fetchData(projectId);

    if (fetchResult.error) {
        console.error(fetchResult.error);
        res.status(404).send(`<h1>Error: ${fetchResult.error.message}</h1>`);
    } else {
        const { projectData, serviceData } = fetchResult;

        const createdAt = new Date(projectData.createdAt);
        const lastUpdated = new Date(projectData.lastUpdated);

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Project Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    h1, h2 {
                        color: #333;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f4f4f4;
                        font-weight: bold;
                    }
                    img {
                        max-width: 20%;
                        height: auto;
                        display: block;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <h1>Project Details</h1>

                <h2>General Information</h2>
                <table>
                    ${renderRow('Project Title', projectData.projectTitle)}
                    ${renderRow('Project ID', projectData.projectId)}
                    ${renderRow('Description', projectData.projectDescription)}
                    ${renderRow('Domain', projectData.projectDomain)}
                    ${renderRow('Keywords', projectData.projectKeywords ? projectData.projectKeywords.join(', ') : null)}
                    ${renderRow('Status', projectData.projectStatus)}
                    ${renderRow('Last Updated', format(lastUpdated, 'yyyy-MM-dd HH:mm:ss'))}
                    ${renderRow('Created At', format(createdAt, 'yyyy-MM-dd HH:mm:ss'))}
                </table>

                <h2>Additional Details</h2>
                <table>
                    ${renderRow('Configuration Details', projectData.projectConfigurationDetails)}
                    ${renderRow('Service Areas', projectData.projectServiceAreas)}
                    ${renderRow('Repository URL', projectData.projectRepositoryUrl)}
                    ${renderRow('Deployment URL', projectData.projectDeploymentUrl)}
                </table>
                
                ${serviceData ? `
                    <h2>Services</h2>
                        ${renderServices(serviceData)}
                    `:'<h2>Project has No Inputted Services</h2>'
                }    
                
                ${projectData.projectThumbnail ? `
                <h2>Project Thumbnail</h2>
                <img src="${projectData.projectThumbnail}" alt="Project Thumbnail">
                ` : ''}
            </body>
            <body>
            <h1>Redirect to Viewer</h1>
            <button onclick="redirectToViewer()">Go to Viewer</button>
        </body>
        <script>
            function redirectToViewer() {
                window.location.href = 'http://localhost:4000/viewer/${projectId}';
            }
        </script>
            </html>
        `);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


//// Adding 2nd Page (MAYBE) - PIERSON SILVer
app.get('/viewer/:projectId', async (req, res) => {
    const projectId = req.params.projectId;

    console.log(`Received request for projectID: ${projectId}`);

    if (!projectId || projectId === 'null') {
        res.status(400).send('<h1>Invalid Project Request</h1>');
        return;
    }

    const fetchResult = await fetchData(projectId);

    if (fetchResult.error) {
        console.error(fetchResult.error);
        res.status(404).send(`<h1>Error: ${fetchResult.error.message}</h1>`);
    } else {
        const { textboxData, footerData } = fetchResult;

        textBoxContent = new TextBoxContent(textboxData);
        footerContent = new FooterContent(footerData);
    
        res.send(`
            <html>
                <style>
                .idk {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 1.5rem; /* space-y-6 */
                    }
                ${textBoxStyle.getStyle()}
                ${footerStyle.getStyle()}
                </style>
                <body class="idk">
                ${textboxData ? `
                    ${textBoxContent.getContent()}
                    ` :''}
                ${footerData ? `
                    ${footerContent.getContent()}
                    ` :''}
                <body>
                    <button onclick="redirectToDetails()">View Details</button>
                </body>
                </body>
                <script>
                function redirectToDetails() {
                    window.location.href = 'http://localhost:4000/${projectId}';
                }
                </script>
    
            </html>
            `)
    }
});
