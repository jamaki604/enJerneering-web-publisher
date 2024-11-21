//import { createClient } from '@supabase/supabase-ts';

const supabaseUrl = "https://ryahobupnpaxmebdbkae.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5YWhvYnVwbnBheG1lYmRia2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1ODM4MDYsImV4cCI6MjA0NjE1OTgwNn0.fv5vDtFAaHgmXEc-OIeW74tUfqqhXEdCSYGM-fp2wsw";
//const supabase = createClient(supabaseUrl, supabaseKey);

const express = require('express')
const app = express()
const port = 3000

app.get('/:projectID', (req, res) => {
    const projectID = req.params.projectID;
    res.send('<b>' + projectID +'</b>');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

/*async function fetchData(projectID) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(QUERY FOR PROJECTID FROM TABLE);
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Data fetched:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  
  fetchData();
  */