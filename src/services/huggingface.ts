// خدمة Hugging Face للحصول على خطط الرحلات
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// الحصول على مفتاح API من متغيرات البيئة
const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
if (!apiKey) {
  console.error('مفتاح Hugging Face API غير موجود. يرجى التحقق من ملف .env.local');
}

// واجهة استجابة خطة الرحلة (نفس الواجهة المستخدمة في خدمة Gemini)
export interface TripPlanResponse {
  tripPlan: {
    summary: string;
    totalBudget: number;
    remainingBudget: number;
    recommendations: string[];
    dayPlans: Array<{
      date: string;
      activities: Array<{
        title: string;
        description: string;
        time: string;
        cost: number;
        type: 'سياحة' | 'تسوق' | 'طعام' | 'ترفيه' | 'ثقافة';
      }>;
      totalCost: number;
    }>;
  };
  weatherInfo: string;
  culturalInfo: string[];
  packingList: string[];
  transportInfo: string[];
}

export async function generateTripPlan(tripData: {
  destination: string;
  budget: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: string;
}): Promise<TripPlanResponse> {
  // التحقق من وجود مفتاح API
  if (!apiKey) {
    throw new Error('مفتاح Hugging Face API غير موجود. يرجى التحقق من إعدادات التطبيق.');
  }

  // التحقق من صحة البيانات
  if (!tripData.destination || !tripData.budget || !tripData.startDate || !tripData.endDate || !tripData.tripType) {
    throw new Error('الرجاء تعبئة جميع الحقول المطلوبة');
  }

  // التحقق من صحة التواريخ
  const start = new Date(tripData.startDate);
  const end = new Date(tripData.endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('الرجاء إدخال تواريخ صحيحة');
  }
  if (end < start) {
    throw new Error('تاريخ النهاية يجب أن يكون بعد تاريخ البداية');
  }

  // التحقق من صحة الميزانية
  const budget = parseInt(tripData.budget.replace(/[^0-9]/g, ''));
  if (isNaN(budget) || budget <= 0) {
    throw new Error('الرجاء إدخال ميزانية صحيحة');
  }

  let currentAttempt = 0;
  let lastError: Error | null = null;

  while (currentAttempt < MAX_RETRIES) {
    try {
      // حساب عدد الأيام
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // تحويل الميزانية إلى رقم
      const budget = parseInt(tripData.budget.split('-')[1] || tripData.budget);

      const prompt = `You are a travel planning assistant. Create a detailed travel plan for a ${days}-day trip to ${tripData.destination} for ${tripData.travelers} travelers with a budget of ${budget} SAR. Trip type: ${tripData.tripType}.

Provide the response in the following JSON format (do not include any text before or after the JSON, and ensure all text is in Arabic):

{
  "summary": "A brief summary of the trip in Arabic",
  "recommendations": ["recommendation 1", "recommendation 2"],
  "dailyPlan": [
    {
      "activities": [
        {
          "title": "Activity title in Arabic",
          "description": "Activity description in Arabic",
          "time": "09:00",
          "cost": 100,
          "type": "سياحة"
        }
      ]
    }
  ],
  "weather": "Weather information in Arabic",
  "culturalTips": ["Cultural tip 1 in Arabic", "Cultural tip 2 in Arabic"],
  "packingList": ["Packing item 1 in Arabic", "Packing item 2 in Arabic"],
  "transportation": ["Transportation info 1 in Arabic", "Transportation info 2 in Arabic"]
}`;

      // استدعاء Hugging Face API
      const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 2048,
            temperature: 0.7,
            top_p: 0.95,
            top_k: 40,
            repetition_penalty: 1.1
          }
        })
      });

      if (!response.ok) {
        throw new Error(`فشل الاتصال بـ Hugging Face API: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Hugging Face Raw Response:', result);

      // استخراج النص من الاستجابة
      const text = Array.isArray(result) && result.length > 0 ? result[0].generated_text : result.generated_text;
      console.log('Generated Text:', text);

      // تحسين استخراج JSON من النص
      let jsonStr = '';
      try {
        // محاولة العثور على JSON في النص
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonStr = jsonMatch[0];
        } else {
          // إذا لم يتم العثور على JSON، استخدم النص كاملاً
          jsonStr = text;
        }

        console.log('Extracted JSON string:', jsonStr);
        
        // محاولة تحليل JSON
        const data = JSON.parse(jsonStr);
        console.log('Parsed Data:', data);

        // التحقق من وجود كل الحقول المطلوبة
        if (!data.summary) {
          console.warn('Missing summary field');
        }
        if (!data.recommendations) {
          console.warn('Missing recommendations field');
        }
        if (!data.dailyPlan) {
          console.warn('Missing dailyPlan field');
        }

        const tripResponse: TripPlanResponse = {
          tripPlan: {
            summary: data.summary || `رحلة إلى ${tripData.destination}`,
            totalBudget: budget,
            remainingBudget: budget,
            recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
            dayPlans: Array.isArray(data.dailyPlan) ? data.dailyPlan.map((day: any, index: number) => ({
              date: new Date(start.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString('ar'),
              activities: Array.isArray(day?.activities) ? day.activities.map((activity: any) => ({
                title: activity?.title || '',
                description: activity?.description || '',
                time: activity?.time || '',
                cost: typeof activity?.cost === 'number' ? activity.cost : 0,
                type: activity?.type || 'سياحة'
              })) : [],
              totalCost: Array.isArray(day?.activities) ?
                day.activities.reduce((sum: number, activity: any) =>
                  sum + (typeof activity?.cost === 'number' ? activity.cost : 0), 0) : 0
            })) : []
          },
          weatherInfo: data.weather || '',
          culturalInfo: Array.isArray(data.culturalTips) ? data.culturalTips : [],
          packingList: Array.isArray(data.packingList) ? data.packingList : [],
          transportInfo: Array.isArray(data.transportation) ? data.transportation : []
        };

        console.log('Final Response:', tripResponse);
        return tripResponse;
      } catch (jsonError) {
        console.error('خطأ في تحليل JSON:', jsonError);
        console.error('النص الأصلي:', text);
        console.error('محاولة استخراج JSON:', jsonStr);
        
        // محاولة إنشاء استجابة بسيطة إذا فشل تحليل JSON
        return {
          tripPlan: {
            summary: `رحلة إلى ${tripData.destination}`,
            totalBudget: budget,
            remainingBudget: budget,
            recommendations: [`استكشاف ${tripData.destination}`],
            dayPlans: Array.from({ length: days }, (_, index) => ({
              date: new Date(start.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString('ar'),
              activities: [{
                title: `استكشاف ${tripData.destination}`,
                description: 'استكشاف المعالم السياحية الشهيرة',
                time: '09:00',
                cost: 0,
                type: 'سياحة'
              }],
              totalCost: 0
            }))
          },
          weatherInfo: 'معلومات الطقس غير متوفرة',
          culturalInfo: ['معلومات ثقافية غير متوفرة'],
          packingList: ['قائمة الأمتعة غير متوفرة'],
          transportInfo: ['معلومات النقل غير متوفرة']
        };
      }
    } catch (error) {
      console.error(`محاولة ${currentAttempt + 1} فشلت:`, error);

      // تحقق من نوع الخطأ للحصول على رسالة أكثر تحديدًا
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('مفتاح Hugging Face API غير صالح أو منتهي الصلاحية');
        }
        lastError = error;
      } else {
        lastError = new Error('حدث خطأ غير معروف');
      }

      currentAttempt++;

      if (currentAttempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  // إذا وصلنا إلى هنا، فهذا يعني أن جميع المحاولات قد فشلت
  throw lastError || new Error('لم يتم العثور على نتائج. يرجى التحقق من اتصالك بالإنترنت ومحاولة البحث مرة أخرى.');
}
