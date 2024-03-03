const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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"; //https://platform.openai.com/api-keys

const generateAiImages =  async (userPrompt, userImgQuantity) => {
    try {
        //Send a request to OpenAI to generate images based on user inputs
        const response = await fetch ("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if(!response.ok) throw new Error("Failed to generate images! Please try again.");


        const { data } = await response.json(); //Get data from the response
        console.log(data)
    } catch (error) {
        alert(error.message);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    //Get user input and image quatity values from the form 
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    //Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="img-card loading">
            <img src="/ai-image-generator/assets/images/loader.svg" alt="image">
            <a href="#" class="download-btn">
                <img src="/ai-image-generator/assets/images/download.svg" alt="download icon">
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);


//26:05 https://www.youtube.com/watch?v=fA_tWwPMapM