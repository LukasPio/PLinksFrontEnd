type LinkResponseSuccess = {
    message: string,
    timestamp: Date,
    statusCode: number,
    data: {
        shortenedUrl: string,
        qrCode: string
    }
}

type LinkResponseFail = {
    message: string,
    timestamp: Date,
    statusCode: number,
    data: null
}

const BASE_URL = "http://localhost:8080/"

const button = document.getElementById("submitButton") as HTMLButtonElement

const customSlugCheckBox = document.getElementById("customSlug") as HTMLInputElement

const slugInputLabel = document.getElementById("customSlugLabel") as HTMLLabelElement

const linkInput = document.getElementById("linkInput") as HTMLInputElement
const slugInput = document.getElementById("customSlugInput")

customSlugCheckBox.addEventListener("change", () => {
    if (customSlugCheckBox)
})

button.addEventListener("click", () => {
    const link = linkInput!!.value

    if (link == null) {
        alert("Please enter a link to short")
        return;
    }

    if (!isValidUrl(link)) {
        alert("Invalid link!");
        return;
    }

    shortRequest(link)
    linkInput!!.value = ""
})

function isValidUrl(link: string) {
  try {
    new URL(link); 
    return true;      
  } catch (error) {
    return false;     
  }
}

async function shortRequest(normalized: string) {
    fetch(BASE_URL + "short", {
        method: "POST",
        body: JSON.stringify({
            url: normalized,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async response => {
        if (response.status === 200) return response.json();
        showError(await response.json())
    })
      .then((json: LinkResponseSuccess) => {
        alert("Link encurtado com sucesso: " + json.data.shortenedUrl)
    });
}

function showError(responseJson: LinkResponseFail) {
    alert("Occurred an error shorting your link: " + responseJson.message)
}