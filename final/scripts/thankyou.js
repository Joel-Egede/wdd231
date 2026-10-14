import "./main.js";

const submissionDetails =
    document.querySelector("#submission-details");


const params = new URLSearchParams(
    window.location.search
);


const name =
    params.get("name") || "Visitor";

const email =
    params.get("email") || "Not provided";

const topic =
    params.get("topic") || "Not specified";

const question =
    params.get("question") || "No question provided.";


if (submissionDetails) {

    const heading = document.createElement("h2");

    heading.textContent =
        `Thank you, ${name}!`;


    const message = document.createElement("p");

    message.textContent =
        "Your maintenance question has been submitted.";


    const details = document.createElement("div");

    details.classList.add(
        "submission-summary"
    );


    const emailParagraph =
        document.createElement("p");

    emailParagraph.innerHTML =
        `<strong>Email:</strong> ${email}`;


    const topicParagraph =
        document.createElement("p");

    topicParagraph.innerHTML =
        `<strong>Topic:</strong> ${topic}`;


    const questionParagraph =
        document.createElement("p");

    questionParagraph.innerHTML =
        `<strong>Question:</strong> ${question}`;


    details.append(
        emailParagraph,
        topicParagraph,
        questionParagraph
    );


    submissionDetails.append(
        heading,
        message,
        details
    );
}