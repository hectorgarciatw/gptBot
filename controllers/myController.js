const openAI = require('openai');

//Ejemplo de respuesta a una petición de tipo GET
exports.inicio = (req, res) => {
    res.status(200).render('index');
};

exports.test = (req, res) => {
    // Importamos y configuramos el cliente OpenAI API
    const { Configuration, OpenAIApi } = require('openai');
    const configuration = new Configuration({
        apiKey: process.env.TOKEN,
    });
    const openai = new OpenAIApi(configuration);

    // Definimos el prompt
    const conversationContextPrompt = 'necesito el algoritmo de quicksort en JavaScript';
    // Extracting the user's message from the request body
    const message = req.body.message;
    // LLamando a la API de OpenAI
    openai
        .createCompletion({
            model: 'text-davinci-003',
            // Agregamos a la conversación el mesansaje en cuestión
            prompt: conversationContextPrompt + message,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [' Human:', ' AI:'],
        })
        .then((response) => {
            res.status(200).render('index', { data: response.data.choices });
            // Sending the response data back to the client
            //res.send(response.data.choices);
        });
};
