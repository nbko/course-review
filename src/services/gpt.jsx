import { resolveModuleName } from "typescript";

export const getGPT = async () => {
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
				{
					role: "user",
					content: "초급 사용자를 위한 영어단어 3개 알려줘. 간단하게",
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
