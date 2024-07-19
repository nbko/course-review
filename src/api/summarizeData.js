export const summarizeData = async (rawData) => {
	console.log(">>calling gpt....");

	try {
		const res = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
			},
			body: JSON.stringify({
				model: "gpt-4o-mini-2024-07-18",
				messages: [
					{
						role: "system",
						content: `Summarize the provided JSON dictionary into four categories: "comments_course", "course_content", "comments_professor", and "advice". Each summary should be concise, under 4-5 sentences, and include only the essential information from the provided text. 

						Please respond in a friendly, conversational tone as if you are a fellow student sharing information about the course with your classmates.

						Use the following JSON format for your response:
						{
							"comments_course": "summarized comments on the course",
							"course_content": "summarized content of the course",
							"comments_professor": "summarized comments on the professor(s)",
							"advice": "summarized advice"
						}
			
						### Guidelines:
			
						1. **comments_course**: Summarize student feedback on exams, homework, grading, and feedback quality.
						2. **course_content**: Summarize the knowledge and skills taught and what students learned.
						3. **comments_professor**: Summarize what students found helpful or challenging about the instructor.
						4. **advice**: Summarize any advice for future students.`,
					},
					{
						role: "user",
						content: `${JSON.stringify(rawData)}`,
					},
				],
			}),
		});

		const responseData = await res.json();
		console.log("responseData", responseData);
		return responseData;
	} catch (err) {
		console.log(`Unexpected error in summarize Data:`, err);
		return null;
	}
};
