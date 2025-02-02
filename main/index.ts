import express, { Request, Response, NextFunction } from "express";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { format } from "date-fns";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

// Import your FooterType1 component (adjust the path as needed)
import FooterType1 from "../components/Footer/_FooterType1";

// Import styling and content components
import TextBoxStyle from "../public/componentHTML/style/textBoxStyle";
import TextBoxContent from "../public/componentHTML/content/textBoxContent";
import FooterStyle from "../public/componentHTML/style/footerStyle";
import FooterContent from "../public/componentHTML/content/footerContent";

dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase configuration: SUPABASE_URL or SUPABASE_KEY");
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Initialize styling and content components
let textBoxContent: TextBoxContent | null = null;
const textBoxStyle = new TextBoxStyle();
let footerContent: FooterContent | null = null;
const footerStyle = new FooterStyle();

// Middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

app.get("/test", (req, res) => {
    console.log("Test route hit!");
    res.send("Server is working!");
});


// Fetch data from Supabase
async function fetchData(projectId: string) {
    try {
        if (!projectId) {
            throw new Error("Invalid or missing Project ID");
        }

        console.log(`Fetching data for projectId: ${projectId}`);

        const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .select("*")
            .eq("projectId", projectId)
            .single();

        if (projectError) {
            throw new Error(`Project not found for Project ID: ${projectId}`);
        }

        const { data: elementData, error: elementError } = await supabase
            .from("web-elements")
            .select("*")
            .eq("projectId", projectId)
            .limit(1);

        const { data: serviceData, error: serviceError } = await supabase
            .from("services")
            .select("*")
            .eq("projectId", projectId);

        let parsedTextboxData: { content: string } | null = null;
        let parsedFooterData = null;

        if (elementData && elementData.length > 0) {
            try {
                parsedTextboxData = elementData[0].textBoxData ? JSON.parse(elementData[0].textBoxData) : null;
                parsedFooterData = elementData[0].footerData ? JSON.parse(elementData[0].footerData) : null;
            } catch (parseError) {
                console.error("Failed to parse JSON data:", (parseError as Error).message);
            }
        }

        return {
            projectData,
            serviceData: serviceData || [],
            textboxData: parsedTextboxData,
            footerData: parsedFooterData,
        };
    } catch (error) {
        console.error(`[Fetch Data] Error for Project ID ${projectId}:`, (error as Error).message);
        return { error };
    }
}

app.get("/test-fetch", async (req: Request, res: Response): Promise<void> => {
    const projectId = "056394f5-cf49-492d-85b0-9fa186f1f0ba";

    console.log(`Testing fetchData for Project ID: ${projectId}`);

    const fetchResult = await fetchData(projectId);

    if (fetchResult.error) {
        console.error("Fetch Data Error:", fetchResult.error);
        res.status(500).json({ error: (fetchResult.error as Error).message });
        return;
    }

    res.status(200).json(fetchResult);
});

app.get("/", (req: Request, res: Response) => {
    const sampleProjectId = "056394f5-cf49-492d-85b0-9fa186f1f0ba"; // Use a valid project ID from your database

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server Running</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #4CAF50; }
                p { font-size: 18px; }
                a { text-decoration: none; color: #2196F3; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>✅ Server is Running!</h1>
            <p>Use the following endpoints to fetch data:</p>
            <ul>
                <li><a href="/test-fetch">Test Fetch Data</a></li>
                <li><a href="/viewer/${sampleProjectId}">Viewer Page</a></li>
                <li><a href="/${sampleProjectId}">Project Details</a></li>
            </ul>
        </body>
        </html>
    `);
});


//  Route to fetch project details
app.get("/:projectId", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    if (!projectId || projectId === "null") {
        res.status(400).send("<h1>Invalid Project Request</h1>");
        return;
    }

    const fetchResult = await fetchData(projectId);

    if (fetchResult.error) {
        res.status(404).send(`<h1>Error: ${(fetchResult.error as Error).message}</h1>`);
    } else {
        const { projectData, serviceData } = fetchResult;

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Project Details</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f4f4f4; }
                </style>
            </head>
            <body>
                <h1>Project Details</h1>
                <table>
                    <tr><th>Title</th><td>${projectData.projectTitle}</td></tr>
                    <tr><th>Description</th><td>${projectData.projectDescription}</td></tr>
                    <tr><th>Domain</th><td>${projectData.projectDomain}</td></tr>
                    <tr><th>Status</th><td>${projectData.projectStatus}</td></tr>
                    <tr><th>Last Updated</th><td>${format(new Date(projectData.lastUpdated), "yyyy-MM-dd HH:mm:ss")}</td></tr>
                </table>

                <h2>Services</h2>
                ${serviceData && serviceData.length > 0 
                    ? serviceData.map((service, index) => `
                        <h3>Service ${index + 1}</h3>
                        <table>
                            <tr><th>ID</th><td>${service.serviceId}</td></tr>
                            <tr><th>Name</th><td>${service.serviceName}</td></tr>
                            <tr><th>Description</th><td>${service.serviceDescription}</td></tr>
                        </table>
                    `).join('')
                    : "<p>No services available</p>"
                }

                <button onclick="redirectToViewer()">Go to Viewer</button>
                <script>
                    function redirectToViewer() {
                        const projectId = "${projectId}";
                        window.location.href = "http://localhost:" + ${port} + "/viewer/" + projectId;
                    }
                </script>
            </body>
            </html>
        `);
    }
});

