import apiClient from "../../../../lib/axios";

// Transform raw API data menjadi format yang digunakan aplikasi
const transformApplicationData = (data) => {
  if (!data) return null;
  
  return {
    id: data.id,
    leadInText: data.lead_in_text,
    name: data.name,
    slug: data.slug,
    description: data.description,
    image: data.image,
    buttonText: data.button_text,
    buttonLink: data.button_link,
    textColor: data.text_color,
    colorGradientStart: data.color_gradient_start,
    colorGradientEnd: data.color_gradient_end,
    isActive: data.is_active,
    section: data.section ? {
      id: data.section.id,
      name: data.section.name,
      title: data.section.title,
      description: data.section.description,
      slug: data.section.slug,
      banners: data.section.banners || [],
      faqs: data.section.faqs || [],
      testimonials: data.section.testimonials || [],
    } : null,
    features: data.features || [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

// GET ALL Applications
export const getAllApplications = async (page = 1, search = '') => {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    if (search) {
      params.append('search', search);
    }

    const response = await apiClient.get(`/applications?${params}`);
    
    return {
      data: response.data?.data?.map(transformApplicationData) || [],
      meta: response.data?.meta,
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// GET Application Detail
export const getApplicationById = async (sectionId, applicationId) => {
  try {
    
    if (!sectionId) {
      throw new Error('Section ID tidak ditemukan');
    }
    
    if (!applicationId) {
      throw new Error('Application ID tidak ditemukan');
    }

    const response = await apiClient.get(
      `/sections/${sectionId}/applications/${applicationId}`
    );
    
    return {
      application: response.data?.data,
      meta: response.data?.meta,
    };
  } catch (error) {
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

// CREATE Application dan section
export const createApplication = async (applicationData) => {
  try {
    const appName = applicationData.get('name');
    
    if (!appName) {
      throw new Error('Nama aplikasi wajib diisi');
    }
    
    // Generate slug dari nama
    const appSlug = appName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Create section dulu
    const sectionPayload = {
      name: appName,
      title: `Section ${appName}`,
      description: `Section untuk aplikasi ${appName}`,
      slug: appSlug
    };
    
    const sectionResponse = await apiClient.post('/sections', sectionPayload);
    const newSection = sectionResponse.data?.data;
    
    if (!newSection || !newSection.id) {
      throw new Error('Gagal membuat section untuk aplikasi');
    }
    
    const sectionId = newSection.id;
    
    // Create aplikasi dengan section ID yang baru dibuat
    const appResponse = await apiClient.post(
      `/sections/${sectionId}/applications`,
      applicationData
    );

    return {
      application: transformApplicationData(appResponse.data?.data),
      sectionId: sectionId,
      meta: appResponse.data?.meta,
    };
  } catch (error) {
    console.error("Error creating application:", error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

// UPDATE Application
export const updateApplication = async (sectionId, applicationId, applicationData) => {
  try {
    if (!sectionId) {
      throw new Error('Section ID tidak ditemukan');
    }

    // Update aplikasi
    const response = await apiClient.post(
      `/sections/${sectionId}/applications/${applicationId}`,
      applicationData
    );

    // Extract nama baru untuk update section
    const newName = applicationData.get('name');
    
    if (newName) {
      const newSlug = newName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Update section juga
      try {
        await apiClient.put(`/sections/${sectionId}`, {
          name: newName,
          title: `Section ${newName}`,
          description: `Section untuk aplikasi ${newName}`,
          slug: newSlug
        });
      } catch (sectionError) {
        console.warn('Failed to update section:', sectionError);
      }
    }

    return {
      application: transformApplicationData(response.data?.data),
      meta: response.data?.meta,
    };
  } catch (error) {
    console.error("Error updating application:", error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

// DELETE Application
export const deleteApplication = async (sectionId, applicationId) => {
  try {
    if (!sectionId) {
      throw new Error('Section ID tidak ditemukan');
    }

    // Delete aplikasi
    const response = await apiClient.delete(
      `/sections/${sectionId}/applications/${applicationId}`
    );

    // Delete section juga 
    try {
      await apiClient.delete(`/sections/${sectionId}`);
    } catch (sectionError) {
      console.warn('Failed to delete section:', sectionError);
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting application:", error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};