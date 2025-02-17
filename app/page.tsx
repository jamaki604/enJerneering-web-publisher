"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FooterType1 from "@components/Footer/_FooterType1";
import HeaderType1 from "@components/Header/_HeaderType1";
import ContactType1 from "@components/Contact/_ContactType1";
import CallToActionType1 from "@components/CallToAction/_CallToActionType1";
import MainContentType1 from "@components/MainContent/_MainContentType1";
import { createClient } from "../supabase/client";

const supabase = createClient();
const projectId = "195c502b-81ca-4f56-8442-aa9659f4baef";

const BuilderPage: React.FC = () => {
  const [headerData, setHeaderData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);
  const [sections, setSections] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Received request for debug: ${projectId}`);

      try {
        // Fetch web elements
        const { data: webElementsData, error: webElementsErr } = await supabase
          .from("web-elements")
          .select("*")
          .eq("projectId", projectId)
          .single();

        if (webElementsErr) {
          throw new Error(`WebElements error: ${webElementsErr.message}`);
        }

        // Fetch design data
        const { data: designData, error: designErr } = await supabase
          .from("designs")
          .select("*")
          .eq("projectId", projectId ?? "");

        if (designErr) {
          throw new Error(`Designs error: ${designErr.message}`);
        }

        let designId = designData?.[designData.length - 1]?.designId;

        // Fetch pages data
        const { data: pagesData, error: pagesErr } = await supabase
          .from("pages")
          .select("*")
          .eq("designId", designId);

        if (pagesErr) {
          throw new Error(`Pages error: ${pagesErr.message}`);
        }

        console.log("Pages Data", pagesData);

        let pageId = pagesData?.find(
          (page) => page.pageTitle === "Landing Page",
        )?.pageId;

        // Fetch layers data
        const { data: layerData, error: layerErr } = await supabase
          .from("layers")
          .select("*")
          .eq("pageId", pageId ?? "");

        if (layerErr) {
          throw new Error(`Layers error: ${layerErr.message}`);
        }

        console.log("Layer Data: ", layerData);

        // Extract header and footer data
        const headerLayer = layerData?.find(
          (layer) => layer.componentType === "Header",
        );
        const parsedHeaderData = headerLayer
          ? JSON.parse(headerLayer.content)
          : {};

        const parsedFooterData = webElementsData?.footerData
          ? JSON.parse(webElementsData.footerData)
          : {};

        console.log("Header Data:", JSON.stringify(parsedHeaderData, null, 2));
        console.log("Footer Data:", JSON.stringify(parsedFooterData, null, 2));

        setHeaderData(parsedHeaderData);
        setFooterData(parsedFooterData);

        // Render sections
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
          return (
            <MainContentType1 key={layer.componentType} data={layerContent} />
          );
        case "CallToAction":
          return (
            <CallToActionType1 key={layer.componentType} data={layerContent} />
          );
        case "Contact":
          return <ContactType1 key={layer.componentType} data={layerContent} />;
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

  return <div className="h-full w-full">{sections} </div>;
};

export default BuilderPage;
