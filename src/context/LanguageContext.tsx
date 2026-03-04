import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  "app.name": { bn: "সহায়তা২৪", en: "Sahayata24" },
  "app.tagline": { bn: "২৪/৭ আইনি সহায়তা", en: "24/7 Legal Assistance" },
  "nav.home": { bn: "হোম", en: "Home" },
  "nav.advocates": { bn: "অ্যাডভোকেট", en: "Advocates" },
  "nav.education": { bn: "শিক্ষা", en: "Education" },
  "nav.somjhota": { bn: "সমঝোতা", en: "Mediation" },
  "nav.guidelines": { bn: "গাইডলাইন", en: "Guidelines" },
  "nav.contact": { bn: "যোগাযোগ", en: "Contact" },
  "nav.registration": { bn: "রেজিস্ট্রেশন", en: "Registration" },
  "nav.advocateRegistration": {
    bn: "অ্যাডভোকেট রেজিস্ট্রেশন",
    en: "Advocate Registration",
  },
  "nav.emergency": { bn: "জরুরি সহায়তা", en: "Emergency Help" },

  // Hero Section
  "hero.title": { bn: "আইনি বিপদে?", en: "Legal Trouble?" },
  "hero.subtitle": { bn: "আমরা আপনার পাশে আছি", en: "We are here for you" },
  "hero.description": {
    bn: "২৪/৭ আইনি সহায়তা, বিশেষজ্ঞ অ্যাডভোকেট পরামর্শ এবং জরুরি সাহায্য - সব একই জায়গায়। আপনার আইনি সমস্যার সমাধান এখনই পান।",
    en: "24/7 legal assistance, expert advocate consultation, and emergency help - all in one place. Get solutions to your legal problems now.",
  },
  "hero.emergencyBtn": {
    bn: "🆘 জরুরি সহায়তা নিন",
    en: "🆘 Get Emergency Help",
  },
  "hero.chatBtn": { bn: "💬 চ্যাটবটের সাথে কথা বলুন", en: "💬 Chat with Bot" },
  "hero.legalAdvice": { bn: "আইনি পরামর্শ", en: "Legal Advice" },
  "hero.fromExperts": { bn: "বিশেষজ্ঞদের কাছ থেকে", en: "From Experts" },
  "hero.legalHelp": { bn: "আইনি সহায়তা", en: "Legal Help" },
  "hero.available247": { bn: "২৪/৭ উপলব্ধ", en: "Available 24/7" },
  "hero.advocateNetwork": {
    bn: "অ্যাডভোকেট নেটওয়ার্ক",
    en: "Advocate Network",
  },
  "hero.nationwide": { bn: "সারাদেশে বিস্তৃত", en: "Nationwide" },
  "hero.smartChatbot": { bn: "স্মার্ট চ্যাটবট", en: "Smart Chatbot" },
  "hero.smartChatbotDesc": {
    bn: "AI চালিত চ্যাটবট যা আপনার আইনি প্রশ্নের তাৎক্ষণিক উত্তর দেবে",
    en: "AI-powered chatbot that provides instant answers to your legal questions",
  },
  "hero.locationBased": { bn: "লোকেশন ভিত্তিক", en: "Location Based" },
  "hero.locationBasedDesc": {
    bn: "আপনার এলাকার সেরা অ্যাডভোকেটদের খুঁজে পান মাত্র কয়েক ক্লিকে",
    en: "Find the best advocates in your area in just a few clicks",
  },
  "hero.service247": { bn: "২৪/৭ সেবা", en: "24/7 Service" },
  "hero.service247Desc": {
    bn: "দিন-রাত যেকোনো সময় আইনি সহায়তা পান, কোনো বিরতি নেই",
    en: "Get legal assistance anytime day or night, non-stop",
  },
  "hero.safeSecure": { bn: "নিরাপদ ও গোপনীয়", en: "Safe & Confidential" },
  "hero.safeSecureDesc": {
    bn: "আপনার সব তথ্য সম্পূর্ণ নিরাপদ এবং গোপনীয় রাখা হয়",
    en: "All your information is completely safe and confidential",
  },

  // Advocate Suggestion
  "advocates.title": { bn: "অ্যাডভোকেট সাজেশন", en: "Advocate Suggestions" },
  "advocates.description": {
    bn: "আপনার এলাকার সেরা এবং অভিজ্ঞ আইনজীবীদের খুঁজে নিন। বিশেষজ্ঞতা অনুযায়ী সঠিক পরামর্শ পান।",
    en: "Find the best and experienced lawyers in your area. Get the right advice according to expertise.",
  },
  "advocates.experiencedAdvocate": {
    bn: "অভিজ্ঞ অ্যাডভোকেট",
    en: "Experienced Advocate",
  },
  "advocates.years15": { bn: "১৫+ বছরের অভিজ্ঞতা", en: "15+ years experience" },
  "advocates.professionalService": {
    bn: "পেশাদার সেবা",
    en: "Professional Service",
  },
  "advocates.allLegalSolutions": {
    bn: "সব ধরনের আইনি সমস্যার সমাধান",
    en: "Solutions for all types of legal problems",
  },
  "advocates.selectLocation": {
    bn: "অথবা ম্যানুয়ালি এলাকা নির্বাচন করুন:",
    en: "Or manually select your area:",
  },
  "advocates.rating": { bn: "রেটিং", en: "Rating" },
  "advocates.available": { bn: "উপলব্ধ", en: "Available" },
  "advocates.experience": { bn: "অভিজ্ঞতা", en: "Experience" },
  "advocates.caseSolved": { bn: "মামলা সমাধান", en: "Cases Solved" },
  "advocates.call": { bn: "কল করুন", en: "Call" },
  "advocates.chat": { bn: "চ্যাট", en: "Chat" },
  "advocates.notFound": {
    bn: "আপনার মতো কোনো অ্যাডভোকেট খুঁজে পাচ্ছেন না?",
    en: "Can't find an advocate like yours?",
  },
  "advocates.contactUs": {
    bn: "আমাদের সাথে যোগাযোগ করুন এবং আপনার নির্দিষ্ট প্রয়োজন অনুযায়ী সেরা আইনজীবী খুঁজে নিন",
    en: "Contact us and find the best lawyer according to your specific needs",
  },
  "advocates.specialHelp": {
    bn: "বিশেষ সহায়তার জন্য যোগাযোগ করুন",
    en: "Contact for Special Assistance",
  },

  // Locations
  "location.dhaka": { bn: "ঢাকা", en: "Dhaka" },
  "location.chittagong": { bn: "চট্টগ্রাম", en: "Chittagong" },
  "location.sylhet": { bn: "সিলেট", en: "Sylhet" },
  "location.rajshahi": { bn: "রাজশাহী", en: "Rajshahi" },
  "location.khulna": { bn: "খুলনা", en: "Khulna" },
  "location.barishal": { bn: "বরিশাল", en: "Barishal" },

  // Specializations
  "spec.criminal": { bn: "ফৌজদারি আইন", en: "Criminal Law" },
  "spec.family": { bn: "পারিবারিক আইন", en: "Family Law" },
  "spec.business": { bn: "ব্যবসায়িক আইন", en: "Business Law" },
  "spec.property": { bn: "সম্পত্তি আইন", en: "Property Law" },

  // Guidelines Section
  "guidelines.title": {
    bn: "আইনি গাইডলাইন ও পরামর্শ",
    en: "Legal Guidelines & Advice",
  },
  "guidelines.description": {
    bn: "বাংলাদেশের আইন সম্পর্কে প্রয়োজনীয় তথ্য এবং গাইডলাইন। আপনার অধিকার জানুন এবং সঠিক পদক্ষেপ নিন।",
    en: "Essential information and guidelines about Bangladesh law. Know your rights and take the right steps.",
  },
  "guidelines.learnLaw": {
    bn: "আইনি জ্ঞান অর্জন করুন",
    en: "Gain Legal Knowledge",
  },
  "guidelines.readGuidelines": {
    bn: "বিশেষজ্ঞদের তৈরি গাইডলাইন পড়ুন",
    en: "Read guidelines created by experts",
  },
  "guidelines.topics": { bn: "বিষয়সমূহ", en: "Topics" },
  "guidelines.familyLaw": { bn: "পারিবারিক আইন", en: "Family Law" },
  "guidelines.propertyLaw": { bn: "সম্পত্তি আইন", en: "Property Law" },
  "guidelines.businessLaw": { bn: "ব্যবসায়িক আইন", en: "Business Law" },
  "guidelines.criminalLaw": { bn: "ফৌজদারি আইন", en: "Criminal Law" },
  "guidelines.readMore": { bn: "আরও পড়ুন", en: "Read More" },
  "guidelines.specialArticle": { bn: "বিশেষ আর্টিকেল", en: "Special Article" },
  "guidelines.learnRights": {
    bn: "আপনার আইনি অধিকার সম্পর্কে জানুন",
    en: "Learn about your legal rights",
  },
  "guidelines.readFullArticle": {
    bn: "সম্পূর্ণ আর্টিকেল পড়ুন",
    en: "Read Full Article",
  },
  "guidelines.minutes": { bn: "মিনিট", en: "minutes" },

  // Articles
  "article.divorce": {
    bn: "বিবাহবিচ্ছেদের নিয়ম ও প্রক্রিয়া",
    en: "Divorce Rules and Process",
  },
  "article.divorceSummary": {
    bn: "বাংলাদেশে বিবাহবিচ্ছেদের আইনি প্রক্রিয়া, প্রয়োজনীয় কাগজপত্র এবং খরচ সম্পর্কে বিস্তারিত তথ্য।",
    en: "Detailed information about the legal process, required documents, and costs of divorce in Bangladesh.",
  },
  "article.custody": {
    bn: "সন্তানের অভিভাবকত্ব ও ভরণপোষণ",
    en: "Child Custody and Maintenance",
  },
  "article.custodySummary": {
    bn: "বিবাহবিচ্ছেদের পর সন্তানের অভিভাবকত্ব নির্ধারণ এবং ভরণপোষণের আইন সম্পর্কে জানুন।",
    en: "Learn about determining child custody and maintenance laws after divorce.",
  },
  "article.domesticViolence": {
    bn: "পারিবারিক সহিংসতা প্রতিরোধ",
    en: "Domestic Violence Prevention",
  },
  "article.domesticViolenceSummary": {
    bn: "পারিবারিক সহিংসতার বিরুদ্ধে আইনি ব্যবস্থা গ্রহণের পদ্ধতি এবং সুরক্ষা।",
    en: "Methods of taking legal action against domestic violence and protection.",
  },
  "article.landPurchase": {
    bn: "জমি ক্রয়-বিক্রয়ের নিয়মাবলী",
    en: "Land Purchase and Sale Rules",
  },
  "article.landPurchaseSummary": {
    bn: "জমি কেনাবেচার সময় কী কী বিষয় খেয়াল রাখবেন এবং প্রয়োজনীয় কাগজপত্র।",
    en: "What to look out for when buying and selling land and required documents.",
  },
  "article.inheritance": {
    bn: "উত্তরাধিকার সূত্রে সম্পত্তি বণ্টন",
    en: "Property Distribution by Inheritance",
  },
  "article.inheritanceSummary": {
    bn: "ইসলামী আইন ও বাংলাদেশী আইন অনুযায়ী সম্পত্তি বণ্টনের নিয়ম।",
    en: "Property distribution rules according to Islamic and Bangladeshi law.",
  },
  "article.rentDispute": {
    bn: "ভাড়া সংক্রান্ত বিরোধ নিষ্পত্তি",
    en: "Rent Dispute Resolution",
  },
  "article.rentDisputeSummary": {
    bn: "বাড়িভাড়া ও দোকানভাড়া সংক্রান্ত সমস্যার আইনি সমাধান।",
    en: "Legal solutions for house and shop rent problems.",
  },
  "article.companyReg": {
    bn: "কোম্পানি নিবন্ধন প্রক্রিয়া",
    en: "Company Registration Process",
  },
  "article.companyRegSummary": {
    bn: "বাংলাদেশে নতুন কোম্পানি গঠনের জন্য প্রয়োজনীয় পদক্ষেপ এবং খরচ।",
    en: "Steps and costs required to form a new company in Bangladesh.",
  },
  "article.businessContract": {
    bn: "ব্যবসায়িক চুক্তি ও আইন",
    en: "Business Contracts and Law",
  },
  "article.businessContractSummary": {
    bn: "ব্যবসায়িক চুক্তিপত্র তৈরি এবং আইনি সুরক্ষার উপায়।",
    en: "Creating business contracts and ways of legal protection.",
  },
  "article.laborRights": {
    bn: "শ্রমিক অধিকার ও নিয়োগ আইন",
    en: "Labor Rights and Employment Law",
  },
  "article.laborRightsSummary": {
    bn: "কর্মী নিয়োগ, বেতন ও অন্যান্য সুবিধা সংক্রান্ত আইনি নির্দেশনা।",
    en: "Legal guidelines for employee recruitment, salaries and other benefits.",
  },
  "article.cyberCrime": {
    bn: "সাইবার ক্রাইম থেকে সুরক্ষা",
    en: "Protection from Cyber Crime",
  },
  "article.cyberCrimeSummary": {
    bn: "অনলাইন প্রতারণা, হ্যাকিং এবং সাইবার বুলিং এর বিরুদ্ধে আইনি ব্যবস্থা।",
    en: "Legal measures against online fraud, hacking and cyber bullying.",
  },
  "article.fileCase": {
    bn: "মামলা দায়ের করার প্রক্রিয়া",
    en: "Case Filing Process",
  },
  "article.fileCaseSummary": {
    bn: "থানায় মামলা দায়ের থেকে কোর্টে হাজিরা পর্যন্ত সম্পূর্ণ প্রক্রিয়া।",
    en: "Complete process from filing a case at the police station to appearing in court.",
  },
  "article.bail": { bn: "জামিন ও আইনি সহায়তা", en: "Bail and Legal Aid" },
  "article.bailSummary": {
    bn: "জামিনের আবেদন প্রক্রিয়া এবং আইনি সহায়তা পাওয়ার উপায়।",
    en: "Bail application process and ways to get legal aid.",
  },
  "article.fundamentalRights": {
    bn: '"বাংলাদেশে নাগরিকদের মৌলিক অধিকার ও কর্তব্য"',
    en: '"Fundamental Rights and Duties of Citizens in Bangladesh"',
  },
  "article.fundamentalRightsSummary": {
    bn: "সংবিধানে বর্ণিত নাগরিকদের মৌলিক অধিকারসমূহ এবং সেগুলো লঙ্ঘিত হলে কী করণীয় সে সম্পর্কে বিস্তারিত আলোচনা।",
    en: "Detailed discussion on citizens' fundamental rights as described in the constitution and what to do if they are violated.",
  },

  // Footer
  "footer.emergencyLine": {
    bn: "জরুরি সহায়তা লাইন",
    en: "Emergency Help Line",
  },
  "footer.available24": { bn: "২৪ ঘন্টা উপলব্ধ", en: "Available 24 hours" },
  "footer.nationalEmergency": {
    bn: "জাতীয় জরুরি সেবা",
    en: "National Emergency Service",
  },
  "footer.nationalEmergencyNumber": { bn: "৯৯৯", en: "999" },
  "footer.womenChildren": {
    bn: "মহিলা ও শিশু নির্যাতন",
    en: "Women & Child Abuse",
  },
  "footer.womenChildrenNumber": {
    bn: "১০৯",
    en: "109",
  },
  "footer.ourHotline": { bn: "আমাদের হটলাইন", en: "Our Hotline" },
  "footer.ourHotlineNumber": { bn: "০১৮৪৪-৪৪৪৪৪৪", en: "01844-444444" },
  "footer.description": {
    bn: "বাংলাদেশের প্রথম ডিজিটাল আইনি সহায়তা প্ল্যাটফর্ম। আমরা সাধারণ মানুষের পাশে আছি আইনি বিপদের সময়।",
    en: "Bangladesh's first digital legal assistance platform. We stand with common people in times of legal trouble.",
  },
  "footer.quickLinks": { bn: "দ্রুত লিংক", en: "Quick Links" },
  "footer.findAdvocate": { bn: "অ্যাডভোকেট খুঁজুন", en: "Find Advocate" },
  "footer.legalGuidelines": { bn: "আইনি গাইডলাইন", en: "Legal Guidelines" },
  "footer.faq": { bn: "সচরাচর প্রশ্ন", en: "FAQ" },
  "footer.privacyPolicy": { bn: "গোপনীয়তা নীতি", en: "Privacy Policy" },
  "footer.termsOfUse": { bn: "ব্যবহারের শর্তাবলী", en: "Terms of Use" },
  "footer.ourServices": { bn: "আমাদের সেবা", en: "Our Services" },
  "footer.aiChatbot": {
    bn: "AI চ্যাটবট পরামর্শ",
    en: "AI Chatbot Consultation",
  },
  "footer.advocateConsultation": {
    bn: "অ্যাডভোকেট কনসালটেশন",
    en: "Advocate Consultation",
  },
  "footer.legalDocuments": {
    bn: "আইনি ডকুমেন্ট তৈরি",
    en: "Legal Document Creation",
  },
  "footer.caseTracking": {
    bn: "কোর্ট কেস ট্র্যাকিং",
    en: "Court Case Tracking",
  },
  "footer.emergencyHelp": {
    bn: "জরুরি আইনি সহায়তা",
    en: "Emergency Legal Aid",
  },
  "footer.legalEducation": {
    bn: "আইনি শিক্ষা ও প্রশিক্ষণ",
    en: "Legal Education & Training",
  },
  "footer.contactUs": { bn: "যোগাযোগ", en: "Contact Us" },
  "footer.dhakaOffice": {
    bn: "ঢাকা অফিস: ধানমন্ডি, ঢাকা-১২০৫",
    en: "Dhaka Office: Dhanmondi, Dhaka-1205",
  },
  "footer.chittagongOffice": {
    bn: "চট্টগ্রাম অফিস: নাসিরাবাদ, চট্টগ্রাম",
    en: "Chittagong Office: Nasirabad, Chittagong",
  },
  "footer.serviceHours": { bn: "সেবার সময়:", en: "Service Hours:" },
  "footer.emergencyService": {
    bn: "২৪/৭ (জরুরি সেবা)",
    en: "24/7 (Emergency Service)",
  },
  "footer.regularService": {
    bn: "সকাল ৯টা - রাত ৯টা (সাধারণ সেবা)",
    en: "9 AM - 9 PM (Regular Service)",
  },
  "footer.copyright": {
    bn: "© ২০২৫ আইনি সহায়ক। সর্বস্বত্ব সংরক্ষিত। | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত",
    en: "© 2025 Legal Assistant. All rights reserved. | Approved by the Government of Bangladesh",
  },
  "footer.madeIn": { bn: "🇧🇩 বাংলাদেশে তৈরি", en: "🇧🇩 Made in Bangladesh" },
  "footer.safeTrusted": { bn: "নিরাপদ ও বিশ্বস্ত", en: "Safe & Trusted" },

  // Chatbot
  "chatbot.title": { bn: "আইনি সহায়ক বট", en: "Legal Assistant Bot" },
  "chatbot.status": {
    bn: "অনলাইন এবং সহায়তা করতে প্রস্তুত",
    en: "Online and ready to help",
  },
  "chatbot.greeting": {
    bn: "নমস্কার! আমি আপনার আইনি সহায়ক। আপনার কী সমস্যা? আমি সাহায্য করতে পারি। আপনি টেক্সট, ছবি, ভিডিও বা অডিও পাঠাতে পারেন।",
    en: "Hello! I am your legal assistant. What is your problem? I can help. You can send text, images, videos or audio.",
  },
  "chatbot.quickResponses": { bn: "দ্রুত উত্তর:", en: "Quick Responses:" },
  "chatbot.familyDispute": { bn: "পারিবারিক বিরোধ", en: "Family Dispute" },
  "chatbot.propertyIssue": { bn: "সম্পত্তি বিষয়ক", en: "Property Issue" },
  "chatbot.jobRelated": { bn: "চাকরি সংক্রান্ত", en: "Job Related" },
  "chatbot.businessProblem": {
    bn: "ব্যবসায়িক সমস্যা",
    en: "Business Problem",
  },
  "chatbot.criminalCase": { bn: "ফৌজদারি মামলা", en: "Criminal Case" },
  "chatbot.cyberCrime": { bn: "সাইবার ক্রাইম", en: "Cyber Crime" },
  "chatbot.needAdvocate": { bn: "অ্যাডভোকেট প্রয়োজন", en: "Need Advocate" },
  "chatbot.emergencyHelp": { bn: "জরুরি সহায়তা", en: "Emergency Help" },
  "chatbot.sendFiles": { bn: "ফাইল পাঠান:", en: "Send Files:" },
  "chatbot.placeholder": {
    bn: "আপনার প্রশ্ন লিখুন...",
    en: "Type your question...",
  },
  "chatbot.advocateSuggestion": {
    bn: "অ্যাডভোকেট সাজেশন দেখুন",
    en: "View Advocate Suggestions",
  },
  "chatbot.typing": { bn: "টাইপ করছি...", en: "Typing..." },

  // Language
  "language.switch": { bn: "English", en: "বাংলা" },
  "language.label": { bn: "EN", en: "বাং" },

  // Emergency Numbers
  "emergency.999": { bn: "৯৯৯", en: "999" },

  // Location Detector
  "location.title": {
    bn: "আপনার লোকেশন নির্ধারণ করুন",
    en: "Detect Your Location",
  },
  "location.description": {
    bn: "আপনার এলাকার সেরা অ্যাডভোকেটদের খুঁজে পেতে লোকেশন শেয়ার করুন",
    en: "Share your location to find the best advocates in your area",
  },
  "location.yourLocation": { bn: "আপনার লোকেশন:", en: "Your Location:" },
  "location.browserNotSupported": {
    bn: "আপনার ব্রাউজার লোকেশন সাপোর্ট করে না",
    en: "Your browser does not support location",
  },
  "location.errorDetecting": {
    bn: "লোকেশন নির্ধারণে সমস্যা হয়েছে",
    en: "Problem detecting location",
  },
  "location.cannotAccess": {
    bn: "লোকেশন অ্যাক্সেস করতে পারছি না",
    en: "Cannot access location",
  },
  "location.permissionDenied": {
    bn: "লোকেশন অনুমতি দেওয়া হয়নি",
    en: "Location permission denied",
  },
  "location.unavailable": {
    bn: "লোকেশন তথ্য পাওয়া যাচ্ছে না",
    en: "Location information unavailable",
  },
  "location.timeout": {
    bn: "লোকেশন খোঁজার সময় শেষ",
    en: "Location search timed out",
  },
  "location.searching": {
    bn: "লোকেশন খোঁজা হচ্ছে...",
    en: "Searching for location...",
  },
  "location.getMyLocation": { bn: "আমার লোকেশন নিন", en: "Get My Location" },
  "location.privacyNote": {
    bn: "আপনার লোকেশন তথ্য সম্পূর্ণ নিরাপদ এবং গোপনীয় রাখা হবে",
    en: "Your location information will be kept completely safe and confidential",
  },

  // Education Page
  "education.title": {
    bn: "আইনি শিক্ষা কেন্দ্র",
    en: "Legal Education Center",
  },
  "education.heroDescription": {
    bn: "বিনামূল্যে আইনি শিক্ষা নিন। বিশেষজ্ঞদের তৈরি ভিডিও টিউটোরিয়াল দেখুন এবং আইনি জ্ঞান বৃদ্ধি করুন। AI চ্যাটবট আপনাকে সঠিক ভিডিও খুঁজে দিতে সাহায্য করবে।",
    en: "Get free legal education. Watch video tutorials created by experts and increase your legal knowledge. AI chatbot will help you find the right videos.",
  },
  "education.aiVideoSuggestion": {
    bn: "🤖 AI ভিডিও সাজেশন নিন",
    en: "🤖 Get AI Video Suggestions",
  },
  "education.seeAllVideos": {
    bn: "📚 সব ভিডিও দেখুন",
    en: "📚 See All Videos",
  },
  "education.aiChatbotTitle": {
    bn: "AI ভিডিও সাজেশন চ্যাটবট",
    en: "AI Video Suggestion Chatbot",
  },
  "education.aiChatbotDescription": {
    bn: "আপনার প্রয়োজন অনুযায়ী সঠিক আইনি শিক্ষামূলক ভিডিও খুঁজে পেতে আমাদের AI চ্যাটবটের সাহায্য নিন। শুধু আপনার প্রশ্ন বা বিষয় লিখুন, চ্যাটবট আপনাকে উপযুক্ত ভিডিও সাজেস্ট করবে।",
    en: "Get help from our AI chatbot to find the right legal educational videos according to your needs. Just type your question or topic, the chatbot will suggest appropriate videos.",
  },
  "education.smartVideoSearch": {
    bn: "স্মার্ট ভিডিও সার্চ",
    en: "Smart Video Search",
  },
  "education.topicSuggestion": {
    bn: "বিষয়ভিত্তিক সাজেশন",
    en: "Topic-based Suggestions",
  },
  "education.instantHelp": { bn: "তাৎক্ষণিক সহায়তা", en: "Instant Help" },
  "education.startChatbot": { bn: "চ্যাটবট শুরু করুন", en: "Start Chatbot" },
  "education.videoCollection": {
    bn: "ভিডিও টিউটোরিয়াল সংগ্রহ",
    en: "Video Tutorial Collection",
  },
  "education.videoCollectionDesc": {
    bn: "বিশেষজ্ঞ আইনজীবী এবং শিক্ষকদের তৈরি উচ্চমানের আইনি শিক্ষামূলক ভিডিও",
    en: "High-quality legal educational videos created by expert lawyers and teachers",
  },
  "education.searchVideos": { bn: "ভিডিও খুঁজুন...", en: "Search videos..." },
  "education.noVideosFound": {
    bn: "কোনো ভিডিও পাওয়া যায়নি",
    en: "No videos found",
  },
  "education.noVideosFoundDesc": {
    bn: "আপনার সার্চ টার্ম বা ক্যাটেগরি পরিবর্তন করে আবার চেষ্টা করুন",
    en: "Try again by changing your search term or category",
  },
  "education.getAiHelp": {
    bn: "AI চ্যাটবটের সাহায্য নিন",
    en: "Get AI Chatbot Help",
  },
  "education.wantToKnowMore": {
    bn: "আরও জানতে চান?",
    en: "Want to know more?",
  },
  "education.ctaDescription": {
    bn: "আমাদের AI চ্যাটবট আপনাকে সঠিক ভিডিও খুঁজে দিতে এবং আইনি প্রশ্নের উত্তর দিতে সাহায্য করবে",
    en: "Our AI chatbot will help you find the right videos and answer your legal questions",
  },
  "education.findAdvocate": { bn: "অ্যাডভোকেট খুঁজুন", en: "Find Advocate" },
  "education.instructor": { bn: "শিক্ষক:", en: "Instructor:" },

  // Video Categories
  "category.all": { bn: "সব", en: "All" },
  "category.constitutional": { bn: "সাংবিধানিক আইন", en: "Constitutional Law" },
  "category.family": { bn: "পারিবারিক আইন", en: "Family Law" },
  "category.property": { bn: "সম্পত্তি আইন", en: "Property Law" },
  "category.criminal": { bn: "ফৌজদারি আইন", en: "Criminal Law" },
  "category.business": { bn: "ব্যবসায়িক আইন", en: "Business Law" },
  "category.cyber": { bn: "সাইবার আইন", en: "Cyber Law" },

  // Video Levels
  "level.beginner": { bn: "শুরুর দিকে", en: "Beginner" },
  "level.intermediate": { bn: "মধ্যম", en: "Intermediate" },
  "level.advanced": { bn: "উন্নত", en: "Advanced" },

  // Video Titles & Descriptions
  "video1.title": {
    bn: "বাংলাদেশের সংবিধান - মৌলিক অধিকার",
    en: "Bangladesh Constitution - Fundamental Rights",
  },
  "video1.description": {
    bn: "বাংলাদেশের সংবিধানে বর্ণিত নাগরিকদের মৌলিক অধিকার সম্পর্কে বিস্তারিত আলোচনা",
    en: "Detailed discussion about the fundamental rights of citizens described in the Constitution of Bangladesh",
  },
  "video2.title": {
    bn: "পারিবারিক আইন - বিবাহ ও বিবাহবিচ্ছেদ",
    en: "Family Law - Marriage and Divorce",
  },
  "video2.description": {
    bn: "ইসলামী পারিবারিক আইন অনুযায়ী বিবাহ এবং বিবাহবিচ্ছেদের নিয়মকানুন",
    en: "Marriage and divorce rules according to Islamic family law",
  },
  "video3.title": {
    bn: "সম্পত্তি আইন - জমি ক্রয়-বিক্রয়ের নিয়ম",
    en: "Property Law - Land Purchase Rules",
  },
  "video3.description": {
    bn: "জমি কেনাবেচার সময় কী কী বিষয় খেয়াল রাখতে হবে এবং প্রয়োজনীয় কাগজপত্র",
    en: "Things to keep in mind when buying and selling land and required documents",
  },
  "video4.title": {
    bn: "ফৌজদারি আইন - মামলা দায়ের প্রক্রিয়া",
    en: "Criminal Law - Case Filing Process",
  },
  "video4.description": {
    bn: "থানায় মামলা দায়ের থেকে শুরু করে কোর্টে হাজিরা পর্যন্ত সম্পূর্ণ প্রক্রিয়া",
    en: "Complete process from filing a case at the police station to appearing in court",
  },
  "video5.title": {
    bn: "ব্যবসায়িক আইন - কোম্পানি নিবন্ধন",
    en: "Business Law - Company Registration",
  },
  "video5.description": {
    bn: "বাংলাদেশে নতুন কোম্পানি গঠনের জন্য প্রয়োজনীয় পদক্ষেপ এবং আইনি প্রক্রিয়া",
    en: "Steps and legal process required to form a new company in Bangladesh",
  },
  "video6.title": {
    bn: "সাইবার আইন - অনলাইন নিরাপত্তা",
    en: "Cyber Law - Online Security",
  },
  "video6.description": {
    bn: "সাইবার ক্রাইম থেকে নিজেকে রক্ষা করার উপায় এবং আইনি প্রতিকার",
    en: "Ways to protect yourself from cybercrime and legal remedies",
  },

  // Instructor Names
  "instructor.ahmed": { bn: "ড. আহমেদ করিম", en: "Dr. Ahmed Karim" },
  "instructor.fatema": {
    bn: "ব্যারিস্টার ফাতেমা খাতুন",
    en: "Barrister Fatema Khatun",
  },
  "instructor.rahim": {
    bn: "অ্যাডভোকেট রহিম উদ্দিন",
    en: "Advocate Rahim Uddin",
  },
  "instructor.nasir": {
    bn: "ব্যারিস্টার নাসির হোসেন",
    en: "Barrister Nasir Hossain",
  },
  "instructor.salma": { bn: "ড. সালমা আক্তার", en: "Dr. Salma Akter" },
  "instructor.tania": {
    bn: "অ্যাডভোকেট তানিয়া রহমান",
    en: "Advocate Tania Rahman",
  },

  // Video Stats (formatted numbers)
  "views.25432": { bn: "২৫,৪৩২", en: "25,432" },
  "views.18765": { bn: "১৮,৭৬৫", en: "18,765" },
  "views.32109": { bn: "৩২,১০৯", en: "32,109" },
  "views.14893": { bn: "১৪,৮৯৩", en: "14,893" },
  "views.11234": { bn: "১১,২৩৪", en: "11,234" },
  "views.9876": { bn: "৯,৮৭৬", en: "9,876" },
  "likes.1234": { bn: "১,২৩৪", en: "1,234" },
  "likes.987": { bn: "৯৮৭", en: "987" },
  "likes.1567": { bn: "১,৫৬৭", en: "1,567" },
  "likes.789": { bn: "৭৮৯", en: "789" },
  "likes.654": { bn: "৬৫৪", en: "654" },
  "likes.543": { bn: "৫৪৩", en: "543" },
  "duration.1530": { bn: "১৫:৩০", en: "15:30" },
  "duration.2215": { bn: "২২:১৫", en: "22:15" },
  "duration.1845": { bn: "১৮:৪৫", en: "18:45" },
  "duration.2820": { bn: "২৮:২০", en: "28:20" },
  "duration.2510": { bn: "২৫:১০", en: "25:10" },
  "duration.2035": { bn: "২০:৩৫", en: "20:35" },

  // Somjhota (Mediation) Page
  "somjhota.title": {
    bn: "দ্বিপাক্ষিক আইনি সমাধান",
    en: "Bilateral Legal Solution",
  },
  "somjhota.subtitle": {
    bn: "আলোচনা ও সমঝোতার মাধ্যমে মামলা নিষ্পত্তি",
    en: "Case Settlement Through Discussion & Mediation",
  },
  "somjhota.heroDescription": {
    bn: "আইনি জটিলতায় জড়িয়েছেন? মামলার ঝামেলা ও দীর্ঘ প্রক্রিয়া এড়াতে চান? আমাদের এই বিশেষ সেবার মাধ্যমে দুই পক্ষ—যারা আইনি বিরোধে জড়িয়েছেন—একটি নিরপেক্ষ ও নিরাপদ অনলাইন প্ল্যাটফর্মে সরাসরি কথা বলতে পারবেন।",
    en: "Caught in legal complications? Want to avoid case hassles and lengthy processes? Through this special service, both parties involved in legal disputes can talk directly on a neutral and secure online platform.",
  },
  "somjhota.peacefulSolution": {
    bn: "শান্তিপূর্ণ সমাধান",
    en: "Peaceful Solution",
  },
  "somjhota.withExpertMediation": {
    bn: "অভিজ্ঞ আইনজীবীর মধ্যস্থতায়",
    en: "With Expert Lawyer Mediation",
  },
  "somjhota.featuresTitle": {
    bn: "আমাদের সেবার বৈশিষ্ট্য",
    en: "Our Service Features",
  },
  "somjhota.featuresDescription": {
    bn: "এই সেবাটি মূলত তাদের জন্য, যারা চায় আইনি পথ মেনেই ঝামেলাবিহীন সমাধান।",
    en: "This service is primarily for those who want a hassle-free solution following legal procedures.",
  },
  "somjhota.feature1Title": {
    bn: "নিরাপদ কলের মাধ্যমে সরাসরি আলোচনা",
    en: "Direct Discussion Through Secure Call",
  },
  "somjhota.feature1Desc": {
    bn: "আমাদের নিরাপদ প্ল্যাটফর্মে উভয় পক্ষ সরাসরি কথা বলতে পারবেন এবং তাদের বক্তব্য তুলে ধরতে পারবেন।",
    en: "Both parties can talk directly on our secure platform and present their views.",
  },
  "somjhota.feature2Title": {
    bn: "অভিজ্ঞ আইনজীবীর পরামর্শ ও মধ্যস্থতা",
    en: "Expert Lawyer Advice & Mediation",
  },
  "somjhota.feature2Desc": {
    bn: "আমাদের অভিজ্ঞ আইনজীবীরা নিরপেক্ষভাবে মধ্যস্থতা করবেন এবং আইনি পরামর্শ প্রদান করবেন।",
    en: "Our experienced lawyers will mediate impartially and provide legal advice.",
  },
  "somjhota.feature3Title": {
    bn: "স্বেচ্ছায় সমঝোতার সুযোগ",
    en: "Voluntary Settlement Opportunity",
  },
  "somjhota.feature3Desc": {
    bn: "কোনো চাপ ছাড়াই উভয় পক্ষ স্বেচ্ছায় সমঝোতায় পৌঁছানোর সুযোগ পাবেন।",
    en: "Both parties will have the opportunity to reach a voluntary settlement without any pressure.",
  },
  "somjhota.feature4Title": {
    bn: "সময় ও অর্থ সাশ্রয়",
    en: "Time & Money Savings",
  },
  "somjhota.feature4Desc": {
    bn: "দীর্ঘ আদালতি প্রক্রিয়া এড়িয়ে কম সময়ে এবং কম খরচে সমাধান পান।",
    en: "Get solutions in less time and at lower cost by avoiding lengthy court processes.",
  },
  "somjhota.feature5Title": {
    bn: "মামলা নিষ্পত্তির সহজ ও কার্যকর উপায়",
    en: "Easy & Effective Way to Settle Cases",
  },
  "somjhota.feature5Desc": {
    bn: "জটিল আইনি প্রক্রিয়া ছাড়াই সহজ এবং কার্যকর উপায়ে বিরোধ নিষ্পত্তি করুন।",
    en: "Settle disputes easily and effectively without complex legal processes.",
  },
  "somjhota.feature6Title": {
    bn: "গোপনীয়তা ও নিরাপত্তা",
    en: "Privacy & Security",
  },
  "somjhota.feature6Desc": {
    bn: "আপনার সব তথ্য এবং আলোচনা সম্পূর্ণ গোপনীয় এবং নিরাপদ রাখা হবে।",
    en: "All your information and discussions will be kept completely confidential and secure.",
  },
  "somjhota.howItWorks": { bn: "কীভাবে কাজ করে?", en: "How Does It Work?" },
  "somjhota.simpleSteps": {
    bn: "সহজ ৪টি ধাপে সমঝোতার প্রক্রিয়া",
    en: "Mediation Process in 4 Simple Steps",
  },
  "somjhota.step1Title": { bn: "আবেদন জমা দিন", en: "Submit Application" },
  "somjhota.step1Desc": {
    bn: "নিচের ফর্মে উভয় পক্ষের তথ্য এবং বিরোধের বিবরণ দিন",
    en: "Provide both parties' information and dispute details in the form below",
  },
  "somjhota.step2Title": {
    bn: "যোগাযোগ ও সময় নির্ধারণ",
    en: "Contact & Scheduling",
  },
  "somjhota.step2Desc": {
    bn: "আমাদের টিম উভয় পক্ষের সাথে যোগাযোগ করে উপযুক্ত সময় নির্ধারণ করবে",
    en: "Our team will contact both parties and schedule a suitable time",
  },
  "somjhota.step3Title": { bn: "মধ্যস্থতা সেশন", en: "Mediation Session" },
  "somjhota.step3Desc": {
    bn: "অভিজ্ঞ আইনজীবীর উপস্থিতিতে নিরাপদ কলে আলোচনা",
    en: "Discussion on secure call in the presence of an experienced lawyer",
  },
  "somjhota.step4Title": { bn: "সমঝোতা ও সমাধান", en: "Settlement & Solution" },
  "somjhota.step4Desc": {
    bn: "উভয় পক্ষের সম্মতিতে চূড়ান্ত সমাধান এবং চুক্তি",
    en: "Final solution and agreement with consent of both parties",
  },
  "somjhota.applyTitle": {
    bn: "সমঝোতার জন্য আবেদন করুন",
    en: "Apply for Mediation",
  },
  "somjhota.applyDescription": {
    bn: "নিচের ফর্মটি পূরণ করুন এবং আমাদের বিশেষজ্ঞ টিমের সাহায্য নিন",
    en: "Fill out the form below and get help from our expert team",
  },
  "somjhota.party1Info": {
    bn: "প্রথম পক্ষের তথ্য",
    en: "First Party Information",
  },
  "somjhota.party2Info": {
    bn: "দ্বিতীয় পক্ষের তথ্য",
    en: "Second Party Information",
  },
  "somjhota.disputeInfo": { bn: "বিরোধের তথ্য", en: "Dispute Information" },
  "somjhota.name": { bn: "নাম", en: "Name" },
  "somjhota.email": { bn: "ইমেইল", en: "Email" },
  "somjhota.phone": { bn: "ফোন", en: "Phone" },
  "somjhota.party1NamePlaceholder": {
    bn: "প্রথম পক্ষের নাম",
    en: "First party's name",
  },
  "somjhota.party2NamePlaceholder": {
    bn: "দ্বিতীয় পক্ষের নাম",
    en: "Second party's name",
  },
  "somjhota.phonePlaceholder": { bn: "০১৭১১-১২৩৪৫৬", en: "01711-123456" },
  "somjhota.disputeType": { bn: "বিরোধের ধরন", en: "Dispute Type" },
  "somjhota.preferredTime": { bn: "পছন্দের সময়", en: "Preferred Time" },
  "somjhota.preferredTimePlaceholder": {
    bn: "যেমন: সকাল ১০টা - দুপুর ২টা",
    en: "e.g., 10 AM - 2 PM",
  },
  "somjhota.disputeDescription": {
    bn: "বিরোধের বিস্তারিত বিবরণ",
    en: "Detailed Dispute Description",
  },
  "somjhota.disputeDescPlaceholder": {
    bn: "বিরোধের কারণ, বর্তমান অবস্থা এবং আপনার প্রত্যাশিত সমাধান সম্পর্কে বিস্তারিত লিখুন...",
    en: "Write in detail about the cause of the dispute, current situation, and your expected solution...",
  },
  "somjhota.termsAgree": { bn: "আমি", en: "I agree to the" },
  "somjhota.termsConditions": { bn: "শর্তাবলী", en: "Terms & Conditions" },
  "somjhota.and": { bn: "এবং", en: "and" },
  "somjhota.privacyPolicy": { bn: "গোপনীয়তা নীতি", en: "Privacy Policy" },
  "somjhota.agreeText": { bn: "মেনে নিচ্ছি", en: "" },
  "somjhota.submitBtn": {
    bn: "সমঝোতার জন্য আবেদন করুন",
    en: "Apply for Mediation",
  },
  "somjhota.wantToKnowMore": { bn: "আরও জানতে চান?", en: "Want to Know More?" },
  "somjhota.contactDescription": {
    bn: "সমঝোতা সেবা সম্পর্কে বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন",
    en: "Contact us to learn more about mediation services",
  },

  // Dispute Types
  "dispute.family": { bn: "পারিবারিক বিরোধ", en: "Family Dispute" },
  "dispute.property": { bn: "সম্পত্তি বিরোধ", en: "Property Dispute" },
  "dispute.business": { bn: "ব্যবসায়িক বিরোধ", en: "Business Dispute" },
  "dispute.contract": { bn: "চুক্তি সংক্রান্ত বিরোধ", en: "Contract Dispute" },
  "dispute.neighbor": { bn: "প্রতিবেশী বিরোধ", en: "Neighbor Dispute" },
  "dispute.other": { bn: "অন্যান্য", en: "Other" },

  // Success Messages
  "somjhota.successTitle": { bn: "আবেদন সফল!", en: "Application Successful!" },
  "somjhota.successMessage": {
    bn: "আপনার সমঝোতার আবেদন গ্রহণ করা হয়েছে। আমাদের বিশেষজ্ঞ টিম শীঘ্রই উভয় পক্ষের সাথে যোগাযোগ করবে।",
    en: "Your mediation application has been accepted. Our expert team will contact both parties soon.",
  },
  "somjhota.nextSteps": { bn: "পরবর্তী পদক্ষেপ:", en: "Next Steps:" },
  "somjhota.nextStep1": {
    bn: "২৪ ঘন্টার মধ্যে আমাদের কল পাবেন",
    en: "You will receive our call within 24 hours",
  },
  "somjhota.nextStep2": {
    bn: "উভয় পক্ষের সম্মতিতে সময় নির্ধারণ",
    en: "Scheduling with consent of both parties",
  },
  "somjhota.nextStep3": {
    bn: "অভিজ্ঞ আইনজীবীর উপস্থিতিতে আলোচনা",
    en: "Discussion in presence of experienced lawyer",
  },
  "somjhota.backToHome": { bn: "হোমপেজে ফিরে যান", en: "Back to Homepage" },

  // Step Numbers
  "step.1": { bn: "১", en: "1" },
  "step.2": { bn: "২", en: "2" },
  "step.3": { bn: "৩", en: "3" },
  "step.4": { bn: "৪", en: "4" },

  // Contact Page
  "contact.title": { bn: "যোগাযোগ করুন", en: "Contact Us" },
  "contact.description": {
    bn: "আপনার কোনো প্রশ্ন বা সমস্যা থাকলে আমাদের সাথে যোগাযোগ করুন। আমরা ২৪/৭ আপনার সেবায় নিয়োজিত।",
    en: "Contact us if you have any questions or problems. We are at your service 24/7.",
  },
  "contact.info": { bn: "যোগাযোগের তথ্য", en: "Contact Information" },
  "contact.emergency": { bn: "জরুরি যোগাযোগ", en: "Emergency Contact" },
  "contact.999": { bn: "৯৯৯", en: "999" },
  "contact.nationalEmergency": {
    bn: "জাতীয় জরুরি সেবা",
    en: "National Emergency Service",
  },
  "contact.ourHotline": {
    bn: "আমাদের জরুরি হটলাইন",
    en: "Our Emergency Hotline",
  },
  "contact.phone": { bn: "ফোন", en: "Phone" },
  "contact.generalContact": { bn: "সাধারণ যোগাযোগ:", en: "General Contact:" },
  "contact.support": { bn: "সাপোর্ট:", en: "Support:" },
  "contact.email": { bn: "ইমেইল", en: "Email" },
  "contact.general": { bn: "সাধারণ:", en: "General:" },
  "contact.emergencyEmail": { bn: "জরুরি:", en: "Emergency:" },
  "contact.address": { bn: "ঠিকানা", en: "Address" },
  "contact.dhakaOffice": { bn: "ঢাকা অফিস:", en: "Dhaka Office:" },
  "contact.dhakaAddress": {
    bn: "১২৩, ধানমন্ডি রোড নং ২৭\nধানমন্ডি, ঢাকা-১২০৫",
    en: "123, Dhanmondi Road No. 27\nDhanmondi, Dhaka-1205",
  },
  "contact.chittagongOffice": {
    bn: "চট্টগ্রাম অফিস:",
    en: "Chittagong Office:",
  },
  "contact.chittagongAddress": {
    bn: "৪৫৬, নাসিরাবাদ\nচট্টগ্রাম-৪০০০",
    en: "456, Nasirabad\nChittagong-4000",
  },
  "contact.serviceHours": { bn: "সেবার সময়", en: "Service Hours" },
  "contact.emergencyService": {
    bn: "জরুরি সেবা: ২৪/৭",
    en: "Emergency Service: 24/7",
  },
  "contact.generalService": {
    bn: "সাধারণ সেবা: সকাল ৯টা - রাত ৯টা",
    en: "General Service: 9 AM - 9 PM",
  },
  "contact.weeklyHoliday": {
    bn: "সাপ্তাহিক ছুটি: শুক্রবার",
    en: "Weekly Holiday: Friday",
  },
  "contact.writeToUs": { bn: "আমাদের লিখুন", en: "Write to Us" },
  "contact.yourName": { bn: "আপনার নাম", en: "Your Name" },
  "contact.namePlaceholder": { bn: "আপনার পূর্ণ নাম", en: "Your full name" },
  "contact.emailAddress": { bn: "ইমেইল ঠিকানা", en: "Email Address" },
  "contact.mobileNumber": { bn: "মোবাইল নম্বর", en: "Mobile Number" },
  "contact.phonePlaceholder": { bn: "০১৭১১-১২৩৪৫৬", en: "01711-123456" },
  "contact.urgencyLevel": { bn: "জরুরি মাত্রা", en: "Urgency Level" },
  "contact.subject": { bn: "বিষয়", en: "Subject" },
  "contact.subjectPlaceholder": {
    bn: "আপনার সমস্যার বিষয়",
    en: "Subject of your issue",
  },
  "contact.detailedMessage": { bn: "বিস্তারিত বার্তা", en: "Detailed Message" },
  "contact.messagePlaceholder": {
    bn: "আপনার সমস্যার বিস্তারিত বর্ণনা দিন...",
    en: "Describe your problem in detail...",
  },
  "contact.sendMessage": { bn: "বার্তা পাঠান", en: "Send Message" },
  "contact.quickContact": { bn: "দ্রুত যোগাযোগ", en: "Quick Contact" },
  "contact.liveChat": { bn: "লাইভ চ্যাট", en: "Live Chat" },
  "contact.callUs": { bn: "কল করুন", en: "Call Us" },
  "contact.messageSent": { bn: "বার্তা পাঠানো হয়েছে!", en: "Message Sent!" },
  "contact.messageSentDesc": {
    bn: "আপনার বার্তা আমাদের কাছে পৌঁছেছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    en: "Your message has reached us. We will contact you soon.",
  },
  "contact.backToHome": { bn: "হোমপেজে ফিরে যান", en: "Back to Homepage" },

  // Urgency Levels
  "urgency.normal": { bn: "সাধারণ", en: "Normal" },
  "urgency.urgent": { bn: "জরুরি", en: "Urgent" },
  "urgency.veryUrgent": { bn: "অতি জরুরি", en: "Very Urgent" },

  // Phone Numbers
  "phone.general": { bn: "০১৭১১-১২৩৪৫৬", en: "01711-123456" },
  "phone.support": { bn: "০১৮১৫-৭৮৯০১২", en: "01815-789012" },
  "phone.hotline": { bn: "০১৮৪৪-৪৪৪৪৪৪", en: "01844-444444" },

  // Advocate Registration Page
  "advocateReg.title": {
    bn: "অ্যাডভোকেট রেজিস্ট্রেশন",
    en: "Advocate Registration",
  },
  "advocateReg.subtitle": {
    bn: "আপনার তথ্য দিয়ে প্রোফাইল তৈরি করুন এবং ক্লায়েন্টদের সাহায্য করুন",
    en: "Create your profile with your information and help clients",
  },
  "advocateReg.uploadPhoto": {
    bn: "প্রোফাইল ছবি আপলোড করুন",
    en: "Upload profile photo",
  },
  "advocateReg.fullName": { bn: "পূর্ণ নাম", en: "Full Name" },
  "advocateReg.fullNamePlaceholder": {
    bn: "আপনার পূর্ণ নাম লিখুন",
    en: "Enter your full name",
  },
  "advocateReg.emailAddress": { bn: "ইমেইল ঠিকানা", en: "Email Address" },
  "advocateReg.mobileNumber": { bn: "মোবাইল নম্বর", en: "Mobile Number" },
  "advocateReg.phonePlaceholder": { bn: "০১৭১১-১২৩৪৫৬", en: "01711-123456" },
  "advocateReg.workplace": { bn: "কর্মস্থল", en: "Workplace" },
  "advocateReg.specialization": {
    bn: "বিশেষজ্ঞতার ক্ষেত্র",
    en: "Area of Specialization",
  },
  "advocateReg.experienceYears": {
    bn: "অভিজ্ঞতা (বছর)",
    en: "Experience (Years)",
  },
  "advocateReg.barCouncilId": { bn: "বার কাউন্সিল আইডি", en: "Bar Council ID" },
  "advocateReg.aboutYourself": {
    bn: "নিজের সম্পর্কে বিস্তারিত",
    en: "About Yourself",
  },
  "advocateReg.aboutPlaceholder": {
    bn: "আপনার শিক্ষাগত যোগ্যতা, অভিজ্ঞতা এবং বিশেষত্ব সম্পর্কে লিখুন...",
    en: "Write about your educational qualifications, experience and specialties...",
  },
  "advocateReg.termsAgree": { bn: "আমি", en: "I agree to the" },
  "advocateReg.termsConditions": { bn: "শর্তাবলী", en: "Terms & Conditions" },
  "advocateReg.and": { bn: "এবং", en: "and" },
  "advocateReg.privacyPolicy": { bn: "গোপনীয়তা নীতি", en: "Privacy Policy" },
  "advocateReg.agreeText": { bn: "মেনে নিচ্ছি", en: "" },
  "advocateReg.submitBtn": {
    bn: "রেজিস্ট্রেশন সম্পন্ন করুন",
    en: "Complete Registration",
  },
  "advocateReg.needHelp": { bn: "সাহায্য প্রয়োজন?", en: "Need Help?" },
  "advocateReg.helpDesc": {
    bn: "রেজিস্ট্রেশনে কোনো সমস্যা হলে আমাদের সাথে যোগাযোগ করুন:",
    en: "Contact us if you have any problems with registration:",
  },
  "advocateReg.successTitle": {
    bn: "রেজিস্ট্রেশন সফল!",
    en: "Registration Successful!",
  },
  "advocateReg.successMessage": {
    bn: "আপনার প্রোফাইল সফলভাবে তৈরি হয়েছে। আপনার তথ্য যাচাই করার পর ওয়েবসাইটে প্রকাশ করা হবে।",
    en: "Your profile has been created successfully. Your information will be published on the website after verification.",
  },
  "advocateReg.backToHome": { bn: "হোমপেজে ফিরে যান", en: "Back to Homepage" },
  "advocateReg.chatWithBot": {
    bn: "চ্যাটবটের সাথে কথা বলুন",
    en: "Chat with Bot",
  },

  // Locations for Registration
  "regLocation.dhaka": { bn: "ঢাকা", en: "Dhaka" },
  "regLocation.chittagong": { bn: "চট্টগ্রাম", en: "Chittagong" },
  "regLocation.sylhet": { bn: "সিলেট", en: "Sylhet" },
  "regLocation.rajshahi": { bn: "রাজশাহী", en: "Rajshahi" },
  "regLocation.khulna": { bn: "খুলনা", en: "Khulna" },
  "regLocation.barishal": { bn: "বরিশাল", en: "Barishal" },
  "regLocation.rangpur": { bn: "রংপুর", en: "Rangpur" },
  "regLocation.mymensingh": { bn: "ময়মনসিংহ", en: "Mymensingh" },

  // Specializations for Registration
  "regSpec.criminal": { bn: "ফৌজদারি আইন", en: "Criminal Law" },
  "regSpec.family": { bn: "পারিবারিক আইন", en: "Family Law" },
  "regSpec.business": { bn: "ব্যবসায়িক আইন", en: "Business Law" },
  "regSpec.property": { bn: "সম্পত্তি আইন", en: "Property Law" },
  "regSpec.labor": { bn: "শ্রম আইন", en: "Labor Law" },
  "regSpec.cyber": { bn: "সাইবার আইন", en: "Cyber Law" },
  "regSpec.tax": { bn: "ট্যাক্স আইন", en: "Tax Law" },
  "regSpec.constitutional": { bn: "সাংবিধানিক আইন", en: "Constitutional Law" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = "sahayata24_language";

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize from localStorage or default to 'bn'
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage === "en" || savedLanguage === "bn") {
        return savedLanguage;
      }
    }
    return "bn";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "bn" ? "en" : "bn";
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      }
      return newLanguage;
    });
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