//  Viewer Page
app.get("/viewer/:projectId", async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    console.log(`Received request for viewer: ${projectId}`);

    if (!projectId || projectId === "null") {
        res.status(400).send("<h1>Invalid Project Request</h1>");
        return;
    }

    const fetchResult = await fetchData(projectId);

    if (fetchResult.error) {
        res.status(404).send(`<h1>Error: ${(fetchResult.error as Error).message}</h1>`);
    } else {
        const { textboxData, footerData } = fetchResult;

        textBoxContent = textboxData ? new TextBoxContent(textboxData) : null;
        footerContent = footerData ? new FooterContent(footerData) : null;

        console.log("textboxData:", textboxData);
        console.log("footerData:", footerData);
        console.log("textBoxContent:", textBoxContent);
        console.log("footerContent:", footerContent);

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Project Viewer</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; }
                        .content { max-width: 800px; margin: 0 auto; padding: 20px; }
                        .footer { margin-top: 40px; color: gray; font-size: 0.9rem; }
                        /* Include missing styles */
                        ${textBoxStyle.getStyle()}
                        ${footerStyle.getStyle()}
                    </style>
                </head>
                <body>
                   <div class="content">
            <h1>Project Viewer</h1>
            ${textboxData ? `<p>${textboxData.content}</p>` : "<p>No textbox data available</p>"}
            ${footerContent ? footerContent.getContent() : "<p>No footer data available</p>"}
        </div>
                <button onclick="redirectToDetails()">View Details</button>
                <script>
                    function redirectToDetails() {
                        const projectId = "${projectId}";
                        window.location.href = "http://localhost:" + ${port} + "/" + projectId;
                    }
                </script>
            </body>
            </html>
        `);
    }
});

app.get("/debug-footer/:projectId", async (req: Request, res: Response): Promise<void> => {
    const projectId = req.params.projectId;

    console.log(`Received request for debug: ${projectId}`);

    try {
      // Query the web-elements table for the given projectId
      const { data: webElementsData, error: webElementsErr } = await supabase
        .from("web-elements")
        .select("*")
        .eq("projectId", projectId)
        .single();
      if (webElementsErr) {
        throw new Error(`WebElements error: ${webElementsErr.message}`);
      }
  
      // Parse the footerData from the web-elements record (if available)
      const footerData = webElementsData?.footerData ? JSON.parse(webElementsData.footerData) : {};
  
      // Log the footer data in JSON format for debugging
      console.log("Footer Data:", JSON.stringify(footerData, null, 2));
  
      // Render the FooterType1 component to an HTML string
      const footerHtml = ReactDOMServer.renderToString(React.createElement(FooterType1, { data: footerData }));
  
      // Create an HTML page that includes the rendered footer
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Footer Debug</title>
            <link rel="stylesheet" href="/globals.css">
        </head>
        <body>
            <div id="footer">${footerHtml}</div>
        </body>
        </html>
      `;
  
      res.status(200).send(fullHtml);
    } catch (error) {
      console.error("Error fetching footer data:", (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
