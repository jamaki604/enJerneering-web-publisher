import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@internalSupabase/client";

export const dynamic = "force-dynamic";

console.log("✅ Executing");

const supabase = createClient();

const ProjectRedirectPage = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;

  if (!projectId) {
    return <p>Project ID is missing.</p>;
  }

  const { data: designData, error: designErr } = await supabase
    .from("designs")
    .select("*")
    .eq("projectId", projectId);

  if (designErr || !designData || designData.length === 0) {
    return <p>Error fetching design data or no design found.</p>;
  }

  let designId = designData[designData.length - 1]?.designId;

  const { data: pagesData, error: pagesErr } = await supabase
    .from("pages")
    .select("*")
    .eq("designId", designId);

  if (pagesErr || !pagesData || pagesData.length === 0) {
    return <p>No pages found for this project.</p>;
  }

  const firstPageTitle = pagesData[0]?.pageTitle;


  if (!firstPageTitle) {
    return <p>First page not found.</p>;
  }

  const firstPageParsed = firstPageTitle.replace(" ", "-");

  redirect(`/viewer/${projectId}/${firstPageParsed}`);
};

export default ProjectRedirectPage;
