const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { format } = require('date-fns')
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration: SUPABASE_URL or SUPABASE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);

const app = express();
const port = process.env.PORT || 4000;

async function fetchData(projectId) {
    try {
        // Fetch project data
        const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .select()
            .eq('projectId', projectId)
            .single();

        // Handle project data fetch errors
        if (projectError) {
            console.error('Error fetching project data:', projectError);
            return { error: projectError };
        }

        // Fetch textbox data
        const { data: textboxData, error: textboxError } = await supabase
            .from('text-box')
            .select('content')
            .eq('projectId', projectId)
            .single();

        // Handle textbox data fetch errors
        if (textboxError) {
            console.error('Error fetching textbox data:', textboxError);
            return { error: textboxError };
        }

        console.log('Project Data fetched:', projectData);
        console.log('Textbox Data fetched:', textboxData);

        return { projectData, textboxData };

    } catch (error) {
        console.error('Unexpected error:', error);
        return { error };
    }
}


app.use(express.static('public'));

app.get('/:projectID', async (req, res) => {
    const projectID = req.params.projectID;

    const { projectData, textboxData, error } = await fetchData(projectID); 

    if (error) {
        res.status(500).send(`<h1>Error fetching project data: ${error.message}</h1>`);
    } else {
        res.send(`
            <h1>Project Title: ${projectData.projectTitle}</h1>
            <p>Project ID: ${projectID}</p>
            <h2>This Project was created at ${format(projectData.createdAt, 'HH:mm MM/dd/yyyy')}</h2>
            <img src="${projectData.projectThumbnail}" alt = "Project Thumbnail"></img>
            <p>${projectData.projectThumbnail}</p>
            <img src="blob:https://enjerneering-ui-builder.vercel.app/fbda0354-ac76-441e-8bd5-a20a3a4454e5"></img>
            <iframe src = ${projectData.projectThumbnail}></iframe>
            <h1>TextBox Content: ${textboxData.content}</h1>
        `);
    }

});

//format(data.createdAt, 'dd/MM/yyyy HH:mm')


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
