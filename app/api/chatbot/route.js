const questions = [
  {
    question: "How can I book a trip?",
    answer:
      "You can book a trip by visiting our booking page or contacting customer support.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Our refund policy allows cancellations within 24 hours of booking. Visit our policy page for more details.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we offer special discounts for group bookings. Contact us for more information.",
  },
  {
    question: "What destinations do you offer?",
    answer:
      "We offer a wide range of destinations. Please visit our destinations page to explore.",
  },
  {
    question: "Can I change my booking?",
    answer:
      "Yes, you can change your booking depending on the availability and terms. Please contact customer support for assistance.",
  },
  {
    question: "How do I get a refund?",
    answer:
      "To get a refund, please submit a request through our customer support page, and we will guide you through the process.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
  },
  {
    question: "Is travel insurance included in the booking?",
    answer:
      "Travel insurance is optional and can be added during the booking process. Please check our options for more details.",
  },
  {
    question: "Can I book a trip for someone else?",
    answer:
      "Yes, you can book a trip on behalf of someone else. Simply provide their details during the booking process.",
  },
  {
    question: "How do I cancel my trip?",
    answer:
      "You can cancel your trip by visiting your booking page or contacting customer support. Cancellation policies may apply.",
  },
  {
    question: "Do you provide airport transfers?",
    answer:
      "Yes, we provide airport transfers for certain destinations. Please check the details of your specific trip.",
  },
  {
    question: "What should I pack for my trip?",
    answer:
      "Packing requirements depend on the destination and type of trip. We recommend checking the destination guide for packing tips.",
  },
  {
    question: "Do you offer tours during my trip?",
    answer:
      "Yes, we offer various tours and activities at most destinations. You can book these in advance or during your trip.",
  },
  {
    question: "Is Wi-Fi available at the accommodations?",
    answer:
      "Most of our accommodations provide Wi-Fi. Please confirm with us before booking to ensure availability.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact customer support via email, phone, or through the live chat feature on our website.",
  },
  {
    question: "Are there any age restrictions for booking?",
    answer:
      "Age restrictions vary depending on the destination and type of trip. Please check the specific trip details before booking.",
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

// Cosine similarity calculation
const cosineSimilarity = (vecA, vecB) => {
  // console.log("vecA :- ", vecA);
  // console.log("vecB :- ", vecB);
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// POST method handler
export async function POST(req, res) {
  const body = await req.json(); // Parse the request body
  // console.log(req.method, body);

  const { message } = body;
  // console.log("Message:", message);
  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  const userEmbedding = await getEmbedding(message);
  // console.log(userEmbedding);
  if (!userEmbedding) {
    return res.status(500).json({ message: "Failed to process message." });
  }

  // let bestMatch = null;
  // let highestSimilarity = 0;

  // for (const q of questions) {
  //   const questionEmbedding = await getEmbedding(q.question);
  //   const similarity = cosineSimilarity(userEmbedding, questionEmbedding);

  //   if (similarity > highestSimilarity) {
  //     highestSimilarity = similarity;
  //     bestMatch = q;
  //   }
  // }

  // if (bestMatch) {
  //   return new Response(JSON.stringify({ answer: bestMatch.answer }), {
  //     status: 200,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // } else {
  //   return new Response(
  //     JSON.stringify({ answer: "Sorry, I didn't understand your question." }),
  //     {
  //       status: 404,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
  let bestMatch = null;
  let highestSimilarity = 0;
  const similarityThreshold = 0.5; // Adjust this value as needed

  // console.log("Starting similarity check...");

  for (const q of questions) {
    const questionEmbedding = await getEmbedding(q.question);
    const similarity = cosineSimilarity(userEmbedding, questionEmbedding);

    // console.log(`Similarity for question "${q.question}":`, similarity);

    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = q;
    }
  }

  // console.log("Highest similarity:", highestSimilarity);
  // console.log("Best match:", bestMatch);

  // Check if the highest similarity is above the threshold
  if (bestMatch && highestSimilarity > similarityThreshold) {
    // console.log("Best match found with high similarity.");
    return new Response(JSON.stringify({ answer: bestMatch.answer }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    // console.log("No suitable match found.");
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
