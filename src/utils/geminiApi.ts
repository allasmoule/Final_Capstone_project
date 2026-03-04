// Gemini API integration utility
// Note: In a real production environment, the API key should be stored securely on the backend

interface GeminiResponse {
  text: string;
  error?: string;
}

// Simulated Gemini API call (since we can't install Python packages in this environment)
// In a real implementation, this would call your backend API that uses the Gemini API
export async function askGemini(userPrompt: string): Promise<GeminiResponse> {
  try {
    // This is a simulation of what the actual API call would return
    // In production, you would make an HTTP request to your backend
    
    // Enhanced responses based on legal context
    const legalResponses: { [key: string]: string } = {
      // Advocate related queries
      "অ্যাডভোকেট": "আপনার জন্য সেরা অ্যাডভোকেটদের খুঁজে দিচ্ছি। আপনার এলাকার অভিজ্ঞ আইনজীবীদের তালিকা দেখতে অ্যাডভোকেট সাজেশন সেকশনে যান। আপনার সমস্যার ধরন বলুন - পারিবারিক, সম্পত্তি, ফৌজদারি নাকি ব্যবসায়িক?",
      
      "আইনজীবী": "বাংলাদেশের সেরা আইনজীবীদের সাথে যোগাযোগ করতে পারেন। আমাদের প্ল্যাটফর্মে রয়েছে বিভিন্ন বিশেষত্বের অভিজ্ঞ আইনজীবী। আপনার সমস্যার বিস্তারিত বলুন।",
      
      // Emergency responses
      "জরুরি": "জরুরি পরিস্থিতিতে অবিলম্বে ৯৯৯ নম্বরে কল করুন। আমাদের হটলাইন ০১৮৪৪-৪৪৪ৄৄৄ এও যোগাযোগ করতে পারেন। আপনার সমস্যার বিস্তারিত বলুন যাতে আমি সঠিক সহায়তা দিতে পারি।",
      
      "হেল্প": "আমি আপনাকে আইনি বিষয়ে সাহায্য করতে পারি। বলুন আপনার কী সমস্যা - পারিবারিক বিরোধ, সম্পত্তি সমস্যা, চাকরি সংক্রান্ত, নাকি অন্য কিছু?",
      
      // Family law
      "পারিবারিক": "পারিবারিক বিরোধের ক্ষেত্রে প্রথমে পারস্পরিক আলোচনার চেষ্টা করুন। বিবাহবিচ্ছেদ, সন্তানের অভিভাবকত্ব, ভরণপোষণ বা পারিবারিক সহিংসতার বিষয়ে আমাদের পারিবারিক আইনে বিশেষজ্ঞ আইনজীবীরা সাহায্য করতে পারেন। আমাদের সমঝোতা সেবাও ব্যবহার করতে পারেন।",
      
      "বিবাহবিচ্ছেদ": "বিবাহবিচ্ছেদের জন্য আইনি প্রক্রিয়া অনুসরণ করতে হবে। প্রয়োজনীয় কাগজপত্র: বিবাহের সার্টিফিকেট, জাতীয় পরিচয়পত্র, সন্তানের জন্ম সার্টিফিকেট (যদি থাকে)। পারিবারিক আইনে বিশেষজ্ঞ আইনজীবীর পরামর্শ নিন।",
      
      // Property law
      "সম্পত্তি": "সম্পত্তি সংক্রান্ত বিরোধে প্রথমে সব কাগজপত্র যাচাই করুন। জমির দলিল, খতিয়ান, পর্চা, মিউটেশন সংগ্রহ করুন। উত্তরাধিকার, ক্রয়-বিক্রয় বা দখল সংক্রান্ত সমস্যায় সম্পত্তি আইনে অভিজ্ঞ আইনজীবীর সাহায্য নিন।",
      
      "জমি": "জমি কেনাবেচার সময় খেয়াল রাখুন: ১) দলিল যাচাই ২) খতিয়ান দেখুন ৩) পর্চা চেক করুন ৪) মিউটেশন আপডেট ৫) সার্ভে করান। জমি সংক্রান্ত যেকোনো সমস্যায় আমাদের সম্পত্তি আইন বিশেষজ্ঞদের সাহায্য নিন।",
      
      // Criminal law
      "ফৌজদারি": "ফৌজদারি মামলায় দ্রুত আইনি সহায়তা নেওয়া জরুরি। থানায় মামলা দায়ের, জামিনের আবেদন বা আত্মপক্ষ সমর্থনে ফৌজদারি আইনে বিশেষজ্ঞ আইনজীবীর সাহায্য নিন। প্রমাণ সংরক্ষণ করুন এবং সাক্ষী প্রস্তুত রাখুন।",
      
      "মামলা": "মামলা দায়ের করার আগে সব প্রমাণ সংগ্রহ করুন। থানায় জিডি/মামলা দায়ের করুন। আইনজীবী নিয়োগ দিন। কোর্টে নিয়মিত হাজিরা দিন। আমাদের অভিজ্ঞ আইনজীবীরা আপনাকে পুরো প্রক্রিয়ায় সাহায্য করবেন।",
      
      // Business law
      "ব্যবসায়িক": "ব্যবসায়িক বিরোধে চুক্তিপত্র ও আইনি দলিল গুরুত্বপূর্ণ। কোম্পানি নিবন্ধন, ট্যাক্স সমস্যা, অংশীদারিত্বের বিরোধ বা শ্রমিক সমস্যায় ব্যবসায়িক আইনে অভিজ্ঞ আইনজীবীর পরামর্শ নিন।",
      
      "চাকরি": "চাকরি সংক্রান্ত সমস্যায় প্রথমে নিয়োগপত্র ও চুক্তি দেখুন। বেতন বকেয়া, অন্যায় বরখাস্ত বা কর্মক্ষেত্রে হয়রানির বিষয়ে শ্রম আইনে বিশেষজ্ঞ আইনজীবীর সাহায্য নিন। শ্রমিক অধিকার রক্ষায় আমরা আপনার পাশে আছি।",
      
      // Cyber law
      "সাইবার": "সাইবার ক্রাইমের শিকার হলে প্রমাণ সংরক্ষণ করুন (স্ক্রিনশট, চ্যাট, ইমেইল)। সাইবার ক্রাইম ট্রাইব্যুনালে মামলা করতে পারেন। অনলাইন হয়রানি, হ্যাকিং বা ডিজিটাল প্রতারণার বিষয়ে আমাদের সাইবার আইন বিশেষজ্ঞরা সাহায্য করবেন।",
      
      // Education and videos
      "ভিডিও": "আইনি শিক্ষার জন্য আমাদের কাছে বিশেষজ্ঞদের তৈরি ভিডিও টিউটোরিয়াল রয়েছে। সংবিধান, পারিবারিক আইন, সম্পত্তি আইন, ফৌজদারি আইন সহ সব বিষয়ে ভিডিও পাবেন। 'শিক্ষা' পেজে গিয়ে আপনার পছন্দের বিষয়ের ভিডিও দেখুন।",
      
      "শিক্ষা": "আমাদের শিক্ষা বিভাগে রয়েছে বিনামূল্যে আইনি শিক্ষামূলক ভিডিও। বিশেষজ্ঞ আইনজীবী ও শিক্ষকদের তৈরি কন্টেন্ট দিয়ে আপনার আইনি জ্ঞান বৃদ্ধি করুন। কোন বিষয়ে ভিডিও দেখতে চান?",
      
      // Mediation
      "সমঝোতা": "আমাদের সমঝোতা সেবার মাধ্যমে আইনি বিরোধের শান্তিপূর্ণ সমাধান পেতে পারেন। দুই পক্ষ অভিজ্ঞ আইনজীবীর মধ্যস্থতায় আলোচনা করে সমাধানে পৌঁছাতে পারেন। এটি সময় ও অর্থ সাশ্রয়ী।",
      
      // AI and suggestions
      "AI": "আমি আপনাকে আইনি বিষয়ে সঠিক ভিডিও সাজেস্ট করতে পারি। আপনার আগ্রহের বিষয় বলুন - যেমন 'পারিবারিক আইন', 'সম্পত্তি আইন', 'ব্যবসায়িক আইন' ইত্যাদি। আমি উপযুক্ত শিক্ষামূলক ভিডিও খুঁজে দেব।",
      
      "সাজেশন": "আপনার সমস্যার ধরন অনুযায়ী আমি সঠিক সমাধান সাজেস্ট করতে পারি। বলুন আপনার সমস্যা কী - আমি উপযুক্ত আইনজীবী, ভিডিও টিউটোরিয়াল বা আইনি গাইডলাইন সাজেস্ট করব।"
    };

    // Find the best matching response
    let bestResponse = "আপনার সমস্যাটি বুঝতে পারছি। এই বিষয়ে আরও বিস্তারিত জানার জন্য আমাদের বিশেষজ্ঞ অ্যাডভোকেটের সাথে যোগাযোগ করুন। আপনার এলাকার সেরা আইনজীবীদের তালিকা দেখতে 'অ্যাডভোকেট সাজেশন' এ ক্লিক করুন।";
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(legalResponses)) {
      if (userPrompt.toLowerCase().includes(keyword.toLowerCase())) {
        bestResponse = response;
        break;
      }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      text: bestResponse
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      text: "দুঃখিত, এই মুহূর্তে আমি আপনার প্রশ্নের উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন বা আমাদের হটলাইন ০১৮৪৪-৪৪৪৪৪৪ এ যোগাযোগ করুন।",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Enhanced legal context analyzer
export function analyzeLegalContext(message: string): {
  category: string;
  urgency: 'low' | 'medium' | 'high';
  suggestedAction: string;
} {
  const urgentKeywords = ['জরুরি', 'emergency', 'urgent', 'হেল্প', 'সাহায্য', 'বিপদ'];
  const familyKeywords = ['পারিবারিক', 'বিবাহ', 'তালাক', 'সন্তান', 'স্ত্রী', 'স্বামী'];
  const propertyKeywords = ['সম্পত্তি', 'জমি', 'বাড়ি', 'দলিল', 'খতিয়ান'];
  const criminalKeywords = ['ফৌজদারি', 'মামলা', 'থানা', 'পুলিশ', 'গ্রেফতার'];
  const businessKeywords = ['ব্যবসা', 'চাকরি', 'কোম্পানি', 'চুক্তি'];

  let category = 'general';
  let urgency: 'low' | 'medium' | 'high' = 'low';
  let suggestedAction = 'অ্যাডভোকেট সাজেশন দেখুন';

  const lowerMessage = message.toLowerCase();

  // Determine urgency
  if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
    urgency = 'high';
    suggestedAction = 'জরুরি হটলাইনে যোগাযোগ করুন';
  }

  // Determine category
  if (familyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    category = 'family';
    urgency = urgency === 'low' ? 'medium' : urgency;
    suggestedAction = 'পারিবারিক আইন বিশেষজ্ঞের সাথে যোগাযোগ করুন';
  } else if (propertyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    category = 'property';
    suggestedAction = 'সম্পত্তি আইন বিশেষজ্ঞের সাথে যোগাযোগ করুন';
  } else if (criminalKeywords.some(keyword => lowerMessage.includes(keyword))) {
    category = 'criminal';
    urgency = 'high';
    suggestedAction = 'ফৌজদারি আইন বিশেষজ্ঞের সাথে যোগাযোগ করুন';
  } else if (businessKeywords.some(keyword => lowerMessage.includes(keyword))) {
    category = 'business';
    suggestedAction = 'ব্যবসায়িক আইন বিশেষজ্ঞের সাথে যোগাযোগ করুন';
  }

  return { category, urgency, suggestedAction };
}