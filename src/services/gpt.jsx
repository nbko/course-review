import { resolveModuleName } from "typescript";

export const getGPT = async (courseReviews) => {
	console.log(">>calling gpt....");

	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
                {role: "system", content: '''Summarize the provided JSON dictionary into four categories: `comments_course`, 'course_content', 'comments_professor', and 'advice'. Each summary should be under 4-5 sentences and include only essential information from the provided text. Use the following format in json:
                {
                'comments_course': 'summarized comments on the course',
                'course_content': "summarized content of the course",
                "comments_professor": "summarized comments on the professor(s)",
                "advice": "summarized advice"
                }


                ### Guidelines:

                1. **comments_course**: Summarize student feedback on exams, homework, grading, and feedback quality.
                2. **course_content**: Summarize the knowledge and skills taught and what students learned.
                3. **comments_professor**: Summarize what students found helpful or challenging about the instructor.
                4. **advice**: Summarize any advice for future students."},
				{
					role: "user",
					content: `${courseReviews}`,
				},
			],
			temperature: 0.5,
			max_tokens: 200,
		}),
	});

	const responseData = await res.json();
	console.log("responseData", responseData);

	return responseData;
};
