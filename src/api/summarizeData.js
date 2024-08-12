// gpt api를 사용해서 해당 수업에 대한 학생들의 수업 후기를 요약해줌
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
						content: `Summarize the provided JSON dictionary into four categories: "comments_course", "course_content", "comments_professor", and "advice". Each summary should be detailed and descriptive, but please keep it under 5 sentences for each category. 

						Please respond in a friendly, conversational tone as if you are a fellow student sharing information about the course with your classmates.

						Use the following JSON format for your response:
						{
							"comments_course": "summarized comments on the course",
							"course_content": "summarized content of the course",
							"comments_professor": "summarized comments on the professor(s)",
							"advice": "summarized advice"
						}
			
						### Guidelines:
							**comments_course**: Provide a detailed summary of student feedback on exams, homework, grading, and feedback quality. Highlight both positive and negative aspects if available.
							**course_content**: Provide a detailed summary of the knowledge and skills taught, including specific topics covered and what students learned.
							**comments_professor**: Provide a detailed summary of what students found helpful or challenging about the instructor, including teaching style, accessibility, and supportiveness.
							**advice**: Provide a detailed summary of any advice for future students, including study tips, course preparation, and class participation strategies.`,
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
