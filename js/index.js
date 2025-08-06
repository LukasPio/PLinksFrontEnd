const button = document.getElementById("submitButton")
const linkInput = document.getElementById("linkInput")
button.addEventListener("click", () => {
    const link = linkInput.value
    if (!isValidUrl(link)) {
        alert("Link inválido!");
        return;
    }
    shortRequest(link)
    linkInput.value = ""
})

function isValidUrl(link) {
  try {
    new URL(link); 
    return true;      
  } catch (error) {
    return false;     
  }
}

async function shortRequest(normalized) {
    alert("Link pra encurtar: " + normalized);
    fetch("http://localhost:8080/short", {
        method: "POST",
        body: JSON.stringify({
            url: normalized,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
      .then(json => {
        if (json.statusCode == 200) {
            alert("Link encurtado com sucesso: " + json["data"]["shortenedUrl"])
        }
        else {
            console.log("Occurrend an error: " + json)
        }
    });
}
