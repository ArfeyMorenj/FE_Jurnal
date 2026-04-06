import { getImageUrl } from "../../../utils/image";

/**
 * Transform data aplikasi dari API ke format yang dibutuhkan AppSection
 * 
 * API Response:
 * - id: "a0934c12-a961-4459-9e0f-fa34b5545c4a"
 * - name: "jurnal-mengajar"
 * - lead_in_text: "jurnal-mengajar"  
 * - slug: "jurnal-mengajar"
 * - description: "ini adalah aplikasi jurnal untuk keuangan"
 * - image: null atau URL
 * - button_text: "Selengkapnya"
 * - button_link: null atau URL
 * - text_color: "#1088A3"
 * - section: { id: "...", name: "..." }
 * - features: [...]
 * 
 * AppSection Props:
 * - title: "Jurnal Mengajar"
 * - description: "..."
 * - buttonText: "Lihat Detail"
 * - buttonColor: "#E45E14"
 * - image: "/images/phone/phone1.png"
 * - linkRoute: "/aplikasi/jurnal-mengajar" (atau onClick handler)
 */
export const mapApplicationToAppSection = (app, index) => {
  // Format nama jadi Title Case (jurnal-mengajar -> Jurnal Mengajar)
  const formatTitle = (name) => {
    if (!name) return "";
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get gradient colors - check both snake_case and camelCase
  // Handle null explicitly (null || value doesn't work, need to check for null/undefined)
  const gradientColor1 = (app.color_gradient_start != null && app.color_gradient_start !== '') 
    ? app.color_gradient_start 
    : (app.colorGradientStart != null && app.colorGradientStart !== '') 
      ? app.colorGradientStart 
      : "#CA2323";
  const gradientColor2 = (app.color_gradient_end != null && app.color_gradient_end !== '') 
    ? app.color_gradient_end 
    : (app.colorGradientEnd != null && app.colorGradientEnd !== '') 
      ? app.colorGradientEnd 
      : "#E45E14";

  return {
    ...app,
    
    title: formatTitle(app.name) || formatTitle(app.lead_in_text),
    description: app.description || "",
    buttonText: app.button_text || "Lihat Detail",
    buttonColor: app.text_color || "#E45E14",
    image: app.image ? getImageUrl(app.image) : `/images/phone/phone${(index % 2) + 1}.png`,
    
    linkRoute: app?.slug ? `/aplikasi/${app.slug}` : "/aplikasi",
    
    // Gradient colors for BackgroundApps
    gradientColor1,
    gradientColor2,
    
    id: app.id,
    slug: app.slug,
    section: app.section,
    features: app.features,
    name: app.name,
    lead_in_text: app.lead_in_text,
  };
};

/**
 * Transform array aplikasi dari API
 */
export const mapApplications = (applications = []) => {
  return applications.map((app, index) => mapApplicationToAppSection(app, index));
};