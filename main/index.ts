import express, { Request, Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing Supabase configuration: SUPABASE_URL or SUPABASE_KEY');
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).end();
        return;
    }
    next();
});

const renderRow = (label: string, value?: string | null): string => {
    if (!value) return '';
    return `<tr><th>${label}</th><td>${value}</td></tr>`;
};

const renderServices = (serviceData: { serviceId: string; serviceName: string; serviceDescription: string }[]): string => {
    return serviceData.map((service, index) => `
        <h3>Service ${index + 1}</h3>
        <table>
            <tr><th>ID</th><td>${service.serviceId}</td></tr>
            <tr><th>Name</th><td>${service.serviceName}</td></tr>
            <tr><th>Description</th><td>${service.serviceDescription}</td></tr>
        </table>
    `).join('');
};

async function fetchData(projectId: string): Promise<{
    projectData?: any;
    serviceData?: any[];
    error?: string;
}> {
    try {
        if (!projectId) throw new Error('Invalid or missing Project ID');

        const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .select('*')
            .eq('projectId', projectId)
            .single();

        if (projectError || !projectData) throw new Error(`Project not found for ID: ${projectId}`);

        const { data: serviceData, error: serviceError } = await supabase
            .from('services')
            .select('*')
            .eq('projectId', projectId);

        if (serviceError) throw new Error(serviceError.message);

        return {
            projectData,
            serviceData: serviceData || []
        };
    } catch (error: unknown) {
        return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

app.get('/:projectId', async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    if (!projectId || projectId === 'null') {
        res.status(400).send('<h1>Invalid Project Request</h1>');
        return;
    }

    const fetchResult = await fetchData(projectId);

    if (fetchResult.error) {
        res.status(404).send(`<h1>Error: ${fetchResult.error}</h1>`);
    } else {
        const { projectData, serviceData = [] } = fetchResult;

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Project Details</title>
                <style>
                    body { font-family: Arial; margin: 20px; padding: 20px; background-color: #f9f9f9; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; }
                    th { background-color: #f4f4f4; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Project Details</h1>
                <h2>General Information</h2>
                <table>
                    ${renderRow('Project Title', projectData.projectTitle)}
                    ${renderRow('Project ID', projectData.projectId)}
                    ${renderRow('Description', projectData.projectDescription)}
                </table>
                <h2>Services</h2>
                ${serviceData.length ? renderServices(serviceData) : '<h3>No Services Available</h3>'}
            </body>
            </html>
        `);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
