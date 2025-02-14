const questions = [
  {
    question: ["Hii there", "Hello", "Hi", "Hey", "Greetings"],
    answer: "Hello! How can I help you today?",
  },
  {
    question: [
      "How can I book a trip?",
      "How do I make a reservation?",
      "How to book a tour?",
      "How to schedule a trip?",
      "Booking a trip process",
    ],
    answer:
      "You can book a trip by visiting our booking page or contacting customer support.",
  },
  {
    question: [
      "What is the refund policy?",
      "Can I get a refund?",
      "How does the refund process work?",
      "Refund terms and conditions",
      "Money back policy",
    ],
    answer:
      "Our refund policy allows cancellations within 24 hours of booking. Visit our policy page for more details.",
  },
  {
    question: [
      "Do you offer group discounts?",
      "Are there discounts for groups?",
      "Group booking discount",
      "Special rates for group trips",
      "Deals for group reservations",
    ],
    answer:
      "Yes, we offer special discounts for group bookings. Contact us for more information.",
  },
  {
    question: [
      "What destinations do you offer?",
      "Where can I travel with you?",
      "List of available destinations",
      "Travel locations offered",
      "Places to visit with your tours",
    ],
    answer:
      "We offer a wide range of destinations. Please visit our destinations page to explore.",
  },
  {
    question: [
      "Can I change my booking?",
      "Is it possible to reschedule my trip?",
      "Modify my reservation",
      "Change travel dates",
      "Update booking details",
    ],
    answer:
      "Yes, you can change your booking depending on the availability and terms. Please contact customer support for assistance.",
  },
  {
    question: [
      "How do I get a refund?",
      "Refund process details",
      "Requesting a refund",
      "Money back procedure",
      "How to claim a refund",
    ],
    answer:
      "To get a refund, please submit a request through our customer support page, and we will guide you through the process.",
  },
  {
    question: [
      "What payment methods do you accept?",
      "Payment options available",
      "Ways to pay for booking",
      "Accepted payment methods",
      "How can I pay?",
    ],
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
  },
  {
    question: [
      "Is travel insurance included in the booking?",
      "Do you provide travel insurance?",
      "Insurance coverage for trips",
      "Booking with insurance",
      "Trip insurance options",
    ],
    answer:
      "Travel insurance is optional and can be added during the booking process. Please check our options for more details.",
  },
  {
    question: [
      "Can I book a trip for someone else?",
      "Is it possible to book for another person?",
      "Booking on behalf of others",
      "Arrange a trip for a friend",
      "Reserve a trip for someone else",
    ],
    answer:
      "Yes, you can book a trip on behalf of someone else. Simply provide their details during the booking process.",
  },
  {
    question: [
      "How do I cancel my trip?",
      "Trip cancellation process",
      "Cancel my booking",
      "How to call off a trip?",
      "Cancellation policy details",
    ],
    answer:
      "You can cancel your trip by visiting your booking page or contacting customer support. Cancellation policies may apply.",
  },
  {
    question: [
      "Do you provide airport transfers?",
      "Is airport pickup included?",
      "Shuttle service from the airport",
      "Airport drop-off options",
      "Transportation from airport",
    ],
    answer:
      "Yes, we provide airport transfers for certain destinations. Please check the details of your specific trip.",
  },
  {
    question: [
      "What should I pack for my trip?",
      "Packing tips for travel",
      "Luggage recommendations",
      "Trip packing checklist",
      "Things to carry on my trip",
    ],
    answer:
      "Packing requirements depend on the destination and type of trip. We recommend checking the destination guide for packing tips.",
  },
  {
    question: [
      "Do you offer tours during my trip?",
      "Are guided tours available?",
      "Activities during the trip",
      "Excursions included in the package",
      "Tours and sightseeing options",
    ],
    answer:
      "Yes, we offer various tours and activities at most destinations. You can book these in advance or during your trip.",
  },
  {
    question: [
      "Is Wi-Fi available at the accommodations?",
      "Do hotels provide internet access?",
      "Is there free Wi-Fi?",
      "Internet availability at stay",
      "Wi-Fi facilities at the hotel",
    ],
    answer:
      "Most of our accommodations provide Wi-Fi. Please confirm with us before booking to ensure availability.",
  },
  {
    question: [
      "How can I contact customer support?",
      "Customer service contact details",
      "Support team contact info",
      "How to reach support?",
      "Help and support contact",
    ],
    answer:
      "You can contact customer support via email, phone, or through the live chat feature on our website.",
  },
  {
    question: [
      "Are there any age restrictions for booking?",
      "Age limit for booking a trip",
      "Minimum age to travel",
      "Booking age requirements",
      "Age policy for reservations",
    ],
    answer:
      "Age restrictions vary depending on the destination and type of trip. Please check the specific trip details before booking.",
  },
  {
    question: [
      "Thank you",
      "Thanks",
      "Thanks a lot",
      "Thank you so much",
      "Many thanks",
    ],
    answer: "You're welcome ♥️ ! Let me know if you need any more help.",
  },
];

const modelUrl =
  "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
const apiKey = process.env.HUGGINGFACE_API_KEY;

const getEmbedding = async (text) => {
  try {
    const response = await fetch(modelUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify(text),
    });

    const result = await response.json();
    // console.log("Result :- ", result);
    return result;
  } catch (error) {
    console.error(
      "Error getting embedding:",
      error.response?.data || error.message
    );
    return null;
  }
};

