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

type LinkRequest = {
    url: string,
    slug: string | null,
    expiresAfter: number | null,
    generateQrCode: boolean | null
}

const API_BASE_URL = "http://localhost:8080/"

const button = document.getElementById("submitButton") as HTMLButtonElement

const customSlugCheckBox = document.getElementById("customSlug") as HTMLInputElement
const expiresAfterCheckBox = document.getElementById("expiresAfter") as HTMLInputElement

const slugInputLabel = document.getElementById("customSlugLabel") as HTMLLabelElement
const expiresAfterLabel = document.getElementById("expiresAfterLabel") as HTMLLabelElement

const linkInput = document.getElementById("linkInput") as HTMLInputElement
const expiresAfterInput = document.getElementById("expiresAfterInput") as HTMLInputElement
const slugInput = document.getElementById("customSlugInput") as HTMLInputElement

customSlugCheckBox.addEventListener("change", () => {
    if (customSlugCheckBox.checked) {
        slugInputLabel.classList.remove("hidden")
        slugInput.classList.remove("hidden")
    }
    else {
        slugInputLabel.classList.add("hidden")
        slugInput.classList.add("hidden")
    }
})

expiresAfterCheckBox.addEventListener("change", () => {
    if (expiresAfterCheckBox.checked) {
        expiresAfterLabel.classList.remove("hidden")
        expiresAfterInput.classList.remove("hidden")
    }
    else {
        expiresAfterLabel.classList.add("hidden")
        expiresAfterInput.classList.add("hidden")
    }
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

    if (expiresAfterInput.value.length <= 0 && expiresAfterCheckBox.checked) {
        alert("Please fill expires after field")
        return;
    }

    if (slugInput.value.length <= 0 && customSlugCheckBox.checked) {
        alert("Please fill custom slug field")
        return;
    }

    const customSlug = customSlugCheckBox.checked ? slugInput.value : null
    const expiresAfter = expiresAfterCheckBox.checked ? Number.parseInt(expiresAfterInput.value) : null
    const generateQrCode = null 

    const linkRequest: LinkRequest = {
        url: link,
        slug: customSlug,
        expiresAfter: expiresAfter,
        generateQrCode: generateQrCode
    } 

    shortRequest(linkRequest)
    linkInput.value = ""
    slugInput.value = ""
    expiresAfterInput.value = ""
})

function isValidUrl(link: string) {
  try {
    new URL(link); 
    return true;      
  } catch (error) {
    return false;     
  }
}

async function shortRequest(linkToShort: LinkRequest) {
    fetch(API_BASE_URL + "short", {
        method: "POST",
        body: JSON.stringify(linkToShort),
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
    throw new Error()
}