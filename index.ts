const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { format } = require('date-fns');
require('dotenv').config();

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

// Helper function to render a table row if the value is not null
const renderRow = (label, value) => {
    if (value === null || value === undefined) return '';
    return `<tr><th>${label}</th><td>${value}</td></tr>`;
};

// Fetch data from Supabase
async function fetchData(projectId) {
    try {
        if (!projectId) {
            throw new Error('Invalid or missing Project ID');
        }

        console.log(`Fetching data for projectId: ${projectId}`);

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

        // Fetch textbox data (optional)
        const { data: textboxData, error: textboxError } = await supabase
            .from('text-box')
            .select('content')
            .eq('projectId', projectId)
            .limit(1);

        console.log('Textbox Data:', textboxData);

        if (textboxError) {
            console.warn(`No textbox data found for Project ID: ${projectId}`);
        }

        return {
            projectData,
            textboxData: textboxData && textboxData.length > 0 ? textboxData[0] : null,
        };
    } catch (error) {
        console.error(`[Fetch Data] Error for Project ID ${projectId}:`, error.message);
        return { error };
    }
}

// Dynamic route for project display
app.get('/:projectID', async (req, res) => {
    const projectID = req.params.projectID;

    console.log(`Received request for projectID: ${projectID}`);

    if (!projectID || projectID === 'null') {
        res.status(400).send('<h1>Invalid Project Request</h1>');
        return;
    }

    const fetchResult = await fetchData(projectID);

    if (fetchResult.error) {
        console.error(fetchResult.error);
        res.status(404).send(`<h1>Error: ${fetchResult.error.message}</h1>`);
    } else {
        const { projectData, textboxData } = fetchResult;

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
                        max-width: 100%;
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

                <h2>SEO and Other Information</h2>
                <table>
                    ${renderRow('SEO Title', projectData.projectSeoTitle)}
                    ${renderRow('SEO Description', projectData.projectSeoDescription)}
                    ${renderRow('SEO Keywords', projectData.projectSeoKeywords)}
                </table>

                ${projectData.projectThumbnail ? `
                <h2>Thumbnail</h2>
                <img src="${projectData.projectThumbnail}" alt="Project Thumbnail">
                ` : ''}

                ${textboxData ? `
                <h2>Textbox Content</h2>
                <p>${textboxData.content}</p>
                ` : `
                <h2>No Textbox Data Available</h2>
                `}
            </body>
            </html>
        `);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
