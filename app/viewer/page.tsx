"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FooterType1 from "@components/Footer/_FooterType1";
import HeaderType1 from "@components/Header/_HeaderType1";
import ContactType1 from "@components/Contact/_ContactType1";
import CallToActionType1 from "@components/CallToAction/_CallToActionType1";
import MainContentType1 from "@components/MainContent/_MainContentType1";
import { createClient } from "../../supabase/client";
import TextBoxType from "@components/TextBox/_TextBox";

//added for successful build
export const dynamic = "force-dynamic";

const supabase = createClient();

const BuilderPage: React.FC = () => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [sections, setSections] = useState<JSX.Element[]>([]);
  const [footer, setFooter] = useState<JSX.Element[]>([]);
  
//added for successful build
  const SearchParamsWrapper: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("projectId");
    useEffect(() => {
      console.log("Extracted projectId from URL:", id);
      setProjectId(id);
    }, [id]);
    return null;
  };

  useEffect(() => {
    console.log("Checking projectId:", projectId);
    
    if (!projectId) {
      console.warn("No projectId found in URL.");
      return;
    }

    const fetchData = async () => {
      console.log(`Fetching data for projectId: ${projectId}`);

      try {
        const { data: webElementsData, error: webElementsErr } = await supabase
          .from("web-elements")
          .select("*")
          .eq("projectId", projectId)
          .single();

        if (webElementsErr) throw new Error(`WebElements error: ${webElementsErr.message}`);

        const { data: designData, error: designErr } = await supabase
          .from("designs")
          .select("*")
          .eq("projectId", projectId);

        if (designErr) throw new Error(`Designs error: ${designErr.message}`);

        let designId = designData?.[designData.length - 1]?.designId;

        const { data: pagesData, error: pagesErr } = await supabase
          .from("pages")
          .select("*")
          .eq("designId", designId);

        if (pagesErr) throw new Error(`Pages error: ${pagesErr.message}`);

        let pageId = pagesData?.find(
          (page) => page.pageTitle === "Landing Page",
        )?.pageId;

        const { data: layerData, error: layerErr } = await supabase
          .from("layers")
          .select("*")
          .eq("pageId", pageId ?? "");

        if (layerErr) throw new Error(`Layers error: ${layerErr.message}`);

        console.log("Layer Data:", layerData);

        const headerLayer = layerData?.find(
          (layer) => layer.componentType === "Header",
        );
        const parsedHeaderData = headerLayer
          ? JSON.parse(headerLayer.content)
          : {};

        const parsedFooterData = webElementsData?.footerData
          ? JSON.parse(webElementsData.footerData)
          : {};

        setFooter([<FooterType1 key={"footer"} data={parsedFooterData} />]);

        console.log("Header Data:", parsedHeaderData);
        console.log("Footer Data:", parsedFooterData);

        const renderedSections = (
          layerData?.map((layer) => renderSection(layer)) || []
        ).filter((section) => section !== null);

        setSections(renderedSections);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  const renderSection = (layer: { content: string; componentType: string }) => {
    try {
      const layerContent = JSON.parse(layer.content);

      switch (layer.componentType) {
        case "Header":
          return <HeaderType1 key={layer.componentType} data={layerContent} />;
        case "MainContent":
          return <MainContentType1 key={layer.componentType} data={layerContent} />;
        case "CallToAction":
          return <CallToActionType1 key={layer.componentType} data={layerContent} />;
        case "Contact":
          return <ContactType1 key={layer.componentType} data={layerContent} />;
        case "TextBox":
          return <TextBoxType key={layer.componentType} data={layerContent} />;
        default:
          return null;
      }
    } catch (error) {
      console.error(
        `Error rendering section for ${layer.componentType}:`,
        error,
      );
      return null;
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>
      
      <div className="h-full w-full">{sections}{footer}</div>
    </>
  );
};

export default BuilderPage;
