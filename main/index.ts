import express, { Request, Response, NextFunction } from "express";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { format } from "date-fns";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

// Import HeaderFooterType component 
import FooterType1 from "../components/Footer/_FooterType1";
import HeaderType1 from "../components/Header/_HeaderType1";
import ContactType1 from "../components/Contact/_ContactType1";
import CallToActionType1 from "../components/CallToAction/_CallToActionType1";
import MainContentType1 from "../components/MainContent/_MainContentType1";

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

        const { data: designData, error: designErr } = await supabase
            .from("designs")
            .select("*")
            .eq("projectId", projectId);

        if (designErr) {
            throw new Error(`WebElements error: ${designErr.message}`);
        }

        let designId = designData[designData.length-1]?.designId

        const { data: pagesData, error: pagesErr } = await supabase
            .from("pages")
            .select("*")
            .eq("designId", designId);

        if (pagesErr) {
            throw new Error(`WebElements error: ${pagesErr.message}`);
        }

        console.log("Pages Data", pagesData)
        let pageId = pagesData?.find(page => page.pageTitle === "Landing Page").pageId;

        const { data: layerData, error: layerErr } = await supabase
            .from("layers")
            .select("*")
            .eq("pageId", pageId);

        if (layerErr) {
            throw new Error(`WebElements error: ${layerErr.message}`);
        }


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
            designData,
            pagesData,
            layerData
        };
    } catch (error) {
        console.error(`[Fetch Data] Error for Project ID ${projectId}:`, (error as Error).message);
        return { error };
    }
}

app.get("/test-fetch", async (req: Request, res: Response): Promise<void> => {
    const projectId = "195c502b-81ca-4f56-8442-aa9659f4baef";

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
    const sampleProjectId = "195c502b-81ca-4f56-8442-aa9659f4baef";

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Enjerneering WebInfoViewer</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #4CAF50; }
                p { font-size: 18px; }
                a, button { text-decoration: none; color: #2196F3; font-weight: bold; cursor: pointer; }
                button { padding: 10px 20px; background-color: #4CAF50; border: none; color: white; border-radius: 5px; margin: 10px; }
                button:hover { background-color: #45a049; }
                input { padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin: 10px; }
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
            <br>
            <input type="text" id="projectIdInput" placeholder="Enter Project ID">
            <button onclick="redirectToDebug()">Go to Debug</button>
            <script>
                function redirectToDebug() {
                    const projectId = document.getElementById('projectIdInput').value;
                    if (projectId) {
                        window.location.href = '/debug/' + projectId;
                    } else {
                        alert('Please enter a Project ID');
                    }
                }
            </script>
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

app.get("/debug/:projectId", async (req: Request, res: Response): Promise<void> => {
    const projectId = req.params.projectId;

    console.log(`Received request for debug: ${projectId}`);

    try {
        const { data: webElementsData, error: webElementsErr } = await supabase
            .from("web-elements")
            .select("*")
            .eq("projectId", projectId)
            .single();

        if (webElementsErr) {
            throw new Error(`WebElements error: ${webElementsErr.message}`);
        }

        const { data: designData, error: designErr } = await supabase
            .from("designs")
            .select("*")
            .eq("projectId", projectId)

        if (designErr) {
            throw new Error(`WebElements error: ${designErr.message}`);
        }

        let designId = designData[designData.length - 1]?.designId

        const { data: pagesData, error: pagesErr } = await supabase
            .from("pages")
            .select("*")
            .eq("designId", designId);

        if (pagesErr) {
            throw new Error(`WebElements error: ${pagesErr.message}`);
        }

        console.log("Pages Data", pagesData)
        let pageId = pagesData?.find(page => page.pageTitle === "Landing Page").pageId;

        const { data: layerData, error: layerErr } = await supabase
            .from("layers")
            .select("*")
            .eq("pageId", pageId);

        if (layerErr) {
            throw new Error(`WebElements error: ${layerErr.message}`);
        }

        console.log("Layer Data: ", layerData)

        const headerLayer = layerData?.find(layer => layer.componentType === "Header");
        const headerData = headerLayer ? JSON.parse(headerLayer.content) : {};

        const footerData = webElementsData?.footerData ? JSON.parse(webElementsData.footerData) : {};

        console.log("Header Data:", JSON.stringify(headerData, null, 2));
        console.log("Footer Data:", JSON.stringify(footerData, null, 2));

        const headerHtml = ReactDOMServer.renderToString(React.createElement(HeaderType1, { data: headerData }));
        const footerHtml = ReactDOMServer.renderToString(React.createElement(FooterType1, { data: footerData }));

        const renderSection = (layer: { content: string; componentType: any; }) => {
            let layerContent = JSON.parse(layer.content)
            switch(layer.componentType){
                case "Header":
                    return ReactDOMServer.renderToString(React.createElement(HeaderType1, { data: layerContent }));
                case "MainContent":
                    return ReactDOMServer.renderToString(React.createElement(MainContentType1, { data: layerContent }));
                case "CallToAction":
                    return ReactDOMServer.renderToString(React.createElement(CallToActionType1, { data: layerContent }));
                case "Contact":
                    return ReactDOMServer.renderToString(React.createElement(ContactType1, { data: layerContent }));
                default:
                    return ""
            }
        }

        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Header & Footer Debug</title>
                <link rel="stylesheet" href="/globals.css">
                <style>
                    .btn-debug { padding: 10px 20px; background-color: #4CAF50; border: none; color: white; border-radius: 5px; margin: 10px; cursor: pointer; }
                    .btn-debug:hover { background-color: #45a049; }
                </style>
            </head>
            <body>
                ${layerData && layerData.length > 0 
                    ? layerData.map((layer) => `
                        <div id="${layer.componentType}">${renderSection(layer)}</div>
                    `).join('')
                    : "<></>"
                }
                <div id="footer">${footerHtml}</div>
                <button class="btn-debug" onclick="window.location.href='/'">Back to Main Page</button>
            </body>
            </html>
        `;

        res.status(200).send(fullHtml);
    } catch (error) {
        console.error("Error fetching header/footer data:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