// // Cosine similarity calculation
// const cosineSimilarity = (vecA, vecB) => {
//   console.log("vecA :- ", vecA);
//   console.log("vecB :- ", vecB);
//   const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
//   const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
//   const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// };

// export async function POST(req, res) {
//   const body = await req.json();
//   // console.log(req.method, body);

//   const { message } = body;
//   // console.log("Message:", message);
//   if (!message) {
//     return res.status(400).json({ message: "Message is required." });
//   }

//   const userEmbedding = await getEmbedding(message);
//   // console.log(userEmbedding);
//   if (!userEmbedding) {
//     return res.status(500).json({ message: "Failed to process message." });
//   }

//   let bestMatch = null;
//   let highestSimilarity = 0;
//   const similarityThreshold = 0.5;

//   // console.log("Starting similarity check...");

//   for (const q of questions) {
//     const questionEmbedding = await getEmbedding(q.question);
//     const similarity = cosineSimilarity(userEmbedding, questionEmbedding);

//     // console.log(`Similarity for question "${q.question}":`, similarity);

//     if (similarity > highestSimilarity) {
//       highestSimilarity = similarity;
//       bestMatch = q;
//     }
//   }

//   // console.log("Highest similarity:", highestSimilarity);
//   // console.log("Best match:", bestMatch);

//   // Check if the highest similarity is above the threshold
//   if (bestMatch && highestSimilarity > similarityThreshold) {
//     // console.log("Best match found with high similarity.");
//     return new Response(JSON.stringify({ answer: bestMatch.answer }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } else {
//     // console.log("No suitable match found.");
//     return new Response(
//       JSON.stringify({
//         answer:
//           "I'm not able to understand what you're asking. Ask in Detail or try rephrasing your question.",
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

// // Cosine similarity calculation
// const cosineSimilarity = (vecA, vecB) => {
//   const flatVecA = vecA.flat();
//   const flatVecB = vecB.flat();
//   console.log("Flattened vecA :- ", flatVecA);
//   console.log("Flattened vecB :- ", flatVecB);

//   const dotProduct = flatVecA.reduce(
//     (sum, val, i) => sum + val * flatVecB[i],
//     0
//   );
//   const magnitudeA = Math.sqrt(
//     flatVecA.reduce((sum, val) => sum + val * val, 0)
//   );
//   const magnitudeB = Math.sqrt(
//     flatVecB.reduce((sum, val) => sum + val * val, 0)
//   );
//   return dotProduct / (magnitudeA * magnitudeB);
// };

// export async function POST(req, res) {
//   const body = await req.json();
//   const { message } = body;

//   if (!message) {
//     return new Response(JSON.stringify({ message: "Message is required." }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const userEmbedding = await getEmbedding(message);

//   if (!userEmbedding) {
//     return new Response(
//       JSON.stringify({ message: "Failed to process message." }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }

//   let bestMatch = null;
//   let highestSimilarity = 0;
//   const similarityThreshold = 0.5;

//   for (const q of questions) {
//     let highestForCurrent = 0;

//     // Loop through each synonym variation
//     for (const variation of q.question) {
//       const questionEmbedding = await getEmbedding(variation);
//       const similarity = cosineSimilarity(userEmbedding, questionEmbedding);

//       // Track the highest similarity for this group of synonyms
//       if (similarity > highestForCurrent) {
//         highestForCurrent = similarity;
//       }
//     }

//     // Compare with the overall highest similarity
//     if (highestForCurrent > highestSimilarity) {
//       highestSimilarity = highestForCurrent;
//       bestMatch = q;
//     }
//   }

//   // Check if the highest similarity is above the threshold
//   if (bestMatch && highestSimilarity > similarityThreshold) {
//     return new Response(JSON.stringify({ answer: bestMatch.answer }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } else {
//     return new Response(
//       JSON.stringify({
//         answer:
//           "I'm not able to understand what you're asking. Ask in Detail or try rephrasing your question.",
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

// Cosine similarity calculation
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// Cache for storing embeddings
const embeddingCache = new Map();

const getCachedEmbedding = async (text) => {
  if (embeddingCache.has(text)) {
    return embeddingCache.get(text);
  } else {
    const embedding = await getEmbedding(text);
    embeddingCache.set(text, embedding);
    return embedding;
  }
};

export async function POST(req, res) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return new Response(JSON.stringify({ message: "Message is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userEmbedding = await getCachedEmbedding(message);

  if (!userEmbedding) {
    return new Response(
      JSON.stringify({ message: "Failed to process message." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let bestMatch = null;
  let highestSimilarity = 0;
  const similarityThreshold = 0.5;

  // Get all embeddings for question variations in parallel
  for (const q of questions) {
    const embeddings = await Promise.all(
      q.question.map((variation) => getCachedEmbedding(variation))
    );

    // Calculate similarity for each embedding
    for (const questionEmbedding of embeddings) {
      const similarity = cosineSimilarity(userEmbedding, questionEmbedding);

      // Track the highest similarity
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = q;
      }
    }
  }

  // Check if the highest similarity is above the threshold
  if (bestMatch && highestSimilarity > similarityThreshold) {
    return new Response(JSON.stringify({ answer: bestMatch.answer }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(
      JSON.stringify({
        answer:
          "I'm not able to understand what you're asking. Ask in Detail or try rephrasing your question.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
