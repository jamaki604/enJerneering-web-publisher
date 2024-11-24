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
const port = process.env.PORT || 3000;


async function fetchData(projectId) {
    try {
        const { data, error } = await supabase
            .from('projects') 
            .select() 
            .eq('projectId', projectId)     
            .single();                   

        if (error) {
            console.error('Error fetching data:', error);
            return { error };
        }

        console.log('Data fetched:', data);
        return { data };
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error };
    }
}


app.use(express.static('public'));

app.get('/:projectID', async (req, res) => {
    const projectID = req.params.projectID;

    const { data, error } = await fetchData(projectID); 

    if (error) {
        res.status(500).send(`<h1>Error fetching project data: ${error.message}</h1>`);
    } else {
        res.send(`
            <h1>Project Title: ${data.projectTitle}</h1>
            <p>Project ID: ${projectID}</p>
            <h2>This Project was created at ${format(data.createdAt, 'HH:mm MM/dd/yyyy')}</h2>
            <img src="${data.projectThumbnail}" alt = "Project Thumbnail"></img>
            <p>${data.projectThumbnail}</p>
            <img src="blob:https://enjerneering-ui-builder.vercel.app/fbda0354-ac76-441e-8bd5-a20a3a4454e5"></img>
            <iframe src = ${data.projectThumbnail}></iframe>
        `);
    }

});

//format(data.createdAt, 'dd/MM/yyyy HH:mm')


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
