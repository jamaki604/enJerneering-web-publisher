import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type PageData = {
  pageId: string;
  pageTitle: string;
  designId: string;
};

type DesignData = {
  designId: string;
  projectId: string;
};

const ProjectRedirectPage = async ({ params }: { params: { projectId: string } }) => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/data.json`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  const viewerData = await res.json();

  const design = viewerData.designData?.find(
    (d: DesignData) => d.projectId === params.projectId
  );

  const page = viewerData.pagesData?.find(
    (p: PageData) => p.designId === design?.designId
  );

  if (!page?.pageTitle) {
    return <p>No pages found in data.json</p>;
  }

  const firstPageParsed = page.pageTitle.replace(" ", "-");

  redirect(`/viewer/${params.projectId}/${firstPageParsed}`);
};

export default ProjectRedirectPage;
