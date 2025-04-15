"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Project {
  projectId: string;
  projectTitle: string;
}

const DebugPage: React.FC = () => {
  const [projectId, setProjectId] = useState("");
  const [projectData, setProjectData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("recentProjects") || "[]");
    setRecentProjects(storedProjects);
  }, []);

  const handleNavigate = async () => {
    if (!projectId.trim()) {
      setError("Please enter a valid JSON filename.");
      return;
    }

    try {
      const filename = projectId.endsWith(".json") ? projectId : `${projectId}.json`;
      const res = await fetch(`/${filename}`);
      if (!res.ok) throw new Error("Failed to fetch file");

      const data = await res.json();
      const internalProjectId = data.projectData?.projectId;

      if (!internalProjectId) {
        throw new Error("No projectId found inside the JSON file.");
      }

      fetchProjectFileAndStore(internalProjectId, filename);
      router.push(`/viewer/${internalProjectId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to load or parse JSON. Make sure it contains projectData.projectId.");
    }
  };

  const fetchProjectData = async () => {
    setError(null);
    setProjectData(null);

    if (!projectId.trim()) {
      setError("Please enter a valid JSON filename.");
      return;
    }

    try {
      const filename = projectId.endsWith(".json") ? projectId : `${projectId}.json`;
      const res = await fetch(`/${filename}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch /${filename}`);
      }

      const data = await res.json();
      const internalProjectId = data.projectData?.projectId || "Unknown";

      fetchProjectFileAndStore(internalProjectId, filename);
      setProjectData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load JSON. Make sure the file exists and is correctly formatted.");
    }
  };

  const fetchProjectFileAndStore = (internalId: string, filename: string) => {
    const cleanedName = filename.replace(".json", "");
    const newProject: Project = {
      projectId: internalId,
      projectTitle: cleanedName,
    };

    const updatedProjects = [
      newProject,
      ...recentProjects.filter((p) => p.projectId !== internalId),
    ].slice(0, 5);

    setRecentProjects(updatedProjects);
    localStorage.setItem("recentProjects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900">enJerneering UI Viewer</h1>
          <h2 className="text-lg font-medium text-gray-600 mt-2">Debug Panel</h2>
        </div>

        <p className="text-gray-600 text-center mb-6">
          Enter the name of your <span className="font-semibold text-gray-800">local JSON file</span> to navigate or test it. Example: <code>data.json</code>
        </p>

        {/* Input */}
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Enter JSON file name (e.g. data.json)"
            className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons with fixed width */}
          <div className="flex space-x-4">
            <button
              onClick={handleNavigate}
              className="w-48 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition duration-300"
            >
              Go to Viewer
            </button>

            <button
              onClick={fetchProjectData}
              className="w-48 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition duration-300"
            >
              Data Test
            </button>
          </div>
        </div>

        {/* Project Data Output */}
        {projectData && (
          <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg overflow-auto max-h-64">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Project Data:</h2>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">{JSON.stringify(projectData, null, 2)}</pre>
          </div>
        )}

        {/* Recently Tested Projects */}
        {recentProjects.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Recently Tested Projects</h2>
            <div className="space-y-2">
              {recentProjects.map(({ projectId, projectTitle }) => (
                <button
                  key={projectId}
                  onClick={() => setProjectId(`${projectTitle}.json`)}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-2 rounded-lg transition duration-300"
                >
                  {projectTitle}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugPage;
