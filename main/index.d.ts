export function fetchData(projectId: string): Promise<{
    projectData: any;
    serviceData: any[];
    textboxData: any;
    footerData: any;
    error?: Error;
}>;

export function fetchProjectData(projectId: string): Promise<any>;
export function fetchElementData(projectId: string): Promise<any>;
export function getTextBoxData(elementData: any): any;
export function getFooterData(elementData: any): any;
export function fetchServiceData(projectId: string): Promise<any[]>;
export function getServiceData(projectId: string): Promise<any[]>;
export function parseData(data: any, dataRequest: string): any;
