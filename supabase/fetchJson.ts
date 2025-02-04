import fs from 'fs';
import { supabase } from './client';

export async function fetchJson(projectId: string): Promise<void> {
  try {
    // Fetch data from 'projects' with specific id
    const { data, error } = await supabase
      .from('projects') 
      .select('*') 
      .eq('projectId', projectId); 

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.log(`No data found for project ID: ${projectId}`);
      return;
    }

    // Writes data to JSON file
    const fileName = `project_${projectId}.json`;
    fs.writeFileSync(fileName, JSON.stringify(data[0], null, 2));
    console.log(`Data for project ID ${projectId} exported to ${fileName}`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Unexpected error:', errorMessage);
  }
}

// Replace 'your_project_id' with the actual ID you want to fetch
const testProjectId: string = "e4434d9e-6300-4b53-ba95-4aa59a45d222";
fetchJson(testProjectId).catch(console.error);
