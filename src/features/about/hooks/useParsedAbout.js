import { useMemo } from "react";
import { fixUrl } from "../../../utils/fixUrl";

export const useParsedAbout = (aboutData) => {
  return useMemo(() => {
    if (!aboutData) {
      return {
        paragraph1: "<p>&nbsp;</p>",
        paragraph2: "<p>&nbsp;</p>",
        imgAbout: "/images/default-about.jpg",
        imgStory: "/images/default-story.jpg",
      };
    }

    let paragraph1 = "<p>&nbsp;</p>";
    let paragraph2 = "<p>&nbsp;</p>";

    if (aboutData.description_about_us) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(aboutData.description_about_us, "text/html");
      const pTags = Array.from(doc.querySelectorAll("p"))
        .filter(p => p.textContent.trim() !== ""); 

      if (pTags.length >= 2) {
        paragraph1 = pTags[0].outerHTML;
        paragraph2 = pTags[1].outerHTML;
      } else if (pTags.length === 1) {
        paragraph1 = pTags[0].outerHTML;
        paragraph2 = aboutData.description_story_us
          ? `<p>${aboutData.description_story_us}</p>`
          : "<p>&nbsp;</p>";
      } else {
        paragraph1 = aboutData.description_story_us
          ? `<p>${aboutData.description_story_us}</p>`
          : "<p>&nbsp;</p>";
        paragraph2 = "<p>&nbsp;</p>";
      }
    }

    const imgAbout = aboutData?.image_about_us
      ? fixUrl(aboutData.image_about_us)
      : "/images/default-about.jpg";

    const imgStory = aboutData?.image_story_us
      ? fixUrl(aboutData.image_story_us)
      : "/images/default-story.jpg";

    return {
      paragraph1,
      paragraph2,
      imgAbout,
      imgStory,
    };
  }, [aboutData]);
};
