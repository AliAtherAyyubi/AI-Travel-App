import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, budget, days, interests } = await req.json();
    
    console.log('Generating itinerary for:', { destination, budget, days, interests });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert travel planner AI. Generate detailed, realistic travel itineraries based on user preferences. Always respond with valid JSON only, no markdown or extra text.

Your response must be a JSON object with this exact structure:
{
  "destination": "string",
  "days": "string",
  "budget": "string",
  "interests": "string",
  "summary": "A brief 2-3 sentence overview of the trip",
  "dailyPlan": [
    {
      "day": number,
      "title": "string - catchy title for the day",
      "activities": ["activity 1", "activity 2", "activity 3"],
      "cost": "$XXX"
    }
  ],
  "hotels": [
    {
      "name": "string",
      "price": "$XXX/night",
      "rating": number (4.0-5.0),
      "description": "brief description"
    }
  ],
  "flights": [
    {
      "airline": "string",
      "route": "string",
      "price": "$XXX",
      "duration": "Xh XXm"
    }
  ],
  "tips": ["tip 1", "tip 2", "tip 3"]
}`;

    const userPrompt = `Create a detailed ${days}-day travel itinerary for ${destination} with a budget of $${budget} USD.

The traveler is interested in: ${interests}

Generate:
1. A daily plan for each of the ${days} days with specific activities, attractions, and estimated daily costs
2. 2-3 hotel recommendations that fit the budget
3. 2-3 flight options with realistic prices and durations
4. 3-5 helpful travel tips specific to ${destination}

Make sure the total costs are reasonable and within the $${budget} budget. Include authentic local experiences and popular attractions.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON from the response
    let itinerary;
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        itinerary = JSON.parse(jsonMatch[0]);
      } else {
        itinerary = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI response as JSON');
    }

    console.log('Itinerary generated successfully');
    
    return new Response(JSON.stringify(itinerary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating itinerary:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate itinerary' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
