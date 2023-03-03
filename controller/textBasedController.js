const { Configuration, OpenAIApi } = require("openai");

let apiKey = process.env.OPENAI_API_KEY

const configuration = new Configuration({
    apiKey
});
const openai = new OpenAIApi(configuration);

async function callFunction(text) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        if (response?.data?.choices) {
            return { error: false, message: "success", data: { answer: response.data.choices } }
        } else {
            return { error: true, message: "failed in try", data: {} }
        }
    } catch (error) {
        console.log("ERROR", error)
        return { error: true, message: "error in catch", apikey:apiKey, text:text ,data: error }
    }
}

const createAnswer = async(req, res) => {
    const { question } = req.body;
    if (!question || typeof question !== "string" || question.trim().length == 0) {
        return res.status(400).send({ error: true, message: "validation failed", data: {} })
    } else if (question.length > 100) {
        return res.status(351).send({ error: true, message: "text characters length should be less then 100", data: {} })
    } else {

        if (apiKey) {
            let ai_res = await callFunction(question)
            console.log("ai res", ai_res)
            if (ai_res.error) {
                res.status(200).send({...ai_res})
            } else {
                res.status(200).send({...ai_res})
            }
        }
        else
            res.status(200).send({ error: false, message: "server error or API KEY not set unable to create response  ", data: {} })
    }
}

module.exports = { createAnswer }






