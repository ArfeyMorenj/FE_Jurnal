import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import ContactMap from "../components/ContactMap";
import { useContact } from "../../admin/contact/hooks/useContact";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function ContactPage() {
  const { contact, loading: loadingContact } = useContact();
  if (loadingContact) return <LoadingSpinner />;
  return (
  <div className="container mx-auto max-w-5xl py-8 md:py-10 px-4">
    <div className="grid grid-cols-1 md:grid-cols-[7fr_13fr] gap-8 md:gap-6 items-start">
      <div className="flex flex-col space-y-6 md:space-y-8">
        {contact && (
          <>
            <ContactMap url={contact.google_maps_link} />
            <ContactInfo data={contact} />
          </>
        )}
   
      </div>

      <div className="mt-8 md:mt-0">
        <ContactForm />
      </div>
    </div>
  </div>

  );
}
