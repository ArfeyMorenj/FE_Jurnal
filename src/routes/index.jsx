import { createBrowserRouter } from "react-router-dom";
import Home from "../features/home/pages/Home";
import MainLayout from "../layout/MainLayout";
import News from "../features/news/pages/News";
import About from "../features/about/pages/About";
import ProtectedLayout from "../layout/ProtectedLayout";
import SchoolLayout from "../layout/SchoolLayout";
import DashboardPage from "../features/admin/dashboard/DashboardPage";
import NewsPage from "../features/admin/news/pages/NewsPage";
import ListAplikasi from "../features/applications/pages/ListAplikasi";
import NewsDetail from "../features/news/pages/NewsDetail";
import LoginPage from "../features/auth/pages/Login";
import ContactPage from "../features/contact/pages/ContactPage";
import BerandaPage from "../features/admin/beranda/pages/BerandaPage";
import ApplicationPage from "../features/admin/application/pages/ApplicationPage";
import HeroSectionPage from "../features/admin/beranda/pages/HeroSectionPage";
import HighlightSectionPage from "../features/admin/beranda/pages/HighlightSectionPage";
import BenefitSectionPage from "../features/admin/beranda/pages/BenefitSectionPage";
import AppsSectionPage from "../features/admin/beranda/pages/AppsSectionPage";
import FaqSectionPage from "../features/admin/beranda/pages/FaqSectionPage";
import PromotionSectionPage from "../features/admin/beranda/pages/PromotionSectionPage";
import FooterSectionPage from "../features/admin/beranda/pages/FooterSectionPage";
import TentangPage from "../features/admin/tentang/tentang-kami/page";
import TimDevPage from "../features/admin/tentang/timDev/page";
import SponsorPage from "../features/admin/tentang/sponsor/page";
import HistoryPage from "../features/admin/tentang/hostory/page";
import NewsList from "../features/admin/news/pages/NewsList";
import NewsDetailAdmin from "../features/admin/news/pages/NewsDetail";
import NewsAdd from "../features/admin/news/pages/NewsAdd";
import NewsEdit from "../features/admin/news/pages/NewsEdit";
import HeroDetailPage from "../features/admin/beranda/pages/HeroDetailPage";
import NotFoundPage from "../features/NotFoundPage";
import ContactAdminPage from "../features/admin/contact/pages/ContactPage"
import ContactMasukPage from "../features/admin/contact/pages/contact-masuk";
import ContactByIdPage from "../features/admin/contact/pages/contatctById";
import KontakBalasPesanPage from "../features/admin/contact/pages/KontakBalasPesan";
import TablePage from "../features/admin/tentang/hostory/TablePage";
import TestimonialSectionPage from "../features/admin/beranda/pages/TestimonialSectionPage";
import DetailTestimonialPage from "../features/admin/beranda/pages/DetailTestimonialPage";
import AddTestimonialPage from "../features/admin/beranda/pages/AddTestimonialPage";
import EditTestimonialPage from "../features/admin/beranda/pages/EditTestimonialPage";
import AppsSection from '../features/admin/application/pages/AppsSection'
import FeatureSection from "../features/admin/application/pages/featureSection";
import DetailAplikasiAdmin from "../features/admin/application/pages/DetailAplikasi";
import HeroSectionById from "../features/admin/application/pages/HeroSectionById";
import ApplicationHeroBySlug from "../features/admin/application/pages/ApplicationHeroBySlug";
import ApplicationFeatureBySlug from "../features/admin/application/pages/ApplicationFeatureBySlug";
import ApplicationTestimonialBySlug from "../features/admin/application/pages/ApplicationTestimonialBySlug";
import ApplicationFaqBySlug from "../features/admin/application/pages/ApplicationFaqBySlug";
import HomePageTentang from "../features/admin/tentang/HomePageTentang/page";
import DetailAplikasi from "../features/applications/pages/detailAplikasi";
import UserPage from "../features/admin/rebuild/user/pages/UserPage";
import DetailPage from "../features/admin/rebuild/user/pages/DetailPage";
import ProfilePage from "../features/admin/rebuild/profile/pages/ProfilePage";
import UbahProfile from "../features/admin/rebuild/profile/pages/UbahProfile";
import UbahPassword from "../features/admin/rebuild/profile/pages/UbahPassword";
import ClassListPage from "../features/school/class/pages/ClassListPage";
import ClassDetail from "../features/school/class/pages/ClassDetail";
import TaskDetail from "../features/school/class/pages/TaskDetail";
import JournalDetail from "../features/school/class/pages/JournalDetail";
import PremiumPage from "../features/admin/rebuild/premium/pages/PremiumPage";
import CreatePremiumPage from "../features/admin/rebuild/premium/pages/CreatePremiumPage";
import EditPremiumPage from "../features/admin/rebuild/premium/pages/EditPremiumPage";
import DetailPremiumPage from "../features/admin/rebuild/premium/pages/DetailPremiumPage";
import PengajarPage from "../features/admin/sekolah/user/pengajar/pages/PengajarPage";
import DetailPengajarPage from "../features/admin/sekolah/user/pengajar/pages/DetailPengajarPage";
import SiswaPage from "../features/admin/sekolah/user/siswa/pages/SiswaPage";
import DetailSiswaPage from "../features/admin/sekolah/user/siswa/pages/DetailSiswaPage";
import PricingPage from "../features/admin/sekolah/premium/pages/PricingPage";
import CheckoutPremium from "../features/admin/sekolah/premium/pages/CheckoutPremium";
import TransaksiPage from "../features/admin/rebuild/transaksi/pages/TransaksiPage";
import DetailTransaksiPage from "../features/admin/rebuild/transaksi/pages/DetailTransaksi";
import SchoolDashboard from "../features/school/dashboard/page";
import SubscribePage from "../features/school/transaction/pages/SubscribePage";
import DetailSubscribePage from "../features/school/transaction/pages/DetailSubscribePage";
import BankCheckout from "../features/admin/sekolah/premium/pages/BankCheckout";
import EwalletCheckout from "../features/admin/sekolah/premium/pages/EwalletCheckout";
import TermsAndConditions from "../features/syarat-dan-ketentuan/pages/TermsAndConditions";
import TestimonialSectionApp from "../features/admin/application/pages/TestimonialSectionApp";
import FaqSectionApps from "../features/admin/application/pages/FaqSectionApps";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "aplikasi", 
        children: [
          {
            index: true, 
            element: <ListAplikasi />
          },
          {
            path: ":slug",
            element: <DetailAplikasi />
          }
        ]
      },
      {
        path: "berita",
        element: <News />
      },
      {
        path: "/berita/:slug",
        element: <NewsDetail />
      },
      {
        path: "tentang-kami",
        element: <About />
      },
      {
        path: "kontak",
        element: <ContactPage />
      }
    ]
  },
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: "berita",
        element: <NewsList />
      },
      {
        path: "berita/tambah",
        element: <NewsAdd />
      },
      {
        path: "berita/:id/edit",
        element: <NewsEdit />
      },
      {
        path: "berita/:id",
        element: <NewsDetailAdmin />
      },
      {
        path: "pengaturan-berita",
        element: <NewsPage />
      },
      {
        path: "beranda",
        element: <BerandaPage />
      },
      {
        path: "beranda/hero-section/:sectionId/:bannerId",
        element: <HeroDetailPage />,
      },
      {
        path: "beranda/hero-section",
        element: <HeroSectionPage />,
      },
      {
        path: "beranda/highlight-section",
        element: <HighlightSectionPage />,
      },
      {
        path: "beranda/benefit-section",
        element: <BenefitSectionPage />,
      },
      {
        path: "beranda/apps-section",
        element: <AppsSectionPage />,
      },
      {
        path: "beranda/faq-section",
        element: <FaqSectionPage />,
      },
      {
        path: "beranda/testimonial-section",
        element: <TestimonialSectionPage />,
      },
      {
        path: "beranda/testimonial-detail/:sectionId/:id",
        element: <DetailTestimonialPage />,
      },
      {
        path: "beranda/testimonial-add/:sectionId",
        element: <AddTestimonialPage />,
      },
      {
        path: "beranda/testimonial-edit/:sectionId/:id",
        element: <EditTestimonialPage />,
      },
      {
        path: "beranda/promotion-section",
        element: <PromotionSectionPage />,
      },
      {
        path: "beranda/footer-section",
        element: <FooterSectionPage />,
      },
      {
        path: "aplikasi",
        element: <ApplicationPage />
      },
      {
        path: "aplikasi/:slug/hero",
        element: <ApplicationHeroBySlug />,
      },
      {
        path: "aplikasi/:slug/feature",
        element: <ApplicationFeatureBySlug />,
      },
      {
        path: "aplikasi/:slug/testimonial",
        element: <ApplicationTestimonialBySlug />,
      },
      {
        path: "aplikasi/:slug/faq",
        element: <ApplicationFaqBySlug />,
      },
      {
        path: "aplikasi/testimonial-section/:sectionId",
        element: <TestimonialSectionApp />,
      },
      {
        path: "aplikasi/testimonial-add/:sectionId",
        element: <AddTestimonialPage />,
      },
      {
        path: "aplikasi/testimonial-detail/:sectionId/:id",
        element: <DetailTestimonialPage />,
      },
      {
        path: "aplikasi/testimonial-edit/:sectionId/:id",
        element: <EditTestimonialPage />,
      },
      {
        path: "aplikasi/hero-section/:sectionId",
        element: <HeroSectionById />,
      },
      {
        path: "aplikasi/faq-section/:sectionId",
        element: <FaqSectionApps />,
      },
      {
        path: "aplikasi/AppsSection",
        element: <AppsSection />
      },
      {
        path: 'aplikasi/FeatSection',
        element: <FeatureSection />
      },
      {
        path: 'aplikasi/detail/:applicationId',
        element: <DetailAplikasiAdmin />
      },
      {
        path: 'aplikasi/feature-section/:id',
        element: <FeatureSection />
      },
      {
        path: 'tentang/pages',
        element: <TentangPage />
      },
      {
        path: "tentang",
        element: <HomePageTentang />
      },
      {
        path: "tentang/tim-dev",
        element: <TimDevPage />
      },
      {
        path: "tentang/sponsor",
        element: <SponsorPage />
      },
      {
        path: "tentang/history",
        element: <HistoryPage />
      },
      {
        path: "tentang/history/table",
        element: <TablePage />
      },
      {
        path: "pengaturan-kontak",
        element: <ContactAdminPage />
      },
      {
        path: "kotak-masuk",
        element: <ContactMasukPage />
      },
      {
        path: "kotak-masuk/:id",
        element: <ContactByIdPage />
      },
      {
        path: "kotak-masuk/:id/balas",
        element: <KontakBalasPesanPage />
      },
      {
        path: "user",
        element: <UserPage />
      },
      {
        path: "user/:id",
        element: <DetailPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "ubah-profile",
        element: <UbahProfile />
      },
      {
        path: "ubah-password",
        element: <UbahPassword />
      },
      {
        path: "premium",
        element: <PremiumPage />
      },
      {
        path: "premium/create-premium",
        element: <CreatePremiumPage />
      },
      {
        path: "premium/edit/:id",
        element: <EditPremiumPage />
      },
      {
        path: "premium/detail/:id",
        element: <DetailPremiumPage />
      },
      {
        path: "riwayat-transaksi",
        element: <TransaksiPage />
      },
      {
        path: "riwayat-transaksi/:reference",
        element: <DetailTransaksiPage />
      }
    ]
  },
  {
    path: "/sekolah",
    element: <SchoolLayout />,
    children: [
      {
        path: 'dashboard',
        element: <SchoolDashboard />
      },
      {
        path: 'kelas',
        element: <ClassListPage />
      },
      {
        path: 'kelas/:classId/tugas/:taskId',
        element: <TaskDetail />
      },
      {
        path: 'kelas/:classId/jurnal/:journalId',
        element: <JournalDetail />
      },
      {
        path: 'kelas/:id',
        element: <ClassDetail />
      },
      {
        path: "pengguna/pengajar",
        element: <PengajarPage />
      },
      {
        path: "pengguna/pengajar/:id",
        element: <DetailPengajarPage />
      },
      {
        path: "pengguna/siswa",
        element: <SiswaPage />
      },
      {
        path: "pengguna/siswa/:id",
        element: <DetailSiswaPage />
      },
      {
        path: "paket-premium",
        element: <PricingPage />
      },
      {
        path: "checkout-premium/:id",
        element: <CheckoutPremium />
      },
      {
        path: 'riwayat-transaksi',
        element: <SubscribePage />
      },
      {
        path: 'riwayat-transaksi/:id',
        element: <DetailSubscribePage />
      },
      {
        path: "checkout-bank/:reference",
        element: <BankCheckout />
      },
      {
        path: "checkout-ewallet/:reference",
        element: <EwalletCheckout />
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/syarat-dan-ketentuan",
    element: <TermsAndConditions />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
