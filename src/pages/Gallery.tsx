import { useState } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import gallery25 from "@/assets/gallery-25.jpg";
import gallery26 from "@/assets/gallery-26.jpg";
import gallery27 from "@/assets/gallery-27.jpg";
import gallery28 from "@/assets/gallery-28.jpg";
import gallery29 from "@/assets/gallery-29.jpg";
import gallery30 from "@/assets/gallery-30.jpg";
import gallery31 from "@/assets/gallery-31.jpg";

import gallery33 from "@/assets/gallery-33.jpg";
import gallery34 from "@/assets/gallery-34.jpg";
import gallery35 from "@/assets/gallery-35.jpg";
import gallery36 from "@/assets/gallery-36.jpg";
import gallery38 from "@/assets/gallery-38.jpg";
import gallery39 from "@/assets/gallery-39.jpg";
import gallery40 from "@/assets/gallery-40.jpg";
import gallery41 from "@/assets/gallery-41.jpg";
import gallery42 from "@/assets/gallery-42.jpg";
import gallery43 from "@/assets/gallery-43.jpg";
import gallery44 from "@/assets/gallery-44.jpg";
import gallery45 from "@/assets/gallery-45.jpg";
import gallery46 from "@/assets/gallery-46.jpg";
import gallery47 from "@/assets/gallery-47.jpg";
import gallery48 from "@/assets/gallery-48.jpg";
import gallery49 from "@/assets/gallery-49.jpg";
import gallery50 from "@/assets/gallery-50.jpg";
import gallery51 from "@/assets/gallery-51.jpg";
import gallery52 from "@/assets/gallery-52.jpg";

const images = [
  { src: gallery1, altKey: "gallery.altMensDaySummitAudience" },
  { src: gallery2, altKey: "gallery.altVolunteerRegistration" },
  { src: gallery3, altKey: "gallery.altEmpowaMenSpeakerBadge" },
  { src: gallery4, altKey: "gallery.altDepressionAndMentalHealthPanel" },
  { src: gallery5, altKey: "gallery.altMetroFmSpeakerSession" },
  { src: gallery6, altKey: "gallery.altWorldChangersSpeaker" },
  { src: gallery7, altKey: "gallery.altPanelDiscussionOnStage" },
  { src: gallery8, altKey: "gallery.altCommunityEventAudience" },
  { src: gallery9, altKey: "gallery.altEventAttendees" },
  { src: gallery10, altKey: "gallery.altYouthAtCommunityEvent" },
  { src: gallery11, altKey: "gallery.altGuestSpeakerPresentation" },
  { src: gallery12, altKey: "gallery.altAudienceEngagement" },
  { src: gallery13, altKey: "gallery.altSpeakerAddressingCrowd" },
  { src: gallery14, altKey: "gallery.altEventAttendeesSeated" },
  { src: gallery15, altKey: "gallery.altCommunityMembersAtVenue" },
  { src: gallery16, altKey: "gallery.altYouthAudience" },
  { src: gallery17, altKey: "gallery.altAttendeesAtSummit" },
  { src: gallery18, altKey: "gallery.altCommunityGathering" },
  { src: gallery19, altKey: "gallery.altDiscussionSession" },
  { src: gallery20, altKey: "gallery.altCrowdParticipation" },
  { src: gallery21, altKey: "gallery.altGolfDayTeamPhoto" },
  { src: gallery22, altKey: "gallery.altMentalHealthAwarenessGolfDay" },
  { src: gallery23, altKey: "gallery.altGolfDayLadiesTeam" },
  { src: gallery24, altKey: "gallery.altGolfersOnTheCourse" },
  { src: gallery25, altKey: "gallery.altGolfDayAtLavoWines" },
  { src: gallery26, altKey: "gallery.altGolfDayBackdrop" },
  { src: gallery27, altKey: "gallery.altGolfersWithUmbrellas" },
  { src: gallery28, altKey: "gallery.altCommunityFoodDistribution" },
  { src: gallery29, altKey: "gallery.altHumanitarianAidDrive" },
  { src: gallery30, altKey: "gallery.altCommunityOutreachEvent" },
  { src: gallery31, altKey: "gallery.altCommunityVolunteerEvent" },

  { src: gallery33, altKey: "gallery.altTeamCollaboration" },
  { src: gallery34, altKey: "gallery.altOutreachProgram" },
  { src: gallery35, altKey: "gallery.altMentalHealthAwarenessEvent" },
  { src: gallery36, altKey: "gallery.altCommunitySupportGathering" },
  { src: gallery38, altKey: "gallery.altCommunityWorkshop" },
  { src: gallery39, altKey: "gallery.altYouthEngagementProgram" },
  { src: gallery40, altKey: "gallery.altImpactInitiative" },
  { src: gallery41, altKey: "gallery.altCommunityOutreachProgram" },
  { src: gallery42, altKey: "gallery.altVolunteerEvent" },
  { src: gallery43, altKey: "gallery.altWorldChangersTeamGroupPhoto" },
  { src: gallery44, altKey: "gallery.altCommunityEventAuditorium" },
  { src: gallery45, altKey: "gallery.altYouthWorkshopSession" },
  { src: gallery46, altKey: "gallery.altCommunityAwarenessEvent" },
  { src: gallery47, altKey: "gallery.altAudienceAtCommunityEvent" },
  { src: gallery48, altKey: "gallery.altCommunityOutreachGathering" },
  { src: gallery49, altKey: "gallery.altEventVenueAudience" },
  { src: gallery50, altKey: "gallery.altVolunteerOutreachTeam" },
  { src: gallery51, altKey: "gallery.altCommunityHallEvent" },
  { src: gallery52, altKey: "gallery.altYouthEngagementSession" },
];

const Gallery = () => {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  const next = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));

  return (
    <div>

      <SEO title={t("gallery.seoTitle")} description={t("gallery.seoDescription")} path="/gallery" />
      <PageHero title={t("gallery.heroTitle")} subtitle={t("gallery.heroSubtitle")} bgImage={philanthropyBg} />
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label={t("gallery.sectionLabel")} title={t("gallery.sectionTitle")} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.04, duration: 0.4 }}
                className="rounded-xl overflow-hidden shadow-soft border border-border aspect-square cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={t(img.altKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white z-10"><X className="w-8 h-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white/80 hover:text-white z-10"><ChevronLeft className="w-10 h-10" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white/80 hover:text-white z-10"><ChevronRight className="w-10 h-10" /></button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[lightboxIndex].src}
              alt={t(images[lightboxIndex].altKey)}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-white/90 text-sm">{t(images[lightboxIndex].altKey)} • {lightboxIndex + 1}/{images.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
