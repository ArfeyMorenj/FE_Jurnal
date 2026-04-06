import React from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import ApplicationLayout from "../components/ApplicationLayout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useApplicationDetail } from "../hooks/useApplicationDetail";

const DetailAplikasi = () => {
  const { slug } = useParams();
  const location = useLocation();
  
  const sectionIdFromState = location.state?.sectionId;
  const applicationIdFromState = location.state?.applicationId;

  const { data: application, isLoading, error } = useApplicationDetail({
    slug,
    sectionId: sectionIdFromState, 
  });

  if (isLoading) {
    return <LoadingSpinner text="Memuat detail aplikasi..." />;
  }

  if (error || !application) {
    return <Navigate to="/404" replace />;
  }

  const sectionId = application.section?.id || sectionIdFromState;
  const applicationId = application.id || applicationIdFromState;
  
  const banners = application.section?.banners || [];
  const primaryBanner =
    banners.find((banner) => banner.published) || banners[0] || null;

  const heroData = {
    title:
      primaryBanner?.title ||
      application.lead_in_text ||
      application.name,
    description:
      primaryBanner?.description || application.description,
    primaryButtonText:
      primaryBanner?.button_text ||
      application.button_text ||
      "Selengkapnya",
    primaryButtonColor: application.text_color || "#E45E14",
    googlePlayLink: primaryBanner?.button_link || application.link || application.button_link,
    showGooglePlayButton: true,
    imageSrc: primaryBanner?.image || application.image,
    imageAlt: primaryBanner?.title || application.name,
    reverse: true,
  };

  const featuresData =
    application.features?.map((feature) => ({
      title: feature.name,
      description: feature.description || application.description,
      appName: application.lead_in_text || application.name,
      appNameColor: application.text_color || "#CA2323",
      backgroundColor: feature.color_gradient_start || "#FF6B6B",
      phoneImage:
        feature.feature_image || "/images/phone/iPhone15Pro.svg",
      circleIcon: null,
      circleIconImage: feature.icon_image || null,
      circleIconText: null,
      buttonText: application.button_text || "Selengkapnya",
      buttonColor: application.text_color || "#E45E14",
      linkRoute: application.button_link || "#",
    })) || [];

  return (
    <ApplicationLayout 
      heroData={heroData} 
      featuresData={featuresData}
      sectionId={sectionId}
      applicationId={applicationId}
    />
  );
};

export default DetailAplikasi;