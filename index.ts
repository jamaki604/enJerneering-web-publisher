const express = require('express');
const { createClient } = require('@supabase/supabase-js');
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

//function to fetch data, should work once updated. error shows its looking for data
//Should update though to use server side, I think this is using client side. 

async function fetchData(projectID) {
    try {
        const { data, error } = await supabase
            .from('projects') // Replace 'projects'  table name
            .select('*')
            .eq('id', projectID);

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

app.get('/:projectID', async (req, res) => {
    const projectID = req.params.projectID;

    const { data, error } = await fetchData(projectID);

    if (error) {
        res.status(500).send(`Error fetching project data: ${error.message}`);
    } else {
        res.send(`<b>Project ID:</b> ${projectID}<br><b>Data:</b> ${JSON.stringify(data)}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
